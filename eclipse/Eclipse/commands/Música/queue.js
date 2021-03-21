const config = require("../../Structures/jsons/config.json")
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, idioma) => {

    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.reply(idioma.queue.nothing);

    const queue = player.queue;
    const embed = new MessageEmbed().setAuthor(`${idioma.queue.fila} ${message.guild.name}`);

    const multiple = 5;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if(queue.current) embed.addField(idioma.queue.np, `[${queue.current.title}](${queue.current.uri}) | \`${player.queue.current.requester.tag}\``);

    if(!tracks.length) embed.setDescription(`${idioma.queue.nohasmusic} ${page > 1 ? `${idioma.queue.arg1} ${page}` : `${idioma.queue.arg2}`}.`);
    else embed.setDescription(tracks.map((track, i) => `**${start + (++i)} -** [${track.title}](${track.uri})`).join("\n"));

    const maxPages = Math.ceil(queue.length / multiple);
    embed.setColor(message.guild.me.roles.highest.color)
    embed.setFooter(`${idioma.queue.arg1.replace(/^./, idioma.queue.arg1[0].toUpperCase())} ${page > maxPages ? maxPages : page} ${idioma.queue.arg3} ${maxPages}`);

    return message.channel.send(embed);
  }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["q", "fila"]
}
exports.help = {
    nome: "queue",
    descrição: "Mostra a fila de música",
    uso: "queue",
    categoria: "Música"
}
