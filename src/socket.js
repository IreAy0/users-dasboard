import { io } from "socket.io-client";
// let url = "http://localhost:3000";
let url = "https://tonote-video-sign.onrender.com";
const socket = io(url, {
  transports: ["websocket", "polling"],
  autoConnect: false,
});
export default socket;





