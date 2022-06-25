const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const emoji = require('../../Settings/Emojis.json');
const db = require('quick.db')

module.exports.beta = async(client, message, args) => {
  
  

    let yanlis = new MessageEmbed().setAuthor(undefined)
    let embed = new MessageEmbed().setAuthor(undefined)
    
    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.permissions.has('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send({ content: yanlis.setDescription(`Bir üye belirtmen gerekiyor.`)).then(x => x.delete({timeout: 5000}) });
    if(uye.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ content: yanlis.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.')).then(x => x.delete({timeout: 5000}) });
    
    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")
  
let İsim =  "Kayıtsız"
    await uye.setNickname(İsim)
  db.add(`yetkili.${message.author.id}.kayıtsız`, 1)
  db.add(`sayı.${uye.id}`, +1)
  
    await uye.roles.cache.has(config.Roller.Booster) ? uye.roles.set([config.Roller.Booster, config.Register.unreg]) : uye.roles.set([config.Register.unreg]);
    
  
    message.channel.send({ content: embed.setDescription(`${uye} Adlı Kullanıcı Kayıtsıza (<@&${config.Register.unreg}>) Atıldı!`)).then(x => x.delete({timeout: 5000}) });

  
  await db.push(`isimler.${uye.id}`, {
        userID: uye.id,
        isimleri: İsim,
        role: `(<@&${config.Register.unreg}>)`,
        teyitciid: message.author.id,
        Tür: "**Kayıtsız**"
    })
};

module.exports.config = { 
    name: 'kayıtsız',
    aliases: ['unreg']
};