import "./Header.css";
import dice from "../assets/dice.png";

const Header = ({ isGenerating }) => {
  return (
    <header>
      <h1>rand</h1>
      <img src={dice} alt="dice" className={isGenerating ? "spin" : ""} />
      <h1>ms.fun</h1>
    </header>
  );
};

export default Header;
