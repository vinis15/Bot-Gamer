const config = require("../../Structures/jsons/config.json")
const { MessageEmbed } = require('discord.js') 
module.exports.run = async (bot, message, args, idioma) => {
    let embed = new MessageEmbed()
    embed.setColor(message.guild.me.roles.highest.color)
    embed.setDescription(`${idioma.help.comandos}: \`${bot.commands.size}\`\n${idioma.help.dev}: \`${bot.users.cache.get("672652538880720896").tag}\``)
    embed.setAuthor(`${bot.user.username}`, `${bot.user.avatarURL()}`)
    embed.setTimestamp()
    embed.setFooter(`${idioma.help.footer} | Eclipse ${config.versão}`);
    embed.addFields(
        { name: `${idioma.help.outros} (${bot.commands.filter(command => command.help.categoria === "Outros").size})`, value: `${bot.commands.filter(command => command.help.categoria === "Outros").map(e => `\`${config.prefix}${e.help.nome}\``).join(" **|** ")}` + '.', inline: false },
        { name: `${idioma.help.música} (${bot.commands.filter(command => command.help.categoria === "Música").size})`, value: `${bot.commands.filter(command => command.help.categoria === "Música").map(e => `\`${config.prefix}${e.help.nome}\``).join(" **|** ")}` + '.', inline: false },
        { name: `${idioma.help.filtros} (${bot.commands.filter(command => command.help.categoria === "Filtros").size})`, value: `${bot.commands.filter(command => command.help.categoria === "Filtros").map(e => `\`${config.prefix}${e.help.nome}\``).join(" **|** ")}` + '.', inline: false },
        { name: `${idioma.help.desenvolvedor} (${bot.commands.filter(command => command.help.categoria === "Desenvolvedor").size})`, value: `${bot.commands.filter(command => command.help.categoria === "Desenvolvedor").map(e => `\`${config.prefix}${e.help.nome}\``).join(" **|** ")}` + '.', inline: false }
    )
    return message.channel.send(embed)
}
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliase: ["ajuda", "comandos", "cmds"]
}
exports.help = {
    nome: "help",
    descrição: "Mostra os comandos do bot",
    uso: "help [COMANDO]",
    categoria: "Outros"
}