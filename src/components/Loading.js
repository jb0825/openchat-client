import loading from "assets/img/loading.gif";
import "assets/style/css/loading.css";

export default function Loading() {
  return (
    <div id="loading">
      <img src={loading} alt="" />
    </div>
  );
}
