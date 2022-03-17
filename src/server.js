import 'dotenv/config'
import express from 'express';
import fs from 'fs';
import { createServer } from 'http';
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { pubClient, subClient } from './redis.js';

import socketioController from './socketio-controller.js';

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

//Set up Socket.io event listeners
socketioController(io);

httpServer.listen(9001, () => {
    console.log("Listening on *:9001");
});
/*Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));

    httpServer.listen(9001, () => {
        console.log("listening on *:9001");
    });
}).catch(err => console.error(err));*/

export { texts, connectedUsers };