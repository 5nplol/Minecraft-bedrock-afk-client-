const bedrock = require('bedrock-protocol');
const { WebhookClient } = require('discord.js');


const web = '' // webhook url
const webhookClient = new WebhookClient({ url: web });


const accs = [
    "name1"
   
  // you can add more accounts here "account for example"
]



function createClient(username) {
    const client = bedrock.createClient({
        host: 'minecraft-server.com', // Replace with the server IP
        port: 19132, // port
        username: username
    });

    client.on('connect', () => {
        console.log(`Connected as ${client.username}`);
    });

    client.on('error', (error) => {
        console.error(`Error: ${error}`);
    });

    client.on('disconnect', (reason) => {
        console.log(`Disconnected: ${reason}`);
    });

    return client;
}


function sendMessageToDiscord(message) {
    webhookClient.send({
        content: message,
    })
        .then(() => {
            console.log('Message sent to Discord');
        })
        .catch((error) => {
            console.error('Error sending message to Discord:', error);
        });
}


function listner() {
    client.on('spawn', (packet) => {
        const playerName = packet.username;
        console.log(`Player ${playerName} has has joined the game`+ host);
        webhookClient.send({
            content: `Player ${playerName} has joined the game`+ host,
        });
    });
}

accs.forEach((username) => {
    const client = createClient();

    client.on('packet', (packet) => {
        if (packet.name === 'text') {
            const message = packet.message;
            const sender = packet.sender;

            if (message.includes('joined the game')) {
                console.log(`${sender} joined the game`);
                webhookClient.send({
                    content: `${sender} joined the game`,
                });
            } else if (message.includes('left the game')) {
                console.log(`${sender} left the game`);
                webhookClient.send({
                    content: `${sender} left the game`,
                });
            }
        }
    });
        client.on('disconnect', (reason) => {
            console.log(`Disconnected from server: ${reason}`);
            sendMessageToDiscord(`Disconnected from server: ${reason}`);
        });
    });
