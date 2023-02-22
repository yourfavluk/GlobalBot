const { ifError } = require('assert');
const { randomBytes } = require('crypto');
const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const reactionRolesConfig = JSON.parse(fs.readFileSync('reactionroles.json' , 'utf8'))


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on("messageReactionAdd", async (reaction, user) => {
  if(reaction.message.partial) reaction.fetch();
  if(reaction.partial) reaction.fetch();
  if(user.bot || !reaction.message.guild) return;

  for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
    let reactionrole = reactionRolesConfig.reactions[index];

    if(reaction.message.id == reactionrole.message && reaction.emoji.name == reactionrole.emoji){
      reaction.message.guild.members.cache.get(user.id).roles.add(reactionrole.role)
    }
  }
})

client.on("messageReactionRemove", async (reaction, user) => {
  if(reaction.message.partial) reaction.fetch();
  if(reaction.partial) reaction.fetch();
  if(user.bot || !reaction.message.guild) return;

  for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
    let reactionrole = reactionRolesConfig.reactions[index];

    if(reaction.message.id == reactionrole.message && reaction.emoji.name == reactionrole.emoji && reaction.message.guild.members.cache.get(user.id).roles.cache.has(reactionrole.role)){
      reaction.message.guild.members.cache.get(user.id).roles.remove(reactionrole.role)
    }
  }
})



client.on('message', async (msg) => {
  if(msg.author.bot || !msg.guild) return;
  if(msg.content.startsWith('!createReactionRole') && msg.member.hasPermission('ADMINISTRATOR')){
    var args = msg.content.split(' ');
    if(args.length == 3){
      var emoji = args[1];
      var roleid = args[2]
      var role = msg.guild.roles.cache.get(roleid);
      if(!role){
        msg.reply('Diese Rolle ist nicht für dich erhältlich.')
        return;
      } 
      var embed = new Discord.MessageEmbed()
      .setTitle('Klicke  ' + emoji)
      .setDescription('Drücke auf ' + emoji + " um die Rolle:" + `<@&${role.id}>` + " zu erhalten oder ggf. zu entfernen.");
      var message = await msg.channel.send(embed)
      message.react(emoji)
      var toSave = {message: message.id, emoji: emoji,role: roleid}

  }

})




client.login('TOKEN');