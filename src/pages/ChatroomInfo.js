import "assets/style/css/chatroomInfo.css";
import logo from "assets/img/logo.png";
import Close from "assets/svg/Close";

export default function ChatroomInfo() {
  return (
    <div id="chatroom_info" className="page">
      <Close />
      <img src={logo} alt="" />
      <div className="info">
        <h3>그룹채팅</h3>
        <h2>채팅방 이름</h2>
        <p>설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명</p>
        <p className="create_date">24/30명 | 개설일 2022.12.28</p>
      </div>
      <div className="btns">그룹 채팅 참여하기</div>
    </div>
  );
}
