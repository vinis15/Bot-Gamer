const { bot } = require("../index")

bot.on("voiceStateUpdate", async (oldState, newState) => {
    const player = bot.manager.players.get(newState.guild.id)

    if(!player) return;

    const channel = bot.channels.cache.get(player.textChannel)
    let idioma = bot.idioma.get(channel.guild.id) || 'pt'
    if(idioma === 'en') idioma = bot.idiomas.en
    if(idioma === 'pt') idioma = bot.idiomas.pt

    let canal = player.options.voiceChannel

    let guilda = player.options.guild

    if(bot.guilds.cache.get(guilda).channels.cache.get(canal).members.size == 1) {
        channel.send(idioma.erela.solo) 
        return player.destroy()
    }
})