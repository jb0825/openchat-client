import "assets/style/css/login.css";
import defaultUser from "assets/img/default_user.jpg";
import Done from "assets/svg/Done.js";
import { useEffect } from "react";
import { useStorage } from "store/useStorage";
import Modal, { toggle } from "components/Modal";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { set } = useStorage();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const input = document.querySelector("#login input");

    set("name", input.value);
    input.value = "";
    navigate("/list");
  };

  const handleForm = (event) => {
    event.preventDefault();
    toggle();
  };

  useEffect(() => {
    const form = document.querySelector("#login form");
    form.addEventListener("submit", handleForm);

    return () => form.removeEventListener("submit", handleForm);
  }, []);

  return (
    <div id="login" className="page">
      <Modal cancel="true" content="해당 이름을 사용하시겠습니까?" action={handleSubmit} />
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
