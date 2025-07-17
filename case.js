require('./config');
const fs = require('fs');
const util = require('util')
const { exec } = require("child_process");
const { config } = require('process');
const { sensitiveHeaders } = require('http2');

module.exports = async (Lunatic, m) => {
try {
const body = (
(m.mtype === 'conversation' && m.message.conversation) ||
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) ? (
(m.mtype === 'conversation' && m.message.conversation) ||
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) : '';


//_________ Variabel Utama _________\\
const budy = (typeof m.text === 'string') ? m.text : '';
const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")

//_________ Variabel Informasi _________\\
const sender = m.key.fromMe ? (Lunatic.user.id.split(':')[0]+'@s.whatsapp.net' || Lunatic.user.id) : (m.key.participant || m.key.remoteJid)
const botNumber = await Lunatic.decodeJid(Lunatic.user.id)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`

//_________ Variabel Data-Data _________\\
const GroupCheck = m.chat.endsWith('@g.us')
const groupMetadata = GroupCheck ? await Lunatic.groupMetadata(m.key.remoteJid) : {}
let participant_bot = (GroupCheck ? groupMetadata.participants.find((v) => v.id == m.botNumber) : {}) || {}
let participant_sender = (GroupCheck ? groupMetadata.participants.find((v) => v.id == m.sender) : {}) || {}
const participants = m.isGroup ? await groupMetadata.participants : "";

//_________ Variabel Check _________\\
const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
const isBot = botNumber.includes(senderNumber)
const isGroup = m.chat.endsWith('@g.us')
const isBotAdmin = participant_bot?.admin !== null ? true : false
const isAdmin = participant_sender?.admin !== null ? true : false


//_________ Logs Chat _________\\
if (command) console.log( "~>Command",text,"from",pushname,"in",isGroup ? "Group Chat" : "Private Chat");


//_________ Function Message _________\\
const ments = (teks) => { return teks.match("@") ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") : [sender]};
const reply = (teks) => { return Lunatic.sendMessage(m.chat,{ text: teks, mentions: ments(teks) },{ quoted: m })};



//_________ Fitur _________\\
switch(command) {
case 'hidetag': case 'h': {
if (!m.isGroup) return reply(global.notif.group)
if (!isAdmin) return reply('Khusus Admin!!')
if (!isBotAdmin) return reply('_Bot Harus Menjadi Admin Terlebih Dahulu_')
Lunatic.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}
break

default:
}
} catch (err) {
console.log(util.format(err))
}
}

//_________ Logs Pembaharuan Script _________\\
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
 