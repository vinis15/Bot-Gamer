const { bot } = require("../index");
const { MessageEmbed, WebhookClient } = require("discord.js")
const config = require("../Structures/jsons/config.json");

bot.on("guildDelete", guild => {
  const hook = new WebhookClient(config.hook.id, config.hook.token);
  const embed = new MessageEmbed()
  embed.setColor('3447003')
  embed.setTitle(`Saida de um servidor ${guild.name}`)
  embed.setThumbnail(guild.iconURL({ dynamic: true, size: 2048 }) || 'https://www.ferramentastenace.com.br/wp-content/uploads/2017/11/sem-foto.jpg}')
  embed.addFields(
    { name: "Humanos", value: `${guild.members.cache.filter(m => !m.user.bot).size}`, inline: true },
    { name: "Bots", value: `${guild.members.cache.filter(m => m.user.bot).size}`, inline: true },
    { name: "Região", value: `${guild.region}`, inline: true },
    { name: "Dono", value: `${guild.owner.user.tag}`, inline: true },
    { name: "Nome do server", value: `${guild.name}`, inline: true },
    { name: "ID", value: `${guild.id}`, inline: true },
    { name: "Shard", value: `${guild.shard.id}`, inline: true }
  )
  return hook.send(embed)
})