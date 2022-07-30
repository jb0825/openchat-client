import { io } from "socket.io-client";
import { storage } from "store/storage";

export const socket = io(storage.get("server"));
/** @type {RTCPeerConnection} */
export let connection = null;
/** @type {RTCPeerConnection.dataChannel} */
export let dataChannel = null;

let roomname = null;
let handleMessage = null;

export const send = (message) => dataChannel.send(message);

/* CONNECTION & EVENT LISTENER */
export const initConnection = (room, handleMsg) => {
  console.log("init Connection " + room);
  roomname = room;
  connection = new RTCPeerConnection();
  connection.addEventListener("icecandidate", handleIce);
  handleMessage = handleMsg;
};

const handleIce = (data) => {
  console.log("send ice candidate");
  socket.emit("ice", data.candidate, roomname);
};

const handleDataChannel = (event) => {
  console.log("datachannel created");
  dataChannel = event.channel;
  dataChannel.addEventListener("message", handleMessage);
};

/* SOCKET.EMIT FUNCTIONS */
/**
 * Set username of Socket
 * @param {string} username
 */
export const setUsername = (username) => socket.emit("username", username);

/**
 * Get rooms {roomname: { description, createDate}} from Server
 * @returns {object}
 */
export const getRooms = () => socket.emit("rooms");

/**
 * Create room
 * @param {string} roomname
 * @param {string} description
 * @param {string} createDate
 */
export const createRoom = (roomname, description, createDate) =>
  socket.emit("create-room", roomname, description, createDate);

/**
 * Get user count of chatroom
 * @param {string} roomname
 */
export const getUserCount = (roomname) => socket.emit("user-count", roomname);

/**
 * Join room
 * @param {string} roomname
 */
export const joinRoom = (roomname) => socket.emit("join-room", roomname);

/* SOCKET.ON FUNCTIONS */

/**
 * Receive event "welcome" from Server
 */
export const receiveWelcome = async () => {
  getUserCount(roomname);

  console.log("create datachannel");
  dataChannel = connection.createDataChannel("dataChannel");
  dataChannel.addEventListener("message", handleMessage);

  console.log("send offer");
  const offer = await connection.createOffer();
  connection.setLocalDescription(offer);

  socket.emit("offer", offer, roomname);
};

/**
 * Receive event "offer" from Server
 * @param {RTCPeerConnection.offer} offer
 */
export const receiveOffer = async (offer) => {
  console.log("receive offer");
  connection.addEventListener("datachannel", handleDataChannel);
  connection.setRemoteDescription(offer);

  console.log("send answer");
  const answer = await connection.createAnswer();
  connection.setLocalDescription(answer);

  socket.emit("answer", answer, roomname);
};

/**
 * Receive event "answer" from Server
 * @param {RTCPeerConnection.answer} answer
 */
export const receiveAnswer = (answer) => {
  console.log("receive answer");
  connection.setRemoteDescription(answer);
};

/**
 * Receive event "ice" from Server
 * @param {RTCPeerConnection.candidate} ice
 */
export const receiveIce = (ice) => {
  console.log("receive ice candidate");
  connection.addIceCandidate(ice);
};
