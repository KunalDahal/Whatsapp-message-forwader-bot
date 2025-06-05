// Import required modules
const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode'); // Better QR display

// Create a WhatsApp client with session persistence
const client = new Client({
    authStrategy: new LocalAuth(), // Stores session in .wwebjs_auth
    puppeteer: {
        headless: true, // Set to false if you want to see the browser
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});

const DEST_GROUP_NAME = "Bot?"; // Name of your target group

// Show QR code in terminal
client.on('qr', (qr) => {
    console.clear();
    console.log('📱 Scan this QR Code to log in:\n');
    QRCode.toString(qr, { type: 'terminal' }, (err, url) => {
        if (err) return console.error("❌ Failed to generate QR code", err);
        console.log(url);
    });
});

// Client is ready
client.on('ready', () => {
    console.log('✅ Bot is ready!');
});

// Handle incoming messages
client.on('message', async (msg) => {
    // Ignore group messages
    if (msg.from.includes('@g.us')) return;

    // Find the destination group
    const chats = await client.getChats();
    const group = chats.find(chat => chat.isGroup && chat.name === DEST_GROUP_NAME);

    if (!group) {
        console.log("❌ Group not found!");
        return;
    }

    try {
        // Forward media or text
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
