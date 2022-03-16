import io from 'socket.io-client';
import evt from './events';

const HOSTNAME = "localhost";
const PORT = "9001";
const url = `ws://${HOSTNAME}:${PORT}`;

const socket = io(url);

// UserId = '';

socket.emit("myIdRequest");

socket.on('textUpdate', (data) => {
    console.log('text!');
    console.log(data);
    evt.emit('textUpdate', data.texts);
    // texts = data.texts;
    // avg = data.avg;
    // console.log('text update');
});

socket.on("userUpdate", (users) => {
    evt.emit("userUpdate", users);
});

socket.on("helloId", id => {
    evt.emit("hello-id", id);
});

evt.on("text", (text) => {
    console.log(`sending text: ${text.value}`);
    console.log(text);
    socket.emit('text', text);
});

evt.on("nick-update", newNickname => {
    socket.emit('nick-update', newNickname);
});
