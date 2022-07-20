import "assets/style/css/app.css";
import { NavLink, Route, Routes } from "react-router-dom";
import { links, routes } from "routes";

function App() {
  return (
    <div className="App">
      <div id="main">
        <Routes>
          {routes.map((i, idx) => (
            <Route {...i} key={idx} />
          ))}
        </Routes>
        <nav>
          {links.map((i, idx) => (
            <li key={idx}>
              <NavLink to={i.to}>{i.text}</NavLink>
            </li>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default App;
