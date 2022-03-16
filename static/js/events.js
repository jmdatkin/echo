import { EventEmitter } from 'events';

let e = new EventEmitter();

e.on('idx',() => console.log("Hello event!"));

export default e;