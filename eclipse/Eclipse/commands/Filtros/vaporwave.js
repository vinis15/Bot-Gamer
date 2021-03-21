module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.vaporwave.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.vaporwave.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.vaporwave.mesmo)

    if(player.vaporwave == false) {
        player.setVaporwave(true)
        return message.channel.send(idioma.vaporwave.ativado)
    }

    if(player.vaporwave == true) {
        player.setVaporwave(false)
        return message.channel.send(idioma.vaporwave.desativado)
    }
}


exports.conf = {
    enabled: false,
    guildOnly: true,
    aliase: []
}
exports.help = {
    nome: "vaporwave",
    descrição: "Ativa o filtro vaporwave na música",
    uso: "vaporwave",
    categoria: "Filtros"
}