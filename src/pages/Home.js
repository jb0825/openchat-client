import "assets/style/css/home.css";
import logo from "assets/img/logo.png";
import github from "assets/img/github.png";
import { NavLink } from "react-router-dom";
import { linksObj } from "routes";

export default function Home() {
  return (
    <div id="home" className="page">
      <img className="logo" src={logo} alt="" />
      <div className="btn">
        <NavLink to={linksObj["login"].to}>오픈채팅 시작</NavLink>
      </div>
      <div className="gitIcon">
        <img src={github} alt="" />
        <a href="https://github.com/jb0825" target="_blank" rel="noreferrer">
          https://github.com/jb0825
        </a>
      </div>
    </div>
  );
}
