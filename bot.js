
const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode'); 

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});

const DEST_GROUP_NAME = "Bot?";

client.on('qr', (qr) => {
    console.clear();
    console.log('📱 Scan this QR Code to log in:\n');
    QRCode.toString(qr, { type: 'terminal' }, (err, url) => {
        if (err) return console.error("❌ Failed to generate QR code", err);
        console.log(url);
    });
});

client.on('ready', () => {
    console.log('✅ Bot is ready!');
});

client.on('message', async (msg) => {

    if (msg.from.includes('@g.us')) return;

    const chats = await client.getChats();
    const group = chats.find(chat => chat.isGroup && chat.name === DEST_GROUP_NAME);

    if (!group) {
        console.log("❌ Group not found!");
        return;
    }

    try {

        if (msg.hasMedia) {
            const media = await msg.downloadMedia();
            await client.sendMessage(group.id._serialized, media, {
                caption: `${msg.from}`
            });
        } else {
            await client.sendMessage(group.id._serialized, `${msg.body}`);
        }
    } catch (err) {
        console.error("❌ Failed to forward message:", err);
    }
});

// Initialize the client
client.initialize();
