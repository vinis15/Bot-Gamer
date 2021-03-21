const { MessageEmbed } = require("discord.js");
const API = require("../../Structures/extensions/utils")
const config = require("../../Structures/jsons/config.json")
const { porgressBar } = require("music-progress-bar");
module.exports.run = async(bot, message, args, idioma) => {

    const player = message.client.manager.players.get(message.guild.id);


    if(!player) return message.channel.send(idioma.np.nada)


    const { title, duration } = player.queue.current;

    const progressBar = porgressBar({ currentPositon: player.position > 0 ? player.position : "1", endPositon: duration, width: 10, barStyle: "▬", currentStyle: player.playing ? "<:bolinha:771832602591232040>" : "<:bolinha:771832602591232040>"  }, { format:" [ <bar> ] " })

    let embed = new MessageEmbed()
    embed.setTimestamp()
    embed.setAuthor("NowPlaying", message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    embed.setColor(message.guild.me.roles.highest.color)
    embed.setDescription(`${player.playing ? API.emojis.play.id : API.emojis.pause.id} ${title}\n${progressBar} \`${player.position <= 60000 ? `${API.time2(player.position)}s` : API.time2(player.position)} / ${API.time2(duration)}\``);
    message.channel.send(embed)
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["np", "playingnow"]
}
exports.help = {
    nome: "nowplaying",
    descrição: "Mostra a música tocando agora",
    uso: "nowplaying",
    categoria: "Música"
}
