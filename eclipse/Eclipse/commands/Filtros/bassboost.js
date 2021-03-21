module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.bassboost.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.bassboost.naota)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.bassboost.mesmo)

    if(player.bassboost == false) {
        player.setBassboost(true)
        return message.channel.send(idioma.bassboost.ativado)
    }

    if(player.bassboost == true) {
        player.setBassboost(false)
        return message.channel.send(idioma.bassboost.desativado)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["bass"]
}
exports.help = {
    nome: "bassboost",
    descrição: "Coloca um pouco de grave na música",
    uso: "Coloca um pouco de grave na música",
    categoria: "Filtros"
}