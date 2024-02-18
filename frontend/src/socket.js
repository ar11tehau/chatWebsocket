import io from "socket.io-client";

// const socket = io("https://chat.domelier.fr/");
const socket = io('http://localhost:3800');
socket.emit("message", "WebSocket connection established");

export default socket