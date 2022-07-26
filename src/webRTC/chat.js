import { io } from "socket.io-client";
import { storage } from "store/storage";
import defaultUser from "assets/img/default_user.jpg";

const socket = io(storage.get("server"));

/** @type {RTCPeerConnection} */
let connection = null;
let roomname = null;

export const chat = () => {
  const setUsername = (username) => {
    socket.emit("username", username);
  };

  const getRooms = () => socket.emit("rooms");

  const createRoom = (roomname, description) => {
    socket.emit("create-room", roomname, description);
  };

  return { socket, setUsername, getRooms, createRoom };
};
