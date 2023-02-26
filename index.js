// aplication runner
(async () => {
  // env configuration
  process.env.NODE_ENV || await require('dotenv').config({ debug: false })

  // import configs
  const { config, description } = await require("./package.json")
  
  // import libs
  const { REST, Client, GatewayIntentBits } = await require('discord.js');
  const { readdirSync } = await require('node:fs')
  const fastify = require('fastify')({ logger: process.env.DEBUG || false })

  // init discord bot && rest obj
  const bot = new Client({ intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageReactions
  ] });

  // implement configs
  bot.config = config
  bot.types = require("./lib/types")
  
  // function of importing modules from folder
  const importer = async (path, blocked_char = "!") => {
    // modules colector
    const colector = {}
    
    // reading folder items
    let items
    try {
      items = readdirSync(path)
    } catch (error) {
      console.error(`[modules not founds in]: "${ path }"`);
      return {}
    }

    // each files and import
    items.forEach(file => {
      // check if module not blocked for import
      if (file[0] === blocked_char) return
    
      try {
        // importing module
        const module = require(`${ path }${ file }`) 
      
        // adding module to colector
        colector[file.replace(/\.[^/.]+$/, "")] = module
      } catch (error) {
        console.error(`[can\`t import module]: "${ path }${ file }"`);
      }
    })
    
    // return imported modules
    return colector
  }

  const events = await importer(`./${config.path.events}/`)
  const routes = await importer(`./${config.path.routes}/`)
  
  // implement events
  if (events) {
    for (const key in events) {
      bot.on(key, events[key])
    }
  }

  // implement routes
  if (routes) {
    for (const key in routes) {
      const {path, method = 'get', run} = routes[key]
      const _run = run.bind(bot)
      fastify[method](path, _run)
    }
  }

  bot.login( process.env.TOKEN )

  fastify.listen({ port: process.env.PORT || 80, host: process.env.HOST || '0.0.0.0' }, (err, address) => {
    if (err) throw err
    console.log(`Server is now listening on ${address}`);
  })
})()

