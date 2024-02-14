import io from "socket.io-client";

const socket = io("http://localhost:5173/");
socket.emit("message", "WebSocket connection established");

export default socket