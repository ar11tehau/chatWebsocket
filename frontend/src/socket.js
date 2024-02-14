import io from "socket.io-client";

const socket = io("https://chat.domelier.fr/chat");
socket.emit("message", "WebSocket connection established");

export default socket