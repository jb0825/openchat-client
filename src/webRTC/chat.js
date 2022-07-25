import io from "socket.io-client";

const server = "localhost:3001";
const socket = io(server);

/** @type {RTCPeerConnection} */
let connection = null;
let roomname = null;

const handleIceCandidate = (data) => {
  console.log("🏁send ice candidate");
  socket.emit("ice", data.candidate, roomname);
};

socket.on("ice", (ice) => {
  connection.addIceCandidate(ice);
});

socket.on("created", (rooms) => {
  console.log("rooms: ");
  rooms.forEach(console.log);
});

export const createChatroom = (roomname) => {
  console.log("Create chatroom name: " + roomname);
  socket.emit("create_room", roomname);
};

export const createConnection = (username) => {
  console.log("create connection");
  connection = new RTCPeerConnection();
  connection.addEventListener("icecandidate", handleIceCandidate);

  socket.emit("username", username);
};
