/*
© Lukas Pellny 2022
*/
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");
const { token, prefix } = require('./config.json');

client.on('ready', () => {
    console.log('ready')
    client.user.setPresence({ activity: { name: "-help〡Lukas-IT Solutions" }, status: "online"})
});


client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

  if(command === "help"){
    const help = new Discord.MessageEmbed()
      .setColor("03fc7b")
      .setTitle("**PluginCode.DE〡Globalchat Discord-Bot**")
      .setDescription("**-help**: Zeigt dir alle Befehle an.\n**-setup**: Kannst du den Channel für den Globalchat setzen!")
      .setFooter("© Lukas-IT Solutions")
      message.channel.send(help);
  }

  if (command === "setup") {
    const channel = message.mentions.channels.first();
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("Unzureichende Rechte**")
    if (!channel)
      return message.channel.send(
        "Gebe einen Kanal an**"
      );
    db.set(`g_${message.guild.id}`, `${channel.id}`);
    message.channel.send(`Der Globalchat wurde in** ${channel} **gesetzt!**`);
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) return;
  let set = db.fetch(`g_${message.guild.id}`);
  if (message.channel.id === set) {
    const botOwnerID = 
    if(message.author.id == botOwnerID) {
      message.delete();
      const embed = new Discord.MessageEmbed()
      .setColor("#03fc7b")
      .setTitle("`👑` Inhaber **»** " + message.author.tag)
      .setDescription("*" + message.content + "*" + "\n⠀⠀")
      .setAuthor("")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
      .setTimestamp()
    client.guilds.cache.forEach(g => {
      try {
        client.channels.cache.get(db.fetch(`g_${g.id}`)).send(embed);
      } catch (e) {
      return;
      }
    });
      } else{
        message.delete();
        const embed = new Discord.MessageEmbed()
      .setColor("#03fc7b")
      .setTitle("`👥` Member **»** " + message.author.tag)
      .setDescription("*" + message.content + "*" + "\n⠀⠀")
      .setAuthor("")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
      .setTimestamp()
    client.guilds.cache.forEach(g => {
      try {
        client.channels.cache.get(db.fetch(`g_${g.id}`)).send(embed);
      } catch (e) {
      return;
      }
    });
      }
  }
});
const config = require("./config.json");
client.login(config.token);
