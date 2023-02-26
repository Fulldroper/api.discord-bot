module.exports.path = "/guilds/:guildID"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  try {
    const { guildID } = request.params
    reply.send(await this.guilds.fetch(guildID))
  } catch (error) {
    process.env.DEBUG && console.log(error);
    reply.send({error: "wrong guildID"})
  }
}