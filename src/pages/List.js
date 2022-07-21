import "assets/style/css/list.css";
import AddChat from "assets/svg/AddChat";
import Chat from "assets/svg/Chat";
import More from "assets/svg/More";
import Notification from "assets/svg/Notification";
import Person from "assets/svg/Person";
import Search from "assets/svg/Search";
import Setting from "assets/svg/Setting";
import defaultUser from "assets/img/default_user.jpg";

export default function List() {
  const temp = () => {
    const list = [];
    for (let i = 0; i < 10; i++) {
      list.push(
        <li>
          <img src={defaultUser} alt="" />
          <div className="info">
            <div>방이름</div>
            <p>설명</p>
          </div>
          <div className="time">오후 12:00</div>
        </li>
      );
    }

    return list;
  };

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
              <AddChat />
            </li>
          </ul>
        </header>

        <article>
          <ul>{temp()}</ul>
        </article>
      </section>
    </div>
  );
}
