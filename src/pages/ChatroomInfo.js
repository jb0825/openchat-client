import "assets/style/css/chatroomInfo.css";
import logo from "assets/img/logo.png";
import Close from "assets/svg/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { dateToYears } from "util";
import { useEffect, useState } from "react";
import Loading from "components/Loading";
import { socket, getUserCount, joinRoom } from "webRTC/chat";
import Modal, { toggle } from "components/Modal";

export default function ChatroomInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [roomname, setRoomname] = useState();
  const [description, setDescription] = useState();
  const [createDate, setCreateDate] = useState();
  const [group, setGroup] = useState("false");
  const [count, setCount] = useState(0);
  //const { room, description, createDate } = useLocation().state;

  const handleClose = () => navigate("/list");
  const handleButtonClick = () => {
    if (group === "false" && count >= 2) {
      toggle();
      return;
    }

    joinRoom(roomname);
    getUserCount(roomname);
    navigate("/chatroom", { state: { roomname, createDate, group } });
  };

  useEffect(() => {
    // navigate 파라미터 없을때 redirect
    if (!state) {
      alert("접근할 수 없는 페이지입니다");
      navigate("/list");
      return;
    }

    getUserCount(state.roomname);

    setRoomname(state.roomname);
    setDescription(state.description);
    setCreateDate(state.createDate);
    setGroup(state.group);

    document.getElementById("loading").hidden = true;

    socket.on("user-count", (count, roomname) => {
      console.log("receive usercount");
      if (roomname !== state.roomname) return;
      setCount(count);
    });

    return () => socket.off("user-count");
  }, []);

  return (
    <div id="chatroom_info" className="page">
      <Loading />
      <Modal content="채팅방에 참가할 수 없습니다." />
      <Close handleClose={handleClose} />
      <img src={logo} alt="" />
      <div className="info">
        <h3>{group === "true" ? "그룹채팅" : "1:1 채팅"}</h3>
        <h2>{roomname}</h2>
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
