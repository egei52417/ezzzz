const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');

module.exports.beta = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(undefined)

    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.permissions.has('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
  if (!member) return message.channel.send({ content: "**Bir Kullanıcı Belirtmelisin!**").then(x => x.delete({timeout: 5000}) });
  let kontrol = await db.has(`isimler.${member.id}`)
  if (kontrol === false) return message.channel.send({ content: "**Görünürde İsim Verisi Bulunmuyor!**").then(x => x.delete({timeout: 5000}) });

  let data = await db.get(`isimler.${member.id}`)
  let sayı = await db.get(`sayı.${member.id}`) || "0"
  let isimler = data.length > 0 ? data.map((value, index) => `${index + 1}. \`${value.isimleri}\` ${value.role ? value.role : " "} (${value.Tür})`).join(`\n`)  : "Bu üyenin isim kayıtı bulunamadı!";

  const embed = new MessageEmbed()
  .setTitle(`${member.user.username} Adlı Kullanıcının toplamda ${sayı} isim kayıtı bulundu:`)
  .setDescription(`${isimler}`)
  .setColor("ffffff")
 return message.channel.send({ embeds: [embed] })
};

module.exports.config = { 
    name: 'isimler',
    aliases: ['isimler']
};