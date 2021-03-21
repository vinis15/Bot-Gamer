module.exports.run = async (bot, message, args, idioma) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`${idioma.setlang.noperm}`)

    let lang = bot.idioma.get(message.guild.id)
    if(lang === "en") {
        bot.idioma.delete(message.guild.id)
        return message.channel.send("Falarei português nesta guilda")
    }
    if(!lang) {
        bot.idioma.set(message.guild.id, 'en')
        return message.channel.send("I will speak English in this guild")
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["lang", "set-lang", "language"]
}
exports.help = {
    nome: "lang",
    descrição: "Altera o idioma na guilda",
    uso: "lang",
	categoria: "Outros"
}