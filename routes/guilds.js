module.exports.path = "/guilds"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  reply.send(this.guilds.cache)
}