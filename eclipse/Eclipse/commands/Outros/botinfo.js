const { MessageEmbed } = require("discord.js");
const API = require("../../Structures/extensions/utils")
module.exports.run = async (bot, message, args, idioma) => {

    let servidores = await bot.shard.fetchClientValues('guilds.cache.size')
    let total_servers = servidores.reduce((prev, val) => prev + val)

    let memoria = await bot.shard.broadcastEval(`process.memoryUsage().rss`)
    let total_memoria = memoria.reduce((prev, val) => prev + val)

    let embed = new MessageEmbed()
    embed.setTitle(idioma.botinfo.status)
    embed.setColor(message.guild.me.roles.highest.color)
    embed.setTimestamp()
    embed.addFields(
        { name: idioma.botinfo.servers, value: `**${total_servers.toLocaleString('pt-br')}** ${idioma.botinfo.guildas}`, inline: true },
        { name: "Uptime", value: `**${API.time2(bot.uptime)}`, inline: true },
        { name: idioma.botinfo.tocando, value: `**${bot.manager.nodes.get("LUA").stats.playingPlayers}** ${idioma.botinfo.guildas}`, inline: true },
        { name: idioma.botinfo.ping, value: `**${Math.round(bot.ws.ping)}**ms`, inline: true },
        { name: idioma.botinfo.memoria, value: `**${API.bytes(total_memoria).value}${API.bytes(total_memoria).unit}**`, inline: true },
        { name: idioma.botinfo.shards, value: `**${bot.shard.count}**`, inline: true }
    )
    await message.channel.send(embed)
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["bot-info", "infobot"]
}
exports.help = {
    nome: "botinfo",
    descrição: "Mostra informaçoes do bot",
    uso: "",
	categoria: "Outros"
}
