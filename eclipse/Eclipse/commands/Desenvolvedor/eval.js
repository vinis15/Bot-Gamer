const { MessageEmbed } = require('discord.js')
const config = require("../../Structures/jsons/config.json")
const API = require("../../Structures/extensions/utils")

module.exports.run = async (bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);
    if(!API.eval.includes(message.author.id)) return message.reply('sem perm')
        try {
            if(!args.join(' ')) return message.reply('Escreve ai')
            let code = await eval(args.join(" "));
            if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 });
            let embed = new MessageEmbed()
            .setColor(message.guild.me.roles.highest.color)
            .addField('📩 Entrada', `\`\`\`js\n${args.join(" ")}\`\`\``)
            .addField('🚩 Saída', `\`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
            if(code.length > 1010) embed.addField('🚩 Continuação do Resultado', `\`\`\`js\n${code.slice(1010, 2020)}\n\`\`\``)
            message.reply({embed})
        } catch(err) {
            message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
        }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["ev", "e"]
}

exports.help = {
  nome: "eval",
  descrição: "Roda codigos",
  uso: "eval <CODIGO>",
  categoria: "Desenvolvedor",
}
