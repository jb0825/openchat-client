import { io } from "socket.io-client";
import { storage } from "store/storage";

const socket = io(storage.get("server"));

/** @type {RTCPeerConnection} */
let connection = null;
/** @type {RTCPeerConnection.dataChannel} */
let dataChannel = null;
let roomname = null;

export const chat = () => {
  const handleMessage = console.log;

  const handleIcecandidate = (data) => {
    console.log("send ice candidate");
    socket.emit("icecandidate", data.candidate, roomname);
  };

  const handleDataChannel = (event) => {
    console.log(event.channel);
    dataChannel = event.channel;
  };

  const initConnection = (room) => {
    connection = new RTCPeerConnection();
    connection.addEventListener("icecandidate", handleIcecandidate);
    roomname = room;
  };

  /**
   * Create DataChannel and Send offer to Remote Connection
   */
  const setDataChannel = async () => {
    dataChannel = connection.createDataChannel("dataChannel");
    dataChannel.addEventListener("message", handleMessage);

    const offer = await connection.createOffer();
    console.log(offer);

    connection.setLocalDescription(offer);
    console.log("send offer");
    socket.emit("offer", offer, roomname);

    return dataChannel;
  };

  /**
   * Set Remote Description (offer) and Send Answer to Local Connection
   * @param {RTCPeerConnection.offer} answer
   */
  const sendAnswer = async (offer) => {
    connection.addEventListener("datachannel", handleDataChannel);
    console.log(connection.ondatachannel);
    connection.setRemoteDescription(offer);

    const answer = await connection.createAnswer();
    console.log("send answer");
    socket.emit("answer", answer, roomname);

    console.log("dataChannel: " + dataChannel);
  };

  /**
   * Receive Answer and Set Remote Description (answer) to Local Connection
   * @param {RTCPeerConnection.answer} answer
   */
  const receiveAnswer = (answer) => {
    connection.setRemoteDescription(answer);
    console.log("receive answer");

    console.log("dataChannel: " + dataChannel);
  };

  const setUsername = (username) => {
    socket.emit("username", username);
  };

  const getRooms = () => socket.emit("rooms");

  const createRoom = (roomname, description, createDate) => {
    socket.emit("create-room", roomname, description, createDate);
  };

  const getUserCount = (roomname) => {
    console.log("emit user-count");
    socket.emit("user-count", roomname);
  };

  const joinRoom = (roomname) => {
    console.log("emit join-room");
    socket.emit("join-room", roomname);
  };

  return {
    socket,
    setDataChannel,
    sendAnswer,
    receiveAnswer,
    setUsername,
    getRooms,
    createRoom,
    getUserCount,
    joinRoom,
    initConnection,
    handleDataChannel,
  };
};
