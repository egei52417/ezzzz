const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');

module.exports.beta = async(client, message, args) => {
    let embed = new MessageEmbed().setFooter({text:message.author.username, message.author.avatarURL({dynamic:true})).setColor('RANDOM').setFooter(Main.Footer).setTimestamp(})

    if(!args[0]) {
        message.channel.send({ content: embed.setDescription(` Komutu yanlış kullandınız! .taglıalım aç/kapat`) })
        return;    
        }

    if (args[0] == 'aç') {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.react(config.Diger.red)

        let açıkmı =  db.fetch(`taglıalım.${message.guild.id}`)
        if(açıkmı === true) return message.channel.send({ content: embed.setDescription(`Sunucu zaten taglı alımda`)).then(x => x.delete({ timeout: 5000 }) })
        await db.set(`taglıalım.${message.guild.id}`, true)
        message.channel.send({ content: embed.setDescription(`Sunucu başarıyla taglı alıma açıldı.`)).then(x => x.delete({ timeout: 5000 }) })
     }

    if (args[0] == 'kapat') { 
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({ embeds: [new MessageEmbed().setDescription(`Yeterli yetkiye sahip değilsin.`).setColor('RED')).then(x => x.delete({timeout: 5000})] })
        let kapalımı = db.fetch(`taglıalım.${message.guild.id}`)
        if(kapalımı === false) return message.channel.send({ content: embed.setDescription(`Sunucu zaten taglı alıma kapalı`)).then(x => x.delete({ timeout: 5000 }) })
        await db.set(`taglıalım.${message.guild.id}`, false)
        message.channel.send({ content: embed.setDescription(`Sunucu başarıyla taglı alıma kapatıldı.`)).then(x => x.delete({ timeout: 5000 }) })
    }
};

module.exports.config = { 
    name: 'taglıalım',
    aliases: ['taglı-alım']
};