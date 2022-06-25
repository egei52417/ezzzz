
const Discord = require('discord-buttons');
const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');

module.exports.beta = async(client, message, args) => {
  let yanlis = new MessageEmbed().setAuthor(undefined)
  
   if(![config.Yetkili.AbilityYT].some(role => message.member.roles.cache.get(role)) && !message.member.permissions.has('ADMINISTRATOR')) return message.react(config.Diger.red)
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send({ content: yanlis.setDescription('Bir kullanıcı belirtmelisin. <@üye/ID>')).then(x => x.delete({timeout: 5000}) });
   
    var button_1 = new MessageButton()
    .setID("teyit")
    .setLabel("Teyitleri")
    .setStyle("blurple")
   

    var button_2 = new MessageButton()
    .setID("isim")
    .setLabel("İsimleri")
    .setStyle("green")


    var button_3 = new MessageButton()
    .setID("İPTAL")
    .setLabel("İptal")
    .setStyle("red")
    .setEmoji("920412153712889877")

  const embeds = new MessageEmbed()
  .setAuthor(undefined)
  .setColor("RANDOM")
   .setDescription(`${message.author} Merhaba! Bu panel kullanıcının veritabanında bulunan verilerini silmeye yarar! ${member} kullanıcısının hangi verilerini silmek istiyorsan o buttona tıklaman yeterli.
   \`\`\`diff
- Kayıt verileri (Teyitleri)
- Kayıtlı Olduğu İsimler (İsimleri)\`\`\`
`)
  
 let msg = await message.channel.send({ embeds: [{ buttons : [ button_1, button_2, button_3 ], embed: embeds}] })
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 60000 })

      collector.on("collect", async (button) => {
     
        if(button.id === "teyit") {
          button_1.setDisabled(true)
         await button.reply.defer()
           db.delete(`yetkili.${message.author.id}.kadın`)
 db.delete(`yetkili.${message.author.id}.erkek`)
 db.delete(`yetkili.${message.author.id}.toplam`)
          db.delete(`yetkili.${message.author.id}.kayıtsız`)
          db.delete(`yetkili.${message.author.id}.isim`)
          msg.edit({ content: `${member} kullanıcısının kayıt verileri sıfırlandı!`,{components: null} })
        }
      else if(button.id === "isim") {
       await button.reply.defer()
        db.delete(`isimler.${member.id}`)
        db.delete(`sayı.${member.id}`)
        msg.edit({ content: `${member} kullanıcısının isim verileri sıfırlandı!`,{components: null} })
        
      }
       else if(button.id === "İPTAL") {
   
   
        msg.edit({ content: `${config.Diger.onay} İşlem iptal edildi!`,{components: null} });
    } 
    })

     

    
}

module.exports.config = { 
    name: 'sıfırla',
    aliases: ['isimler']
};