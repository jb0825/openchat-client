import Chatroom from "pages/Chatroom";
import ChatroomInfo from "pages/ChatroomInfo";
import CreateChatroom from "pages/CreateChatroom";
import Home from "pages/Home";
import List from "pages/List";
import Login from "pages/Login";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/list", element: <List /> },
  { path: "/chatroom", element: <Chatroom /> },
  { path: "/create_chatroom", element: <CreateChatroom /> },
  { path: "/chatroom_info", element: <ChatroomInfo /> },
];

export const links = [
  { to: "/", text: "Home" },
  { to: "/login", text: "Login" },
  { to: "/list", text: "List" },
  { to: "/chatroom", text: "Chatroom" },
  { to: "/create_chatroom", text: "Create Chatroom" },
  { to: "/chatroom_info", text: "Chatroom Info" },
];

export const linksObj = {
  home: { to: "/", text: "Home" },
  login: { to: "/login", text: "Login" },
  list: { to: "/list", text: "List" },
  chatroom: { to: "/chatroom", text: "Chatroom" },
  create_chatroom: { to: "/create_chatroom", text: "Create Chatroom" },
  chatroom_info: { to: "/chatroom_info", text: "Chatroom Info" },
};
