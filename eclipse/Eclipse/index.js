const color = require("colors")
console.log("[LOGIN] - Iniciando conexão".brightCyan)
const fs = require("fs");
const Enmap = require('enmap')
const Discord = require("discord.js")
const bot = new Discord.Client({ disableMentions: "all" })
const config = require("./Structures/jsons/config.json");
const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");
const glob = require('glob');
const clientID = config.clientID
const clientSecret = config.clientSecret

bot.idiomas = {}
require('./languages/pt')(bot)
require('./languages/en')(bot)

bot.idioma = new Enmap({ name: 'idiomas' })
bot.cooldown = new Enmap({ name: 'cooldown' })
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


glob(__dirname+'/commands/*/*.js', function (er, files) {
    if(er) console.log(er)
    files.forEach(f => {
        let props = require(`${f.replace('.js', '')}`)
        bot.commands.set(props.help.nome,props)
        for (const aliase of props.conf.aliase){
            bot.aliases.set(aliase,props)
        };})
    console.log("[COMANDOS] - Carregados com sucesso".brightCyan)
})


fs.readdir("./events/", (err, files) => {
    if(err)
        console.error(err);
    const eventsFiles = files.filter(file => file.split(".").pop() == "js");
    if(eventsFiles.length <= 0)
        return console.warn("[EVENTOS] - Não existem eventos para ser carregado".brightRed);
    eventsFiles.forEach((file, i) => {
        require("./events/" + file);
    })
    console.log("[EVENTOS] - Carregados com sucesso".brightCyan)
});


require("./Structures/extensions/player")
const nodes = require("./Structures/extensions/nodes");
bot.manager = new Manager({
    nodes,
    plugins: [ new Spotify({clientID, clientSecret}) ],
    autoPlay: true,
    send: (id, payload) => {
      const guild = bot.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
})
    .on("nodeConnect", node => console.log(`[NODE] - ${node.options.identifier} conectado`.brightCyan))
    .on("nodeError", (node, error) => console.log(`[NODE] - ${node.options.identifier} encontrou um erro: ${error.message}.`.brightRed))
    .on("trackStart", (player, track) => {
        const channel = bot.channels.cache.get(player.textChannel);
        let idioma = bot.idioma.get(channel.guild.id) || 'pt'
        if(idioma === 'en') idioma = bot.idiomas.en
        if(idioma === 'pt') idioma = bot.idiomas.pt
        let embed = new Discord.MessageEmbed()
        embed.setDescription(`**${idioma.erela.tocando}** \`${track.title}\``)
        embed.setTimestamp()
        embed.setColor(bot.channels.cache.get(player.textChannel).guild.me.roles.highest.color)
        embed.setFooter(`${idioma.erela.pedido} ${track.requester.tag}`, `${track.requester.displayAvatarURL({ dynamic: true, size: 2048 })}`)
        channel.send(embed).then(msg => player.set("message", msg));
    })
    .on("socketClosed", (player, payload) => {
        if(payload.byRemote == true) {
            player.destroy()
        }
    })
    .on("trackEnd", player => {
        if(player.get("message") && !player.get("message").deleted) player.get("message").delete();
    })
    .on("trackStuck", (player, track, payload) => {
        const channel = bot.channels.cache.get(player.textChannel)
        let idioma = bot.idioma.get(channel.guild.id) || 'pt'
        if(idioma === 'en') idioma = bot.idiomas.en
        if(idioma === 'pt') idioma = bot.idiomas.pt
        if(player.get("message") && !player.get("message").deleted) player.get("message").delete();
        channel.send(idioma.erela.erro)
    })
    .on("trackError", (player, track, payload) => {
        const channel = bot.channels.cache.get(player.textChannel)
        let idioma = bot.idioma.get(channel.guild.id) || 'pt'
        if(idioma === 'en') idioma = bot.idiomas.en
        if(idioma === 'pt') idioma = bot.idiomas.pt
        if(!player.get("message")) { return }
        if(player.get("message") && !player.get("message").deleted) player.get("message").delete();
        channel.send(idioma.erela.erro)
    })
    .on("playerMove", (player, currentChannel, newChannel) => {
        player.voiceChannel = bot.channels.cache.get(newChannel);
    })
    .on("queueEnd", player => {
        const channel = bot.channels.cache.get(player.textChannel);
        let idioma = bot.idioma.get(channel.guild.id) || 'pt'
        if(idioma === 'en') idioma = bot.idiomas.en
        if(idioma === 'pt') idioma = bot.idiomas.pt
        channel.send(idioma.erela.saindo);
        player.destroy()
    });

    bot.once("ready", () => {
        bot.manager.init(bot.user.id);
    });

    bot.on("raw", d => bot.manager.updateVoiceState(d));


bot.login(config.token)

module.exports = {
    bot,
    Manager
}