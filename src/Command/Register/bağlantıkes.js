const { Discord, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');

module.exports.beta = async(client, message, args) => {    
   if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.permissions.has('ADMINISTRATOR')) return message.react(config.Diger.red)
 const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) return message.channel.send({ content: "Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000}) }) 
      
        if(!member.me.voice.channel) return message.channel.send({ content: "Bağlantısını kesmek istediğiniz kullanıcı sesli odalarda bulunmuyor." })
        if(message.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return message.channel.send({ content: "Rolleri senden yüksek birinin ses kanallarında ki bağlantısını kesemezsin." })
        member.me.voice.kick()
  const embed = new Discord.MessageEmbed()
        .setAuthor(undefined)
        .setDescription("<@"+member+"> adlı kişinin **"+member.me.voice.channel.name+"** adlı ses kanalından çıkarıldı.!")
        .setColor("BLACK")
         message.channel.send({ embeds: [embed] })
        
       




};

module.exports.config = { 
    name: 'bağlantıkes',
    aliases: ['top-teyit','kayıt-liste']
};