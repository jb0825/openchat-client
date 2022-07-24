import "assets/style/css/createChatroom.css";
import Modal, { toggle } from "components/Modal";

export default function CreateChatroom() {
  const handleInput = (event) => {
    const length = event.target.value.length;
    const label = event.target.nextElementSibling;

    label.innerText = `${length}/${label.dataset.max}`;
  };

  const handleCreate = () => {
    console.log("create!");
  };

  return (
    <div id="create_chatroom" className="page">
      <Modal content="채팅방 만들거임?>" action={handleCreate} />

      <section>
        <h2>오픈채팅방 만들기</h2>
        <h3>그룹 채팅방</h3>
        <form>
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

      <section>
        <h2>참여 설정</h2>
        <h3>채팅방 입장 조건</h3>
      </section>

      <section className="btns">
        <button className="ok" onClick={toggle}>
          확인
        </button>
        <button className="cancel">취소</button>
      </section>
    </div>
  );
}