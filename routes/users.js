module.exports.path = "/guilds/:guildID/users"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  try {
    const { guildID } = request.params
    const guild = await this.guilds.fetch(guildID)
    const members = await guild.members.fetch()

    reply.send(members)

  } catch (error) {
    process.env.DEBUG && console.log(error);
    reply.send({error: "wrong guildID"})
  }
}