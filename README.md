The purpose of this project is to create a client for Discord bots, similar to a regular client, specifically for bot moderation.

### Project Benefits
This project facilitates the moderation of Discord servers by providing a dedicated client for bot management and moderation tasks.

### How the Project Works
The project uses Node.js to create a client that interacts with Discord's API, allowing bot moderation functionalities similar to those available to regular users.

### Repository and Installation
[GitHub Repository](https://github.com/Fulldroper/api.discord-bot)

To install and use the project:

1. Clone the repository:
    ```bash
    git clone https://github.com/Fulldroper/api.discord-bot
    cd api.discord-bot
    ```

2. Install dependencies and start the client:
    ```bash
    npm install
    npm start
    ```

### Project Workflow
1. **Setup Project:** Initialize the project structure and dependencies.
    ```bash
    npm init
    npm install
    ```

2. **Create Discord Bot Client:** Set up the client to connect to Discord and perform moderation tasks.
    ```javascript
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
    ```

3. **Implement Moderation Features:** Add functionalities for moderating the server.
    ```javascript
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
    ```

### Skills Gained
- Developing Discord bot clients with Node.js
- Implementing moderation functionalities
- Managing and configuring bot settings for server management
