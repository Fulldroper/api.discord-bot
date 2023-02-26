module.exports.path = "/guilds/:guildID/roles"
module.exports.method = "get"
module.exports.run = async function (request, reply) {
  try {
    const { guildID } = request.params
    const guild = await this.guilds.fetch(guildID)
    const roles = await guild.roles.fetch()

    reply.send(roles)

  } catch (error) {
    process.env.DEBUG && console.log(error);
    reply.send({error: "wrong guildID"})
  }
}