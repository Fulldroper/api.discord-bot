module.exports.path = "/guilds/:guildID/channels/:channelID/messages"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  try {
    const { guildID, channelID } = request.params
    const guild = await this.guilds.fetch(guildID)
    const channel = await guild.channels.fetch(channelID)

    const { size = 20, before = channel?.lastMessageId } = request?.query || {}

    const msgs = await channel.messages.fetch({limit: size, cache: false, before})
    
    reply.send(msgs)
  } catch (error) {
    process.env.DEBUG && console.log(error);
    reply.send({error: "wrong input"})
  }
}