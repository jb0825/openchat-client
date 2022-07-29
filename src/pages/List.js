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
import { isEmpty, dateToHoursAndMinutes } from "util";
import { socket, getRooms } from "webRTC/chat";

export default function List() {
  const navigate = useNavigate();

  const [list, setList] = useState([
    <li key="" className="nolist">
      생성된 채팅방이 없습니다.
    </li>,
  ]);

  const handleAddChat = () => navigate("/create_chatroom");

  const handleClick = (roomname, description, createDate) => {
    navigate("/chatroom_info", { state: { roomname, description, createDate } });
  };

  useEffect(() => {
    console.log("emit rooms");
    getRooms();

    socket.on("rooms", (rooms) => {
      if (isEmpty(rooms)) return;

      console.log("receive rooms event");
      console.log(rooms);

      const appendList = [];

      for (let room of Object.keys(rooms)) {
        let description = rooms[room].description;
        let createDate = rooms[room].createDate;

        if (description.length === 0) description = "채팅방 설명이 없습니다.";

        appendList.push(
          <li key={room} onClick={() => handleClick(room, description, createDate)}>
            <img src={defaultUser} alt="" />
            <div className="info">
              <div>{room}</div>
              <p>{description}</p>
            </div>
            <div className="time">{dateToHoursAndMinutes(new Date(createDate))}</div>
          </li>
        );
      }

      setList(appendList);
    });
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
