const API = require("../../Structures/extensions/utils")
module.exports.run = async (bot, message, args, idioma) => {
    let m = await message.channel.send("🏓")
    await m.edit(`**Pong!** ${idioma.ping.ping} \`${bot.ws.ping}ms\`. ${idioma.ping.api} \`${Date.now() - message.createdTimestamp}ms\`\n**Uptime:** ${API.time(bot.uptime)}`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["latencia"]
}
exports.help = {
    nome: "ping",
    descrição: "Mostra o ping do bot",
    uso: "",
	categoria: "Outros"
}
