const color = require("colors")
const config = require("./Structures/jsons/config.json")
const { ShardingManager, WebhookClient } = require('discord.js');
const hook = new WebhookClient(config.hook.id, config.hook.token);
const shard = new ShardingManager('./index.js', { 
    totalShards: 2, 
    respawn: true,
});

shard.on('shardCreate', shard => {
    console.log(`[SHARD] - Iniciando shard ${shard.id}`.brightCyan)
    hook.send(`Shard ${shard.id} iniciada`)
});
shard.spawn();
