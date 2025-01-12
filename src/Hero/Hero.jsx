import { useEffect, useState } from "react";
import "./Hero.css";
import Confetti from "react-confetti";
import drum_sound from "../assets/drum_sound.mp3";
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
  const [preferencies, setPreferencies] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRandomNumber = (min, max) => {
    let randomNumber;
    if (!allowRepeat) {
      do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (
        excludedNumbers.includes(randomNumber) ||
        preferencies.includes(randomNumber)
      );

      setExcludedNumbers([...excludedNumbers, randomNumber]);
    } else {
      handleNewNumbers();
      do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (randomNumber === prev || preferencies.includes(randomNumber));
    }

    setPrev(randomNumber);
    setResult(randomNumber);
    setIsGenerating(false);
    setTimeout(() => {
      setShowConfetti(true);
      setOpacity(1);
    }, 500);
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
      const filteredNumbers = newNumbers.filter(
        (num) => !preferencies.includes(num)
      );
      setNumbers(filteredNumbers);
    }
  };

  const handlePreferincies = (value) => {
    const inputArray = value
      .split(" ")
      .filter((str) => str.trim() !== "")
      .map((str) => Number(str.trim()));

    setPreferencies(inputArray);
  };
  console.log(preferencies);

  const playSound = () => {
    const sound = new Audio(drum_sound);
    sound.volume = 0.1;
    sound.play();
  };

  const resetPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    setExcludedNumbers([]);
    handleNewNumbers();
  }, [min, max, preferencies]);

  useEffect(() => {
    if (isCycling) {
      const intervalId = setInterval(() => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * numbers.length);
        } while (randomIndex === prevIndex);

        setPrevIndex(randomIndex);
        setResult(numbers[randomIndex]);
      }, 350);

      return () => clearInterval(intervalId);
    }
  }, [isCycling, numbers, prevIndex]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setOpacity(0);
        setTimeout(() => {
          setShowConfetti(false);
        }, 7000);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleButtonClick = () => {
    if (max === min) {
      setResult(min);
      return;
    }
    if (excludedNumbers.length === numbers.length - 1 && !allowRepeat) {
      const remainingNumber = numbers.find(
        (num) => !excludedNumbers.includes(num)
      );
      setResult(remainingNumber);
      return;
    }
    if (excludedNumbers.length > numbers.length - 1) {
      return;
    }
    if (preferencies.length > numbers.length - 1) {
      return;
    }
    if (max > 100 || min < 1 || max < min) {
      return;
    }
    if (!allowRepeat) {
      handleFilterNumbers();
    } else {
      handleNewNumbers();
    }
    setIsGenerating(true);
    playSound();
    setIsCycling(true);
    setTimeout(() => {
      setIsCycling(false);
    }, 4100);
    setTimeout(() => {
      handleRandomNumber(min, max);
    }, 4400);
  };

  return (
    <div className="hero">
      {showConfetti && (
        <Confetti
          style={{
            opacity: opacity,
            transition: "opacity 2s ease-out", // Smooth fade-out transition
          }}
        />
      )}
      <div className="maincontainer">
        <div className="result">{result}</div>
        <div className="inputcontainer">
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
        </div>
        <button
          onClick={() => {
            handleButtonClick();
            setShowConfetti(false);
          }}
          disabled={isGenerating}
          className="generate"
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>
        <div className="buttonscontainer">
          <button onClick={resetPage} className="reset">
            Reset
          </button>
          <div className="checkboxcontainer">
            <label>Allow Repeat</label>
            <input
              type="checkbox"
              onChange={(e) => setAllowRepeat(e.target.checked)}
            />
          </div>
        </div>
        <textarea
          type="text"
          onChange={(e) => handlePreferincies(e.target.value)}
          placeholder="Write numbers to exclude (separated by spaces)"
        />
      </div>

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
  );
}

export default Hero;
