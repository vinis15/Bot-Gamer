module.exports.run = async (bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.resume.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.resume.canal1)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.resume.canal2)

    if(!player.paused) return message.channel.send(idioma.resume.nao)

    player.pause(false)
    return message.reply(idioma.resume.certo)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["despausar"]
}
exports.help = {
    nome: "resume",
    descrição: "Despausa a música",
    uso: "resume",
    categoria: "Música"
}
