import "assets/style/css/login.css";
import defaultUser from "assets/img/default_user.jpg";
import Done from "assets/svg/Done.js";
import { useEffect } from "react";
import { useStorage } from "useStorage";

export default function Login() {
  const { setStorage } = useStorage();

  const handleForm = (event) => {
    event.preventDefault();
    const input = document.querySelector("#login input");

    setStorage("name", input.value);
    input.value = "";
  };

  useEffect(() => {
    const form = document.querySelector("#login form");
    form.addEventListener("submit", handleForm);

    return () => form.removeEventListener("submit", handleForm);
  }, []);

  return (
    <div id="login" className="page">
      <section className="img">
        <img src={defaultUser} alt=""></img>
      </section>
      <section className="form">
        <form>
          <input type="text" placeholder="이름을 입력하세요" required />
          <button type="submit">
            <Done />
          </button>
        </form>
      </section>
    </div>
  );
}
