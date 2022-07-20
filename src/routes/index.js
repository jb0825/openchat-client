import Home from "pages/Home";
import Login from "pages/Login";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
];

export const links = [
  { to: "/", text: "Home" },
  { to: "/login", text: "Login" },
];

export const linksObj = {
  home: { to: "/", text: "Home" },
  login: { to: "/login", text: "Login" },
};
