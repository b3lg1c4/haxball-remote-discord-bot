const { Client, Intents } = require("discord.js");
const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 7071 });
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, ".env") });
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const CHANNEL_ID = '927306095335211049';


client.on("ready", () => {
    console.clear();
    console.log("haxball-remote-discord-bot V1.0");
})

wss.on("connection", (ws) => {

    client.on("message", msg => {
        if (msg.toString().charAt(0) === "!") {
            ws.send(msg.toString());
        };

    })

    ws.on("message", (msg) => {
        
        client.channels.cache.get(CHANNEL_ID).send(msg.toString());

    });



});





client.login(process.env.TOKEN);