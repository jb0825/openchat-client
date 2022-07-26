import "assets/style/css/list.css";
import AddChat from "assets/svg/AddChat";
import More from "assets/svg/More";
import Notification from "assets/svg/Notification";
import Person from "assets/svg/Person";
import Search from "assets/svg/Search";
import Setting from "assets/svg/Setting";
import Chat from "assets/svg/Chat";
import defaultUser from "assets/img/default_user.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { chat } from "webRTC/chat";
import { isEmpty } from "util";

export default function List() {
  const navigate = useNavigate();
  const [list, setList] = useState([
    <li key="" className="nolist">
      생성된 채팅방이 없습니다.
    </li>,
  ]);

  const { socket, getRooms } = chat();
  const handleAddChat = () => navigate("/create_chatroom");

  socket.on("rooms", (rooms) => {
    if (isEmpty(rooms)) return;

    console.log("receive rooms event");
    console.log(rooms);

    const appendList = [];

    for (let room of Object.keys(rooms))
      appendList.push(
        <li key={room}>
          <img src={defaultUser} alt="" />
          <div className="info">
            <div>{room}</div>
            <p>{rooms[room]}</p>
          </div>
          <div className="time">오후 12:00</div>
        </li>
      );

    setList(appendList);
  });

  useEffect(() => {
    console.log("emit rooms");
    getRooms();
  }, []);

  return (
    <div id="list" className="page">
      <nav>
        <ul className="nav">
          <li>
            <Person />
          </li>
          <li>
            <Chat />
          </li>
          <li>
            <More />
          </li>
        </ul>

        <ul className="bottom">
          <li>
            <Notification />
          </li>
          <li>
            <Setting />
          </li>
        </ul>
      </nav>

      <section>
        <header>
          <h2>채팅</h2>
          <ul className="icons">
            <li>
              <Search />
            </li>
            <li>
              <AddChat handleAddChat={handleAddChat} />
            </li>
          </ul>
        </header>

        <article>
          <ul id="chatroom-list">{list}</ul>
        </article>
      </section>
    </div>
  );
}
