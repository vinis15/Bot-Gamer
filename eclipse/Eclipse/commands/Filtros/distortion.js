module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.distortion.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.distortion.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.distortion.mesmo)

    if(player.distortion == false) {
        player.setDistortion(true)
        return message.channel.send(idioma.distortion.ativado)
    }
    
    if(player.distortion == true) {
        player.setDistortion(false)
        return message.channel.send(idioma.distortion.desativado)
    }
}

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliase: ["dist"]
}
exports.help = {
    nome: "distortion",
    descrição: "Ativa o filtro distortion na música",
    uso: "distortion",
    categoria: "Filtros"
}