import "assets/style/css/modal.css";
import Close from "assets/svg/Close";

export const toggle = () => document.getElementById("modal_container").classList.toggle("hidden");

export default function Modal(props) {
  const { cancel, content, action } = props;

  const handleClose = () => {
    const modal = document.getElementById("modal_container");
    modal.classList.add("hidden");
  };

  return (
    <div id="modal_container" className="hidden">
      <div id="modal">
        <div>
          <Close handleClose={handleClose} />
        </div>
        <section>{content}</section>
        <footer className={!cancel ? "" : "cancel_visible"}>
          <button onClick={action}>확인</button>
          <button className="cancel" onClick={handleClose}>
            취소
          </button>
        </footer>
      </div>
    </div>
  );
}
