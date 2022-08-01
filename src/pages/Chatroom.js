import "assets/style/css/chatroom.css";
import defaultUser from "assets/img/default_user.jpg";
import SearchSmall from "assets/svg/SearchSmall";
import NotificationSmall from "assets/svg/NotificationSmall";
import ListSmall from "assets/svg/ListSmall";
import Close from "assets/svg/Close";
import CalendarSmall from "assets/svg/CalendarSmall";
import Loading from "components/Loading";
import { storage } from "store/storage";
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
  messageSend,
  getUserCount,
} from "webRTC/chat";

export default function Chatroom() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [roomname, setRoomname] = useState();
  const [count, setCount] = useState(1);
  const [messageList, setMessageList] = useState([]);

  const name = storage.get("name");

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

    messageSend(name, message.value);
    message.value = "";
  };

  useEffect(() => {
    // navigate 파라미터 없을때 redirect
    if (!state) {
      alert("접근할 수 없는 페이지입니다");
      navigate("/list");
      return;
    }

    setRoomname(state.roomname);
    document.getElementById("loading").hidden = true;

    // storage 에 있는 messageList 에 push 발생시 setMessageList 실행
    // chat.js 에서 messageList 값 변경하려고 storage 사용함
    Object.defineProperty(storage.messageList, "push", {
      value: (args) => {
        const result = Array.prototype["push"].apply(storage.messageList, [args]);
        setMessageList([...storage.messageList]);
        return result;
      },
    });

    storage.messageList.push([
      <div className="noti createDate" key="0">
        <CalendarSmall /> <span>{dateToYears_Ko(new Date(state.createDate))}</span>
      </div>,
      <div className="noti" key="1">
        <span>
          {name} 님이 들어왔습니다. <br />
          운영정책을 위반한 메시지로 신고 접수 시 카카오톡 이용에 제한이 있을 수 있습니다.
        </span>
      </div>,
    ]);

    /* SOCKET */
    initConnection(state.roomname);
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
      // 이거 안먹히는 이유 찾기
      //delete storage.messageList.push;

      socket.off("welcome");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice");
      socket.off("user-count");
    };
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
