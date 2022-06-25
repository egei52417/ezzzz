const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const emoji = require('../../Settings/Emojis.json');

module.exports.beta = async(client, message, args) => {
    let yanlis = new MessageEmbed().setAuthor(undefined)
    
    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.permissions.has('ADMINISTRATOR')) return message.react(config.Diger.red)
    
    let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;


      let kadınsayı = await db.get(`yetkili.${message.author.id}.kadın`)
  let erkeksayı = await db.get(`yetkili.${message.author.id}.erkek`)
  let toplam = await db.get(`yetkili.${message.author.id}.toplam`)
  let isim = await db.get(`yetkili.${message.author.id}.isim`)
  let kayıtsız = await db.get(`yetkili.${message.author.id}.kayıtsız`)
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
if (!member) return message.channel.send({ content: `**Bir Kullanıcı Belirtmelisin!**`).then(x => x.delete({timeout: 5000}) });// burayı değiştirebilirsiniz
  
  const embed = new MessageEmbed()
  .setTitle(`${member.username} Kullanıcısının Teyit Verisi:`)
  .setDescription(`
  • Toplam Kayıt Verisi: \`${toplam || "0"}\`
  • Toplam Kadın Kayıt Verisi: \`${kadınsayı || "0"}\`
  • Toplam Erkek Kayıt Verisi: \`${erkeksayı || "0"}\`
  • Toplam Kayıtsıza Atma Verisi: \`${kayıtsız || "0"}\`
  • Toplam İsim Değiştirme Verisi: \`${isim || "0"}\``)

  .setColor("ffffff")
  message.channel.send({ embeds: [embed] })
};

module.exports.config = { 
    name: 'kayıtlarım',
    aliases: ['kayıtlar','teyit']
};