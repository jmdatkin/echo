import { texts, connectedUsers } from './server.js';

const init = function (io, pubClient, subClient) {


    const broadcastTexts = function () {
        io.emit('textUpdate', { texts: texts });
    }

    const broadcastUsers = function () {
        io.emit("userUpdate", connectedUsers);
    };

    const supplyUserInitialId = function (socket) {
        socket.emit("helloId", socket.id);
    };

    io.on('connection', (socket) => {
        console.log("User connected");

        connectedUsers[socket.id] = socket.id.substring(0, 8);   //Initial nickname     

        broadcastUsers();
        broadcastTexts();
        supplyUserInitialId(socket);


        socket.on('text', (text) => {
            console.log(`Text from user ${socket.id}`);
            console.log(text);
            texts.push({
                user: socket.id,
                data: text
            });
            broadcastTexts();
        });

        socket.on('nick-update', (nick) => {
            connectedUsers[socket.id] = nick;
            broadcastUsers();
        });

        socket.on('disconnect', (socket2) => {
            console.log(`User ${socket2.id} disconnected`);
            delete connectedUsers[socket.id];
            broadcastUsers();
        });
    });
};

export default init;