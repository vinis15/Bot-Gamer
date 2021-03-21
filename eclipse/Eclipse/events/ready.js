const { bot } = require("../index");
const color = require("colors")


bot.on("ready", () => {
    setStatus();

    setInterval(() => {
        bot.shard.broadcastEval(`
        this.channels.cache.sweep(c=>c.type === 'news')
        this.channels.cache.sweep(c=>c.type === 'category')
        this.emojis.cache.sweep(e => e)
        this.users.cache.sweep(u=>u.bot&&u.id !== this.user.id)
        this.channels.cache.sweep(c=>c.type === 'dm')`)
    }, 7500)

    if(bot.shard.ids[0] === 0) {
        setInterval(async () => {
          let servidor = await bot.shard.fetchClientValues('guilds.cache.size')
          servidor = servidor.reduce((acc, guildCount) => acc + guildCount, 0)
          dbl.postStats(servidor);
        }, 1800000);
    }
    
    setInterval(setStatus, 60000);
    console.log(`[LOGIN] - Shard iniciada com ${bot.guilds.cache.size} servidores`.brightCyan);
    console.log(`[LOGIN] - Memoria usada ${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB`.bold.brightCyan)
})


async function setStatus(){
    bot.user.setActivity(`[${bot.manager.players.size}] players`, { type: 5 })
}
