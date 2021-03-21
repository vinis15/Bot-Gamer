const { bot } = require("../index");
const { MessageEmbed, WebhookClient } = require("discord.js")
const config = require("../Structures/jsons/config.json")

bot.on('shardDisconnect', (event, shardID) => {
    let hook = new WebhookClient(config.hook.id, config.hook.token)
    let embed = new MessageEmbed()
    embed.setColor('3447003')
    embed.setDescription(`Shard ${shardID} se desconectou`)
    hook.send(embed)
})