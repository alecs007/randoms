import { useEffect, useState } from "react";
import "./Hero.css";

function Hero() {
  const [result, setResult] = useState(0);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(5);
  const [prev, setPrev] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [isCycling, setIsCycling] = useState(false);

  const handleRandomNumber = (min, max) => {
    if (max > 100 || min < 1) {
      return;
    }
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomNumber === prev);

    setPrev(randomNumber);
    setResult(randomNumber);
  };

  useEffect(() => {
    let newNumbers = [];
    for (let i = min; i <= max; i++) {
      newNumbers = [...newNumbers, i];
    }
    if (max > 100 || min < 1) {
      setNumbers([]);
    } else {
      setNumbers(newNumbers);
    }
  }, [min, max]);

  useEffect(() => {
    if (isCycling) {
      const intervalId = setInterval(() => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * numbers.length);
        } while (randomIndex === prevIndex);

        setPrevIndex(randomIndex);
        setResult(numbers[randomIndex]);
      }, 300);

      return () => clearInterval(intervalId);
    }
  }, [isCycling, numbers, prevIndex]);

  const handleButtonClick = () => {
    setIsCycling(true);
    setTimeout(() => {
      setIsCycling(false);
    }, 3900);
    setTimeout(() => {
      handleRandomNumber(min, max);
    }, 4400);
    setTimeout(() => {
      handleRandomNumber(min, max);
    }, 5200);
  };

  return (
    <div className="hero">
      <div className="maincontainer">
        <div>{result}</div>
        <input
          type="number"
          onChange={(e) => {
            setMin(Number(e.target.value));
          }}
        />
        <input type="number" onChange={(e) => setMax(Number(e.target.value))} />
        <button onClick={handleButtonClick}>Generate</button>
      </div>

      <div className="tablecontainer">
        <div className="numberscontainer">
          {numbers.map((number, index) => (
            <div
              className={`number ${number === result ? "selected" : ""} ${
                isCycling ? "cycling" : ""
              }`}
              key={index}
            >
              {number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
