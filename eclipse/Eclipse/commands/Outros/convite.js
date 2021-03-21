const { MessageEmbed } = require("discord.js")
module.exports.run = async (bot, message, args, idioma) => {
    let embed = new MessageEmbed()
    embed.setColor(message.guild.me.roles.highest.color)
    embed.setAuthor(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true, size: 2048})}`)
	embed.setDescription(`${idioma.convite.menssagem} ${message.author.tag} ${idioma.convite.menssagem2}\n${idioma.convite.link}(https://discord.com/api/oauth2/authorize?client_id=731185772551733340&permissions=3163136&scope=bot)`)
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["invite"]
}
exports.help = {
    nome: "convite",
    descrição: "Convite do bot",
    uso: "convite",
	categoria: "Outros"
}
