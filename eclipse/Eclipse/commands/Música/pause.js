module.exports.run = async (bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);
	
    if(!player) return message.channel.send(idioma.pause.nada)

    const { channel } = message.member.voice

    if(!channel) return message.channel.send(idioma.pause.conectar)

    if(channel.id !== player.voiceChannel) return message.channel.send(idioma.pause.conectar2)

    if(player.paused) return message.channel.send(idioma.pause.already)

    player.pause(true)
    return message.reply(idioma.pause.paused)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["pausar"]
}
exports.help = {
    nome: "pause",
    descrição: "Pausa a música",
    uso: "pause",
    categoria: "Música"
}
