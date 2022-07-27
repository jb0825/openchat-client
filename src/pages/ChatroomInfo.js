import "assets/style/css/chatroomInfo.css";
import logo from "assets/img/logo.png";
import Close from "assets/svg/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { dateToYears } from "util";
import { useEffect, useState } from "react";
import Loading from "components/Loading";
import { chat } from "webRTC/chat";

export default function ChatroomInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { socket, getUserCount, joinRoom } = chat();

  const [room, setRoom] = useState();
  const [description, setDescription] = useState();
  const [createDate, setCreateDate] = useState();
  const [count, setCount] = useState(0);
  //const { room, description, createDate } = useLocation().state;

  const handleClose = () => navigate("/list");
  const handleButtonClick = () => {
    joinRoom(room);
    navigate("/chatroom", { state: { roomname: room, createDate } });
  };

  useEffect(() => {
    // navigate 파라미터 없을때 redirect
    if (!state) {
      alert("접근할 수 없는 페이지입니다");
      navigate("/list");
      return;
    }

    getUserCount(state.room);
    setRoom(state.room);
    setDescription(state.description);
    setCreateDate(state.createDate);

    document.getElementById("loading").hidden = true;

    socket.on("user-count", (count) => setCount(count));
  }, []);

  return (
    <div id="chatroom_info" className="page">
      <Loading />
      <Close handleClose={handleClose} />
      <img src={logo} alt="" />
      <div className="info">
        <h3>그룹채팅</h3>
        <h2>{room}</h2>
        <p>{description}</p>
        <p className="create_date">
          {count} 명 | 개설일 {dateToYears(new Date(createDate))}
        </p>
      </div>
      <div className="btns" onClick={handleButtonClick}>
        그룹 채팅 참여하기
      </div>
    </div>
  );
}
