module.exports.run = async (bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);
    if(!player) return message.reply(idioma.stop.nada)

    const { channel } = message.member.voice

    if(!channel) return message.reply(idioma.stop.conectar);
    if (channel.id !== player.voiceChannel) return message.reply(idioma.stop.conectar2);

    player.destroy();
    return message.channel.send(idioma.stop.parou);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["parar", "leave"]
}
exports.help = {
    nome: "stop",
    descrição: "Para de tocar música",
    uso: "stop",
    categoria: "Música"
}
