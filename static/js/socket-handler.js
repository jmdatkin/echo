import io from 'socket.io-client';
import evt from './events.js';

const HOSTNAME = "localhost";
const PORT = "9001";
const url = `ws://${HOSTNAME}:${PORT}`;

const socket = io(url);

socket.on("connect", () => {
    socket.emit("myIdRequest");
    evt.emit("connected");
});

socket.on('textUpdate', (data) => {
    evt.emit('textUpdate', data.texts);
});

socket.on("userUpdate", (users) => {
    evt.emit("userUpdate", users);
});

socket.on("helloId", id => {
    evt.emit("hello-id", id);
});

evt.on("text", (text) => {
    socket.emit('text', text);
});

evt.on("nick-update", newNickname => {
    socket.emit('nick-update', newNickname);
});

export default socket;