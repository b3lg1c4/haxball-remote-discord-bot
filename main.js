const { Client, Intents } = require("discord.js");
const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 7071 });
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, ".env") });
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const CHANNEL_ID = '600102752059654144';


client.on("ready", () => {
    console.clear();
    console.log("haxball-remote-discord-bot V1.0");
})

wss.on("connection", (ws) => {


    client.on("messageCreate", async message => {

        if (message.channel.id !== CHANNEL_ID) return;

        const messageBy = message.member.nickname ?? message.author.username;
        const messageString = message.content.toString();

        if (messageString.charAt(0) === "!") ws.send(JSON.stringify({ author: messageBy + " [📡]", message: messageString, createdAt: message.createdAt }));
    });

    ws.on("message", (msg) => {

        client.channels.cache.get(CHANNEL_ID).send(msg.toString());

    });



});





client.login(process.env.TOKEN);