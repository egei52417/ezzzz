const Discord = require('discord.js')
const client = new Discord.Client({ fetchAllMembers: true })
const fs = require('fs')
const Main = require('./src/Settings/Settings.json');
const config = require('./src/Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');
require('discord-buttons')(client)
const Activites = new Map();
const { settings } = require('cluster');

const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Set();

client.on('ready', async () => {
client.user.setStatus("online");
setInterval(() => {
const oyun = Math.floor(Math.random() * (Main.oynuyor.length));
client.user.setActivity(`${Main.oynuyor[oyun]}`, {type: "LISTENING"});
}, 10000);
})
//client.on("ready", () => {
//setInterval(() => {
//  client.channels.cache.get(Main.BotVoice).join(); //SES KANALI İDSİ GİRİN!
//}, 750);
// });
//client.on('voiceStateUpdate', async (___, newState) => {
 // if (
 // newState.member.user.bot &&
 // newState.channelId &&
 // newState.member.user.id == client.user.id &&
 // !newState.selfDeaf
 // ) {
 // newState.setSelfDeaf(true);
 // }
 // });
console.log("Bot Kullanıma Hazır! Kevzyy Was Here")

  fs.readdir('./src/Command//Register', (err, files) => { 
    files.forEach(fs => { 
    let command = require(`./src/Command/Register/${fs}`); 
    client.commands.set(command.config.name, command);
    if(command.config.aliases) command.config.aliases.forEach(Aliases => client.aliases.set(Aliases, command.config.name));
    });
  });

  

  client.on("messageCreate", async message => {
    if (!message.guild || message.author.bot || message.channel.type === "UNKNOWN") return;
    let prefix = Main.Prefix.filter(p => message.content.startsWith(p))[0]; 
    if (!prefix) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(prefix.length); 
    let load = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    
    if (load){
     if (!message.member.permissions.has(8) && client.cooldown.has(message.author.id)) return;
      client.cooldown.add(message.author.id);
      setTimeout(() => client.cooldown.delete(message.author.id), 5);
      load.beta(client, message, args);
    };
  });


client.on('guildMemberAdd', async member => {
    require('moment-duration-format')
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
     üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
       return {
         '0': `0`, 
         '1': `1`,
         '2': `2`,
         '3': `3`,
         '4': `4`,
         '5': `5`,
         '6': `6`,
         '7': `7`,
         '8': `8`,
         '9': `9`}[d];})}
         let user = client.users.cache.get(member.id);
         const kurulus = new Date().getTime() - user.createdAt.getTime();  
         const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]**`) 
         var kontrol;
         if (kurulus < 1296000000) kontrol = `**güvenilir gözükmüyorsun** ${config.Diger.onay}`
         if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
    await member.setRoles("config.Roller.Jailed");
           await member.roles.remove(config.Register.unreg)
    client.channels.cache.get(config.Log.HosgeldinKanal).send(`
${member.toString()}, sunucumuza hoşgeldin. Hesabın 1 Hafatadan Önce Açıldığı İçin Cezalı Duruma Düştün!

Hesabın açılma tarihi: \`${moment(member.user.createdAt).format("LLL")}\`
	  `);
  } else {
         if (kurulus > 1296000000) kontrol = `**güvenilir gözüküyorsün.** ${config.Diger.onay}`
           moment.locale("tr");
     await member.roles.add(config.Register.unreg)
         await member.setNickname(" İsim | Yaş ")
         client.channels.cache.get(config.Log.HosgeldinKanal).send(`
 :tada: ${member.toString()}, **${member.guild.name}** sunucumuza hoş geldin
Seninle beraber sunucumuz **${member.guild.memberCount}** üye sayısına ulaştı. 

Hesabın **${moment(member.user.createdTimestamp).format("LLL")}** tarihinde oluşturulmuş.
Sol Taraftaki __Confirmed__ odalarında Yetkililerimiz Seni Bekliyor Olacak! (<@&975377136791715877>) 
\`\`\`Kayıt olduktan sonra #kurallar kanalını okuduğunuzu kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız.\`\`\` `)
  }
     });


client.login(process.env.token).catch(() => console.log('Tokeni kontrol ediniz.'))



     


 client.on("messageCreate", async message => {
   if ([".tag", "!tag", "tag"].some(x => message.content === x)) {
        message.channel.send({ content: `\`#0889\`,\`⁰⁸⁸⁹\`,\`⁸⁸⁹\`,\`Léoa\`` })
    }
 })



client.on("messageCreate", async message => {
if (message.content === '.fakekatıl') { // . yerine prefixi yaz
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
})



