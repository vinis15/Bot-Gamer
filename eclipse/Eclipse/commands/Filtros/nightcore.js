module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.nightcore.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.nightcore.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.nightcore.mesmo)

    if(player.nightcore == false) {
        player.setNightcore(true)
        return message.channel.send(idioma.nightcore.ativado)
    }
    
    if(player.nightcore == true) {
        player.setNightcore(false)
        return message.channel.send(idioma.nightcore.desativado)
    }
}

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliase: ["night"]
}
exports.help = {
    nome: "nightcore",
    descrição: "Ativa o filtro nightcore na música",
    uso: "nightcore",
    categoria: "Filtros"
}