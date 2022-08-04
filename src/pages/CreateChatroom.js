import "assets/style/css/createChatroom.css";
import Modal, { toggle } from "components/Modal";
import { useNavigate } from "react-router-dom";
import { createRoom } from "webRTC/chat";

export default function CreateChatroom() {
  const navigate = useNavigate();

  const handleInput = (event) => {
    const length = event.target.value.length;
    const label = event.target.nextElementSibling;

    label.innerText = `${length}/${label.dataset.max}`;
  };

  const handleOkButton = () => {
    const input = document.getElementById("chatroom_name");

    if (input.value.length === 0) return;
    toggle();
  };

  const handleCreate = () => {
    const group = document.querySelector("input[name='group']:checked");
    const roomname = document.getElementById("chatroom_name");
    const description = document.getElementById("description");
    const createDate = new Date();
    const state = { roomname: roomname.value, createDate };

    createRoom(roomname.value, description.value, createDate, group.value);

    roomname.value = "";
    description.value = "";
    toggle();
    navigate("/chatroom", { state });
  };

  const section = (
    <section>
      <h2>참여 설정</h2>
      <h3>채팅방 입장 조건</h3>
    </section>
  );

  return (
    <div id="create_chatroom" className="page">
      <Modal content="채팅방 만들거임?>" action={handleCreate} />

      <section>
        <h2>오픈채팅방 만들기</h2>
        <form>
          <div className="radio">
            <input id="private" type="radio" name="group" value="false" defaultChecked />
            <label htmlFor="private">
              <span>1대1 채팅방</span>
            </label>

            <input id="group" type="radio" name="group" value="true" />
            <label htmlFor="group">
              <span>그룹 채팅방</span>
            </label>
          </div>

          <div>
            <input
              id="chatroom_name"
              type="text"
              placeholder="오픈채팅방 이름을 입력해주세요."
              required
              onChange={handleInput}
              maxLength="30"
            />
            <label htmlFor="chatroom_name" data-max="30">
              0/30
            </label>
          </div>
          <div>
            <input
              id="description"
              type="text"
              placeholder="설명을 입력해주세요."
              required
              onChange={handleInput}
              maxLength="80"
            />
            <label htmlFor="description" data-max="80">
              0/80
            </label>
          </div>
        </form>
      </section>

      <section className="btns">
        <button className="ok" onClick={handleOkButton}>
          확인
        </button>
        <button className="cancel" onClick={() => navigate("/list")}>
          취소
        </button>
      </section>
    </div>
  );
}
