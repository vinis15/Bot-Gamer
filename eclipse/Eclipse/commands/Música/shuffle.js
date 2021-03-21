module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.shuffle.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.shuffle.conectar)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.shuffle.conectar2)

    player.queue.shuffle();
    return message.reply(idioma.shuffle.embaralhado)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["shu"]
}
exports.help = {
    nome: "shuffle",
    descrição: "Embaralha a queue",
    uso: "Embaralha a queue",
    categoria: "Música"
}
