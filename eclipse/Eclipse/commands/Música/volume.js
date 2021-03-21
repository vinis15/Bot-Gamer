module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.volume.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.volume.conectar)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.player.conectar2)

    const volume = Number(args[0]);
    if (!volume || volume < 1 || volume > 100) return message.reply(idioma.volume.invalido);
    player.setVolume(volume);
    return message.reply(idioma.volume.mudado + player.volume);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["vol"]
}
exports.help = {
    nome: "volume",
    descrição: "Aumenta ou diminiu o volume",
    uso: "Aumenta ou diminiu o volume",
    categoria: "Música"
}
