import "assets/style/css/chatroom.css";
import defaultUser from "assets/img/default_user.jpg";
import SearchSmall from "assets/svg/SearchSmall";
import NotificationSmall from "assets/svg/NotificationSmall";
import ListSmall from "assets/svg/ListSmall";
import Close from "assets/svg/Close";
import CalendarSmall from "assets/svg/CalendarSmall";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { chat } from "webRTC/chat";
import Loading from "components/Loading";
import { dateToYears_Ko } from "util";

export default function Chatroom() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { socket, initConnection, setDataChannel, sendAnswer, receiveAnswer, getUserCount } = chat();

  const [roomname, setRoomname] = useState();
  const [createDate, setCreateDate] = useState();
  const [count, setCount] = useState(0);

  let connection = null;
  let dataChannel = null;

  const handleInput = (event) => {
    const btn = document.querySelector(".send_btn");

    if (event.target.value.length > 0) btn.classList.add("active");
    else btn.classList.remove("active");
  };

  const handleClose = () => navigate("/list");

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = document.querySelector("#chatroom form input");
    if (message.value.length === 0) return;
  };

  useEffect(() => {
    // navigate 파라미터 없을때 redirect
    if (!state) {
      alert("접근할 수 없는 페이지입니다");
      navigate("/list");
      return;
    }

    setRoomname(state.roomname);
    setCreateDate(state.createDate);
    getUserCount(roomname);
    document.getElementById("loading").hidden = true;

    /* SOCKET */
    connection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
          ],
        },
      ],
    });

    connection.addEventListener("icecandidate", (data) => {
      console.log("send ice candidate");
      socket.emit("icecandidate", data.candidate, state.roomname);
    });

    socket.on("welcome", async (username) => {
      dataChannel = connection.createDataChannel("dataChannel");
      dataChannel.addEventListener("message", console.log);
      console.log(dataChannel);
      dataChannel.addEventListener("message", console.log);

      const offer = await connection.createOffer();

      connection.setLocalDescription(offer);
      console.log("send offer: ", offer, state.roomname);
      socket.emit("offer", offer, state.roomname);
    });

    socket.on("offer", async (offer) => {
      console.log("receive offer: " + offer);
      connection.addEventListener("datachannel", (event) => {
        console.log("datachannel event");
        console.log(event.channel);
        dataChannel = event.channel;
      });

      connection.setRemoteDescription(offer);

      const answer = await connection.createAnswer();
      console.log("send answer");
      socket.emit("answer", answer, state.roomname);

      console.log("dataChannel: " + dataChannel);
    });

    socket.on("answer", (answer) => {
      connection.setRemoteDescription(answer);
      console.log("receive answer");

      console.log("dataChannel: " + dataChannel);

      console.log(dataChannel);
    });

    /*
      initConnection(state.roomname);
      socket.on("user-count", (count) => setCount(count));
      socket.on("welcome", async (username, count) => {
        console.log("setDataChannel");
        setDataChannel();

        const noti = document.createElement("div");
        const span = document.createElement("span");
        span.innerText = username + "님이 들어왔습니다.";
        noti.className = "noti";
        noti.appendChild(span);

        document.querySelector("#chatroom .main").appendChild(noti);
        setCount(count);
      });
      socket.on("offer", (offer) => {
        console.log("offer");
        sendAnswer(offer);
      });
      socket.on("answer", (answer) => {
        console.log("answer");
        receiveAnswer(answer);
      });
      */
  }, []);

  return (
    <div id="chatroom" className="page">
      <Loading />
      <Close handleClose={handleClose} />
      <section className="info">
        <img src={defaultUser} alt="" />
        <div>
          <div className="chatroom_name">
            <strong>{roomname}</strong> ({count})
          </div>
          <div className="btns">
            <div>
              <SearchSmall />
            </div>
            <div>
              <NotificationSmall />
              <ListSmall />
            </div>
          </div>
        </div>
      </section>

      <section className="main">
        <div className="noti createDate">
          <CalendarSmall /> <span>{dateToYears_Ko(new Date(createDate))}</span>
        </div>
        <div className="noti">
          <span>
            ㅇㅇ님이 들어왔습니다. <br />
            운영정책을 위반한 메시지로 신고 접수 시 카카오톡 이용에 제한이 있을 수 있습니다.
          </span>
        </div>

        <div className="me">
          <div>
            <span>오후 11:52</span>
            <div>채팅채팅ㅌ챙내럄ㄴㅇ래fasdfㅁㄹ</div>
          </div>
        </div>

        <div className="you">
          <img src={defaultUser} alt="" />
          <div>
            <div className="user">username</div>
            <div className="message">
              <div>messagesadfsfasdfsdfsdafssdfsdafasdffasdfasdffasdf</div>
              <div>messagesadfsfasdfsdfsdafssdfsdafasdffasdfasdffasdf</div>
              <div>messafasdffasdf</div>
              <div className="time">오후 12:24</div>
            </div>
          </div>
        </div>

        <div className="you">
          <img src={defaultUser} alt="" />
          <div>
            <div className="user">username</div>
            <div className="message">
              <div>messagesadfsfasdfsdfsdafssdfsdafasdffasdfasdffasdf</div>
              <div>messagesadfsfasdfsdfsdafssdfsdafasdffasdfasdffasdf</div>
              <div>messafasdffasdf</div>
              <div className="time">오후 12:24</div>
            </div>
          </div>
        </div>
      </section>

      <section className="send">
        <form onSubmit={handleSubmit}>
          <input type="text" autoFocus onChange={handleInput} />
          <button className="send_btn">전송</button>
        </form>
      </section>
    </div>
  );
}
