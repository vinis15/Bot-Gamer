const { MessageEmbed } = require("discord.js")
const API = require("../../Structures/extensions/utils")
module.exports.run = async(bot, message, args, idioma) => {
    let node = bot.manager.nodes.get("LUA")
    let embed = new MessageEmbed()
    embed.setTimestamp()
    embed.setColor(message.guild.me.roles.highest.color)
    embed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    embed.setAuthor(bot.user.username, bot.user.displayAvatarURL({ size: 2048 }))
    embed.setDescription(`\`\`\`diff\n\n- [ NODE ]

--- Uptime ${node.stats.uptime === 0 ? 'Offline' : API.time2(node.stats.uptime)}
--- Players ${node.stats.playingPlayers}
--- ${idioma.nodes.memoria} ${API.bytes(node.stats.memory.used).value}${API.bytes(node.stats.memory.used).unit}\`\`\``)
    await message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["nodesinfo"]
}
exports.help = {
    nome: "nodes",
    descrição: "Mostra status do lavalink",
    uso: "nodes",
    categoria: "Música"
}
