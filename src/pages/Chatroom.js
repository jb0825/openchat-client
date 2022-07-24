import "assets/style/css/chatroom.css";
import defaultUser from "assets/img/default_user.jpg";
import SearchSmall from "assets/svg/SearchSmall";
import NotificationSmall from "assets/svg/NotificationSmall";
import ListSmall from "assets/svg/ListSmall";
import Close from "assets/svg/Close";
import CalendarSmall from "assets/svg/CalendarSmall";

export default function Chatroom() {
  const handleInput = (event) => {
    const btn = document.querySelector(".send_btn");

    if (event.target.value.length > 0) btn.classList.add("active");
    else btn.classList.remove("active");
  };

  return (
    <div id="chatroom" className="page">
      <Close />
      <section className="info">
        <img src={defaultUser} alt="" />
        <div>
          <div className="chatroom_name">
            <strong>방이름</strong>(4)
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
        <div className="noti">
          <CalendarSmall /> <span>2022년 7월 1일 몇요일</span>
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
          <div>
            <div>채팅ㅍ채티ㅐ얄ㅇ니ㅏ어리ㅏㄴ우랻ㄱ</div>
            <span>오후 12:24</span>
          </div>
        </div>
      </section>

      <section className="send">
        <div className="input">
          <input type="text" autoFocus onChange={handleInput} />
          <button className="send_btn">전송</button>
        </div>
      </section>
    </div>
  );
}
