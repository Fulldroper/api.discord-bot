module.exports.path = "/guilds/:guildID/channels/:channelID"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  try {
    const { guildID, channelID } = request.params
    const guild = await this.guilds.fetch(guildID)
    reply.send(await guild.channels.fetch(channelID))
  } catch (error) {
    process.env.DEBUG && console.log(error);
    reply.send({error: "wrong input"})
  }
}