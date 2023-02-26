const { readFileSync } = require("node:fs")

module.exports.path = "/app/:asset"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  try {
    let { asset } = request.params
    if (!asset) asset = "index.html";
    const file = readFileSync(`./${this.config.path.home}/${asset}`)
    reply.header("Content-type", this.types(asset))
    reply.send(file)
  } catch (error) {
    console.log(error);
    process.env.DEBUG && console.log(error);
    reply.send({error: "wrong asset"})
  }
}