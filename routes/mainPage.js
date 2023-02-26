const { readFileSync } = require("node:fs")

module.exports.path = "/app"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  try {
    const file = readFileSync(`./${this.config.path.home}/index.html`)
    reply.header("Content-type", "text/html")
    reply.send(file)
  } catch (error) {
    console.log(error);
    process.env.DEBUG && console.log(error);
    reply.send({error: "entrypoint error"})
  }
}