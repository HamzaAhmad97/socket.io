// initialize socket.io client
import { io } from "socket.io-client";

const URL = "http://localhost:3000";
// autoConnect: false to prevent auto connection, we are doing it manually once the user selects a username
const socket = io(URL, { autoConnect: false });

// does not do anything, it is just useful during development to see all the events
socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
