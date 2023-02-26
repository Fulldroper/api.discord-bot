module.exports = async function () {
  let users_counter = 0
  
  await this.guilds.cache.forEach(async s => users_counter += s.memberCount )
  
  this.users_counter = users_counter
  
  console.log('[start] as ', this.user.tag, " at ", new Date);
  console.log(`[Servers](${this.guilds.cache.size})`);
  console.log(`[Users](${users_counter})`);
}