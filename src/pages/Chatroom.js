import "assets/style/css/chatroom.css";
import defaultUser from "assets/img/default_user.jpg";
import SearchSmall from "assets/svg/SearchSmall";
import NotificationSmall from "assets/svg/NotificationSmall";
import ListSmall from "assets/svg/ListSmall";
import Close from "assets/svg/Close";
import CalendarSmall from "assets/svg/CalendarSmall";
import Loading from "components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { dateToYears_Ko } from "util";
import {
  initConnection,
  receiveAnswer,
  receiveIce,
  receiveOffer,
  receiveWelcome,
  socket,
  send,
  getUserCount,
} from "webRTC/chat";
import { dateToHoursAndMinutes } from "util";

export default function Chatroom() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [roomname, setRoomname] = useState();
  const [createDate, setCreateDate] = useState();
  const [count, setCount] = useState(1);
  const [messageList, setMessageList] = useState([
    <div className="noti createDate" key="0">
      <CalendarSmall /> <span>{dateToYears_Ko(new Date(createDate))}</span>
    </div>,
    <div className="noti" key="1">
      <span>
        ㅇㅇ님이 들어왔습니다. <br />
        운영정책을 위반한 메시지로 신고 접수 시 카카오톡 이용에 제한이 있을 수 있습니다.
      </span>
    </div>,
  ]);

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

    send(message.value);
    setMessageList([
      ...messageList,
      <div className="me" key={messageList.length}>
        <div>
          <span>{dateToHoursAndMinutes(new Date())}</span>
          <div>{message.value}</div>
        </div>
      </div>,
    ]);
    message.value = "";
  };

  const handleMessage = (event) => {
    console.log(event.data);

    console.log(messageList);
    setMessageList([
      ...messageList,
      <div className="you" key={messageList.length}>
        <img src={defaultUser} alt="" />
        <div>
          <div className="user">username</div>
          <div className="message">
            <div>{event.data}</div>
            <div className="time">{dateToHoursAndMinutes(new Date())}</div>
          </div>
        </div>
      </div>,
    ]);
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
    document.getElementById("loading").hidden = true;

    /* SOCKET */
    initConnection(state.roomname, handleMessage);
    getUserCount(state.roomname);

    socket.on("welcome", () => {
      setCount(count + 1);
      receiveWelcome();
    });
    socket.on("offer", receiveOffer);
    socket.on("answer", receiveAnswer);
    socket.on("ice", receiveIce);
    socket.on("user-count", setCount);

    return () => {
      socket.off("welcome");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice");
      socket.off("user-count");
    };
  }, []);

  const ex = (
    <>
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
    </>
  );

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

      <section className="main">{messageList}</section>

      <section className="send">
        <form onSubmit={handleSubmit}>
          <input type="text" autoFocus onChange={handleInput} />
          <button className="send_btn">전송</button>
        </form>
      </section>
    </div>
  );
}
