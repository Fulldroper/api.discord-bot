window.onload= () => {
  new Vue({
    el: '#app',
    data: {
      guilds: []
    },
    methods: {
      showGuildChannels: async function (id) {
        const dom = this.$refs[id][0].childNodes[2].childNodes[0]
        const channels = (await axios.get(`/guilds/${id}/channels`)).data
        channels.forEach(channel => {
          // console.log(channel);
          dom.innerHTML +=`<div id="${id}.${channel.id}">${channel.type === 2 ? '🔊' : channel.type === 0 ? '💬' : '〰️'} | ${channel.name}</div>`
        });
        // console.log(channels);
      },
      showChannelMessages: async function ({target}) {
        const ids = target.id.split(".")
        const dom = this.$refs[ids[0]][0].childNodes[2].childNodes[2]
        const msgs = (await axios.get(`/guilds/${ids[0]}/channels/${ids[1]}/messages`)).data
        console.log(dom, msgs);
        msgs.forEach(msg => {
          // console.log(channel);
          dom.innerHTML +=`<div>${msg.content}</div>`
        });
      }
    },
    async mounted() {
      this.guilds = (await axios.get('/guilds')).data
      // console.log(this.guilds, this.$refs);
    }
  })
}