import { useEffect, useState } from "react";
import "./Hero.css";

function Hero() {
  const [result, setResult] = useState(0);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(50);
  const [prev, setPrev] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [isCycling, setIsCycling] = useState(false);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [excludedNumbers, setExcludedNumbers] = useState([]);

  const handleRandomNumber = (min, max) => {
    let randomNumber;
    if (allowRepeat) {
      do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (excludedNumbers.includes(randomNumber));

      setExcludedNumbers([...excludedNumbers, randomNumber]);
    } else {
      handleNewNumbers();
      do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (randomNumber === prev);
    }

    setPrev(randomNumber);
    setResult(randomNumber);
  };
  const handleFilterNumbers = () => {
    const filteredNumbers = numbers.filter(
      (num) => !excludedNumbers.includes(num)
    );
    setNumbers(filteredNumbers);
  };
  const handleNewNumbers = () => {
    let newNumbers = [];
    for (let i = min; i <= max; i++) {
      newNumbers = [...newNumbers, i];
    }
    if (max > 100 || min < 1) {
      setNumbers([]);
    } else {
      setNumbers(newNumbers);
    }
  };

  useEffect(() => {
    setExcludedNumbers([]);
    handleNewNumbers();
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
    if (excludedNumbers.length === numbers.length - 1 && allowRepeat) {
      handleFilterNumbers();
      setResult(numbers[0]);
      return;
    }
    if (max === min) {
      setResult(min);
      return;
    }
    if (
      max > 100 ||
      min < 1 ||
      max < min ||
      excludedNumbers.length === numbers.length
    ) {
      return;
    }
    if (allowRepeat) {
      handleFilterNumbers();
    } else {
      handleNewNumbers();
    }
    setIsCycling(true);
    setTimeout(() => {
      setIsCycling(false);
    }, 3900);
    setTimeout(() => {
      handleRandomNumber(min, max);
    }, 4400);
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
          placeholder="1"
        />
        <input
          type="number"
          onChange={(e) => setMax(Number(e.target.value))}
          placeholder="50"
        />
        <button onClick={handleButtonClick}>Generate</button>
        <br></br>
        <button onClick={() => setAllowRepeat(!allowRepeat)}>
          Allow Repeat
        </button>
        {allowRepeat ? "Allowed" : "Not Allowed"}
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
