import "assets/style/css/app.css";
import { NavLink, Route, Routes } from "react-router-dom";
import { links, routes } from "routes";

export default function App() {
  const nav = (
    <nav>
      {links.map((i, idx) => (
        <li key={idx}>
          <NavLink to={i.to}>{i.text}</NavLink>
        </li>
      ))}
    </nav>
  );

  return (
    <div className="App">
      {nav}
      <Routes>
        {routes.map((i, idx) => (
          <Route {...i} key={idx} />
        ))}
      </Routes>
    </div>
  );
}
