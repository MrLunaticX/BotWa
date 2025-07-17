//_________ Informasi Utama _________\\
global.owner = [""]
global.botx = ""
global.namabot = ""
global.namaown = ""

//_________ Informasi System _________\\
global.apikey = ""

//_________ Informasi Utama _________\\
global.notif = {
    done     : "🤗 Selesai! Semuanya Berjalan Lancar~",
    admin    : "_*❗ Perintah Ini Hanya Dapat Digunakan Oleh Admin Grup!*_",
    botAdmin : "_*❗ Bot Harus Menjadi Admin Grup Untuk Menggunakan Perintah Ini!*_",
    owner    : "_*❗ Perintah Ini Khusus Untuk Pemilik Bot!*_",
    group    : "_*❗ Perintah Ini Hanya Berlaku di Obrolan Grup!*_",
    private  : "_*❗ Perintah Ini Hanya Dapat Digunakan di Obrolan Pribadi!*_",
    wait     : "_*⏳ Mohon Tunggu, Sedang Dalam Proses!*_",
};

//_________ Logs Pembaharuan Script _________\\
let fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})