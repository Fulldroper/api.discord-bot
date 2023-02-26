module.exports.path = "/guilds/:guildID/channels"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  try {
    const { guildID } = request.params
    reply.send((await this.guilds.fetch(guildID)).channels.cache)
  } catch (error) {
    process.env.DEBUG && console.log(error);
    reply.send({error: "wrong guildID"})
  }
}