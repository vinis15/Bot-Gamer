const API = require("../../Structures/extensions/utils")
const AsciiTable = require('ascii-table')
table = new AsciiTable('Eclipse Shards')

module.exports.run = async(bot, message, args, idioma) => {

    table.setHeading('SID', 'UpTime', 'Ping', 'Usage', 'Guilds', 'Players')

    table.setAlign(0, AsciiTable.CENTER)
	table.setAlign(1, AsciiTable.CENTER)
	table.setAlign(2, AsciiTable.CENTER)
	table.setAlign(3, AsciiTable.CENTER)
	table.setAlign(4, AsciiTable.CENTER)
    table.setAlign(5, AsciiTable.CENTER)
    table.setBorder('|', '-', '+', '+')


    let servidores = await bot.shard.fetchClientValues('guilds.cache.size')
    let memoria = await bot.shard.broadcastEval(`process.memoryUsage().rss`)
    let ping = await bot.shard.fetchClientValues('ws.ping')
    let uptime = await bot.shard.fetchClientValues('uptime')
	let players = await bot.shard.fetchClientValues('manager.players.size')

    for(let i = 0; i < bot.options.shardCount; i++) {
        table.addRow(i === message.guild.shard.id ? i + '*' : i, API.time2(uptime[i]), '~' + ping[i] + 'ms', API.bytes(memoria[i]).value + API.bytes(memoria[i]).unit, servidores[i].toLocaleString('pt-br'), players[i].toLocaleString('pt-BR'))
    }

    let total_servers = servidores.reduce((prev, val) => prev + val)
    let total_mem = memoria.reduce((prev, val) => prev + val)
    let ping_media = ping.reduce((prev, val) => prev + val)
    let media = ping_media / bot.options.shardCount
	let total_players = players.reduce((prev, val) => prev + val)

    table.addRow('______', '______', '______', '______', '______', '______', '______')

    table.addRow('TOTAL', '-', '~' + Math.round(media) + 'ms', API.bytes(total_mem, 2).value + API.bytes(total_mem, 2).unit, total_servers.toLocaleString('pt-BR'), total_players)

    message.channel.send(table.toString(), { code: 'apache' })

    return table.clearRows()

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ['shard', 'shard-info']
}
exports.help = {
    nome: "shards",
    descrição: "Mostra informaçoes das shards",
    uso: "shards",
    categoria: "Outros"
}