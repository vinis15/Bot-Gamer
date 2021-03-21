const API = require("../../Structures/extensions/utils")
const { MessageEmbed } = require("discord.js")
module.exports.run = async(bot, message, args, idioma) => {

  let play = message.client.manager.players.get(message.guild.id)

  const { channel } = message.member.voice;

  if(!channel) return message.reply(idioma.play.conectar);
  if(!args.length) return message.reply(idioma.play.nada)

  if(!play) {
    const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    });
    if(!channel.joinable) { return message.channel.send(idioma.play.semPerm) }
    player.connect();
  }

  const player = message.client.manager.players.get(message.guild.id)

  if(!player.options.voiceChannel === channel.id) { return message.channel.send(idioma.play.tocandoja) }

  const search = args.join(' ');
  let res;

  try {
    res = await player.search(search, message.author);
    if (res.loadType === 'LOAD_FAILED') {
      if (!player.queue.current) player.destroy();
      throw new Error(res.exception.message);
    }
  } catch (err) {
    return message.reply(idioma.play.error + err.message);
  }

  switch (res.loadType) {
    case 'NO_MATCHES':
      if (!player.queue.current) player.destroy();
      return message.reply(idioma.play.semResultado);
      case 'TRACK_LOADED':
      await player.queue.add(res.tracks[0]);

      if (!player.playing && !player.paused && !player.queue.length) player.play();
      let embed = new MessageEmbed()
      embed.setTimestamp()
      embed.setColor(message.guild.me.roles.highest.color)
      embed.setDescription(`${idioma.play.adicionado} \`${res.tracks[0].title}\`\n${idioma.play.duracao} ${API.time2(res.tracks[0].duration)}`)
      embed.setFooter(idioma.play.solicitado + res.tracks[0].requester.tag, `${res.tracks[0].requester.displayAvatarURL({ dynamic: true, size: 2048 })}`)
      return message.channel.send(embed)

    case 'PLAYLIST_LOADED':
      await player.queue.add(res.tracks);

      if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
      let embed2 = new MessageEmbed()
      embed2.setTimestamp()
      embed2.setColor(message.guild.me.roles.highest.color)
      embed2.setDescription(`${idioma.play.playlist} \`${res.playlist.name}\` ${idioma.play.com} \`${res.tracks.length}\` ${idioma.play.musicas}\n${idioma.play.duracao} ${API.time2(res.playlist.duration)}`)
      return message.channel.send(embed2);

    case 'SEARCH_RESULT':
      let max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|cancelar)$/i.test(m.content) || message.author.id && /^(\d+|cancel)$/i.test(m.content);
      if (res.tracks.length < max) max = res.tracks.length;

      const results = res.tracks
      .slice(0, max)
      .map((track, index) => `${++index} - \`${track.title}\``)
      .join('\n');

      let embed3 = new MessageEmbed()
      embed3.setColor(message.guild.me.roles.highest.color)
      embed3.setTimestamp()
      embed3.addFields({ name: idioma.play.cancelar1, value: idioma.play.cancelar2 })
      embed3.setDescription(results)
      message.channel.send(embed3);

      try {
        collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
      } catch (e) {
        if (!player.queue.current) player.destroy();
        return message.reply(idioma.play.acabouTempo);
      }

      const first = collected.first().content;

      if (first.toLowerCase() === 'cancelar' || first.toLowerCase() === 'cancel') {
        if (!player.queue.current) player.destroy();
        return message.channel.send(idioma.play.cancelado);
      }

      const index = Number(first) - 1;
      if (index < 0 || index > max - 1) return message.reply(idioma.play.numeroInvalido + max + ')');

      const track = res.tracks[index];
      await player.queue.add(track);

      let embed4 = new MessageEmbed()
      embed4.setColor(message.guild.me.roles.highest.color)
      embed4.setFooter(`${idioma.play.solicitado} ${track.requester.tag}`, `${track.requester.displayAvatarURL({ dynamic: true, size: 2048 })}`)
      embed4.setDescription(`${idioma.play.adicionado} \`${track.title}\` \n${idioma.play.duracao} ${API.time2(track.duration)}`)
      if(!player.playing && !player.paused && !player.queue.length) player.play();
      return message.channel.send(embed4);
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliase: ["tocar", "p"]
}
exports.help = {
  nome: "play",
  descrição: "Toca uma música",
  uso: "play <MUSGA>",
  categoria: "Música"
}