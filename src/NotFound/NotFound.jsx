import "./NotFound.css";
import { Link } from "react-router-dom";
import error from "../assets/error.jpg";

const NotFound = () => {
  return (
    <div className="notfound">
      <h1>404</h1>
      <img src={error} alt="error" />
      <Link to="/">
        <button>Go to randoms.fun</button>
      </Link>
    </div>
  );
};

export default NotFound;
