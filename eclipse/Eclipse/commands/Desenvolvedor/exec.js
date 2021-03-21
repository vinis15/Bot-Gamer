const process = require("child_process")
const API = require("../../Structures/extensions/utils")

module.exports.run = async (bot, message, args, idioma) => {

    if(!API.eval.includes(message.author.id)) { return }

    if(!args.join(" "))  { return message.reply("escreve ai") }

    message.channel.send("Espere").then(m => m.delete({ timeout: 5000 }));
    
    process.exec(args.join(" "), (error, stdout) => {
    
        let response = (error || stdout);
    
        message.channel.send(response, { code: "asciidoc", split: "\n" }).catch(err => message.channel.send(err));
    })
    return;
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: []
}
exports.help = {
  nome: "exec",
  descrição: "Roda codigos",
  uso: "exec <CODIGO>",
  categoria: "Desenvolvedor",
}