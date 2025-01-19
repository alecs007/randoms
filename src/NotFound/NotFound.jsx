import "./NotFound.css";
import { Link } from "react-router-dom";
import error from "../assets/error.jpg";

const NotFound = () => {
  return (
    <div className="notfound">
      <img src={error} alt="error" />
      <Link to="/">
        <button>
          Go to <span>randoms.fun</span>
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
