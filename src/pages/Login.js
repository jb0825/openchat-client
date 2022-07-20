import "assets/style/css/login.css";
import defaultUser from "assets/img/default_user.jpg";
import Done from "assets/svg/Done.js";

export default function Login() {
  return (
    <div id="login" className="page">
      <section className="img">
        <img src={defaultUser} alt=""></img>
      </section>
      <section className="form">
        <form>
          <input type="text" placeholder="이름을 입력하세요" required />
          <button>
            <Done />
          </button>
        </form>
      </section>
    </div>
  );
}
