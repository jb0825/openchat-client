import Home from "pages/Home";
import List from "pages/List";
import Login from "pages/Login";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/list", element: <List /> },
];

export const links = [
  { to: "/", text: "Home" },
  { to: "/login", text: "Login" },
  { to: "/list", text: "List" },
];

export const linksObj = {
  home: { to: "/", text: "Home" },
  login: { to: "/login", text: "Login" },
  list: { to: "/list", text: "List" },
};
