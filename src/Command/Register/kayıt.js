const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const emoji = require('../../Settings/Emojis.json');
const moment = require('moment');

module.exports.beta = async(client, message, args) => {
    let yanlis = new MessageEmbed().setAuthor(undefined)

    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.permissions.has('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let taglıalım = await db.fetch(`taglıalım.${message.guild.id}`)
    if(taglıalım === true){
        if(!uye.user.username.includes(Main.Tag) && !uye.roles.cache.has(config.Roller.VIP) && !uye.roles.cache.has(config.Roller.Booster)) return message.channel.send({ content: yanlis.setDescription(`Sunucumuza şuan taglı alımdadır. Kişinin kayıt olabilmesi için 3 seçenek vardır ; \n 1- Sunucumuzun tagını alabilir. \n 2- Sunucuma boost basabilir. \n 3- Vip Rolü verilebilir.`)).then(x => x.delete({timeout: 5000}) });
    }
    let Name = args[1]
    let Age = args[2]
    if(!uye) return message.channel.send({ content: yanlis.setDescription('Bir kullanıcı belirtmelisin. <@üye/ID>')).then(x => x.delete({timeout: 5000}) });
    if(!Name || !Age ) return message.channel.send({ content: yanlis.setDescription(`Yanlış kullanım. **${Main.Prefix}kayıt <@üye/ID> <İsim> <Yaş>**`)).then(x => x.delete({timeout: 5000}) });
    let cpuan = db.get(`cezapuan.${uye.id}.${message.guild.id}`);
    if(uye.id === message.author.id) return message.channel.send({ content: yanlis.setDescription('Kendinizi kayıt edemezsiniz.')).then(x => x.delete({timeout: 5000}) });
    if(uye.id === message.guild.ownerId ) return message.channel.send({ content: yanlis.setDescription('Sunucu sahibini kayıt edemezsin.')).then(x => x.delete({timeout: 5000}) });
    if(uye.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ content: yanlis.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.')).then(x => x.delete({timeout: 5000}) });

    const İsim = `${Name} ' ${Age}`

  

    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")

    await uye.setNickname(`${İsim}`)

 if(!uye.roles.cache.has(config.Register.e1) && !uye.roles.cache.has(config.Register.k1)) {

    var button_1 = new MessageButton()
    .setID("MAN")
    .setLabel("Erkek")
    .setStyle("blurple")
    .setEmoji("916010225289560074")

    var button_2 = new MessageButton()
    .setID("WOMAN")
    .setLabel("Kadın")
    .setStyle("green")
    .setEmoji("916010235200679996")

    var button_3 = new MessageButton()
    .setID("İPTAL")
    .setLabel("İptal")
    .setStyle("red")
    .setEmoji("920412153712889877")

  
    message.react(config.Diger.onay)
    let ozi = new MessageEmbed()
.setDescription(`
${uye.toString()} üyesinin ismi "${İsim}" olarak değiştirildi!

**Aşağıdaki Butonlara Basarak Kullanıcın Cinsiyetini Seçebilirsiniz.**`)
.setAuthor(undefined)
.setFooter({text:`Developed By Kevzyy`})
    .setColor("ffffff")
   
 let msg = await message.channel.send({ embeds: [{ buttons : [ button_1, button_2, button_3 ], embed: ozi}] })
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 60000 })

      collector.on("collect", async (button) => {

if(button.id === "MAN") {
await button.reply.defer()
  let data = await db.get(`sayı.${uye.id}`) || 0
   db.add(`yetkili.${message.author.id}.erkek`, 1)
   db.add(`sayı.${uye.id}`, +1)
    db.add(`yetkili.${message.author.id}.toplam`, 1)
  
   let reg = db.fetch(`yetkili.${message.author.id}.toplam`)
let ozie = new MessageEmbed()

.setDescription(`
${emoji.kevzyyonay} ${uye.toString()} Adlı Kullanıcının İsmi \`${İsim}\` Olarak Değiştirildi ve <@&${config.Register.e1}> Rolü Verilerek Kayıt Edildi!

**•** \`Ek Bilgiler\`**:**

${emoji.kevzyy} <@${message.author.id}> Adlı Kullanıcın Toplam Kayıtı = \`${reg}\`

${emoji.kevzyy} Kayıt Edilen Kullanıcının toplamda **${data}** isim kayıtı bulundu!
`)
.setFooter({text:`Developed By Kevzyy | .isimler Komutuyla Kullanıcın İsimlerini Kontrol Etmeyi Unutmayın!`})
.setAuthor(undefined)
.setColor("#00d0ff")
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))

msg.edit({ embeds: [{components: null, embed: ozie}] }); 

   await uye.roles.add(config.Register.e1)
    await uye.roles.remove(config.Register.k1)
    await uye.roles.remove(config.Register.unreg)

client.channels.cache.get(config.Log.Sohbet).send({ content: `${emoji.kevzyykalp} Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`).then(x => x.delete({timeout: 10000}) }) 

  const log = new MessageEmbed()
.setColor("#1a4cee")
.setDescription(`
${emoji.kevzyyduyuru} **${uye} Adlı Kullanıcı Kayıt Edildi!**

**•** \`Detaylar;\` 

${emoji.kevzyyok}** Kullanıcı =** ${uye}-\`( ${uye.id} )\`
${emoji.kevzyyok}** Yetkili =** ${message.author}-\`( ${message.author.id} )\`
${emoji.kevzyyok}** Kayıt Türü =** \`Erkek\`
${emoji.kevzyyzaman}** Tarih =** ${kayıttarihi}
`)
.setAuthor(undefined)
.setFooter({text:"Developed By Kevzyy"})
.setTimestamp()
client.channels.cache.get(config.Log.RegisterLog).send({ embeds: [log] })
  
         await db.push(`isimler.${uye.id}`, {
        userID: uye.id,
        isimleri: İsim,
        role: `(<@&${config.Register.e1}>)`,
        teyitciid: message.author.id,
        Tür: "Kayıt"
    })


}

if(button.id === "WOMAN") {
await button.reply.defer()
  let data = await db.get(`sayı.${uye.id}`) || 0
   db.add(`yetkili.${message.author.id}.erkek`, 1)
   db.add(`sayı.${uye.id}`, +1)
    db.add(`yetkili.${message.author.id}.toplam`, 1)
  
   let reg = db.fetch(`yetkili.${message.author.id}.toplam`)
let ozik = new MessageEmbed()

.setDescription(`
${emoji.kevzyyonay}  ${uye.toString()} Adlı Kullanıcının İsmi \`${İsim}\` Olarak Değiştirildi ve <@&${config.Register.k1}> Rolü Verilerek Kayıt Edildi!

**•** \`Ek Bilgiler\`**:**

${emoji.kevzyy}  <@${message.author.id}> Adlı Kullanıcın Toplam Kayıtı = \`${reg}\`

${emoji.kevzyy}  Kayıt Edilen Kullanıcının toplamda **${data}** isim kayıtı bulundu!
`)
.setFooter({text:`Developed By Kevzyy | .isimler Komutuyla Kullanıcın İsimlerini Kontrol Etmeyi Unutmayın!`})
.setAuthor(undefined)
.setColor("#ff0097")
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))

msg.edit({ embeds: [{components: null, embed: ozik}] }); 

    await uye.roles.add(config.Register.k1)
    await uye.roles.remove(config.Register.e1)
    await uye.roles.remove(config.Register.unreg)
  
   
   
   

client.channels.cache.get(config.Log.Sohbet).send({ content: `${emoji.kevzyykalp} Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`).then(x => x.delete({timeout: 10000}) }) 
 const log = new MessageEmbed()
.setColor("#af7bff")
.setDescription(`
${emoji.kevzyyduyuru} **${uye} Adlı Kullanıcı Kayıt Edildi!**

**•** \`Detaylar;\` 

${emoji.kevzyyok}** Kullanıcı =** ${uye}-\`( ${uye.id} )\`
${emoji.kevzyyok}** Yetkili =** ${message.author}-\`( ${message.author.id} )\`
${emoji.kevzyyok}** Kayıt Türü =** \`Kız\`
${emoji.kevzyyzaman}** Tarih =** ${kayıttarihi}
`)
.setAuthor(undefined)
.setFooter({text:"Developed By Kevzyy"})
.setTimestamp()
client.channels.cache.get(config.Log.RegisterLog).send({ embeds: [log] })
  
        await db.push(`isimler.${uye.id}`, {
        userID: uye.id,
        isimleri: İsim,
        role: `(<@&${config.Register.k1}>)`,
        teyitciid: message.author.id,
        Tür: "**Kayıt**"
    })
}

if(button.id === "İPTAL") {
msg.edit({ content: `İşlem Başarıyla İptal Edildi ${config.Diger.onay}`,{components: null} }); 
uye.setNickname(`• İsim ' Yaş`)
await uye.roles.add(config.Register.unreg)
await uye.roles.remove(config.Register.k1)
await uye.roles.remove(config.Register.e1)

  
}
      })
 }


  
};

module.exports.config = { 
    name: 'kayıt',  
    aliases: ["k"]
};