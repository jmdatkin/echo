import 'dotenv/config'
import express from 'express';
import fs from 'fs';
import { createServer } from 'http';
import { Server } from "socket.io";
import { createClient } from 'redis';

import socketioController from './socketio-controller.js';

const REDIS_URL = "redis://localhost:6379";
//Create Express object
const app = express();

//Create Node HTTP server
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:9000",
        methods: ["GET", "POST"]
    }
});

var texts = [];
const connectedUsers = {};

const storeTexts = function (newTexts) {
    texts = [...newTexts];
};

const points = function () {
    return texts.map(text => {
        return {
            x: text.data.x,
            y: text.data.y
        }
    });
};

const broadcastUsers = function () {
};

const supplyUserInitialId = function (socket) {
};

io.on('connection', (socket) => {
    console.log("User connected");

    connectedUsers[socket.id] = socket.id.substring(0, 8);   //Initial nickname     

    io.emit("userUpdate", connectedUsers);
    socket.emit('textUpdate', { texts: texts });
    socket.emit("helloId", socket.id);

    socket.on('map-data', (data) => {
        socket.emit('map-data-response', points());
    });

    socket.on('text', (text) => {
        console.log(`Text from user ${socket.id}`);
        console.log(text);
        texts.push({
            user: socket.id,
            data: text
        });
        io.emit('textUpdate', { texts: texts });
        console.log(points());
        io.emit('map-data-response', points());
    });

    socket.on('nick-update', (nick) => {
        connectedUsers[socket.id] = nick;
        io.emit("userUpdate", connectedUsers);
    });

    socket.on('disconnect', (socket2) => {
        console.log(`User ${socket2.id} disconnected`);
        delete connectedUsers[socket.id];
        io.emit("userUpdate", connectedUsers);
    });
});
//Set up Socket.io event listeners

// httpServer.listen(9001, () => {
//     console.log("Listening on *:9001");
// });

// Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
// io.adapter(createAdapter(pubClient, subClient));

// (async () => {
// socketioController(io);
// const client = createClient();
// client.on('error', (err) => console.log('Redis Client Error', err));

// await client.connect();
// });


httpServer.listen(9001, () => {
    console.log("listening on *:9001");
});
// }).catch(err => console.error(err));
export { texts, connectedUsers };