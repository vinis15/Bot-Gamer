module.exports.run = async (bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);
    if(!player) return message.reply(idioma.skip.nada)

    const { channel } = message.member.voice

    if(!channel) return message.reply(idioma.skip.conectar);
    if(channel.id !== player.voiceChannel) return message.reply(idioma.skip.conectar2);

    if(player.queue.size <= 1) return message.channel.send(idioma.skip.semMusica)
    
    return player.stop();
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["pular"]
}
exports.help = {
    nome: "skip",
    descrição: "Pula uma música",
    uso: "skip",
    categoria: "Música"
}
