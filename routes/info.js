module.exports.path = "/info"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  reply.send(this)
}