import { useEffect, useState, useRef } from "react";
import "./Hero.css";
import Confetti from "react-confetti";
import spinning from "../assets/spinning.mp3";
import tada from "../assets/tada.mp3";
import sound_on from "../assets/sound_on.png";
import sound_off from "../assets/sound_off.png";
import dice from "../assets/dice.png";
function Hero() {
  const [result, setResult] = useState(0);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(70);
  const [prev, setPrev] = useState([]);
  const [prevIndex, setPrevIndex] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCycling, setIsCycling] = useState(false);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [excludedNumbers, setExcludedNumbers] = useState([]);
  const [preferencies, setPreferencies] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [isSound, setIsSound] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
      } while (
        randomNumber === prev[prev.lenght - 1] ||
        preferencies.includes(randomNumber)
      );
    }

    setPrev([...prev, randomNumber]);
    setIsAnimating(true);
    setResult(randomNumber);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    setIsGenerating(false);

    if (isSound) {
      playTada();
    }

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
    if (max > 999 || min < 1) {
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

  const playSound = () => {
    const sound = new Audio(spinning);
    sound.volume = 0.5;
    sound.currentTime = 1.9;
    sound.playbackRate = 0.73;
    sound.preservesPitch = true;
    sound.play();
    setTimeout(() => {
      sound.pause();
    }, 1850);
  };

  const playTada = () => {
    const sound = new Audio(tada);
    sound.volume = 0.1;
    sound.play();
  };

  const resetPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (max === min) {
      setNumbers([min]);
      return;
    }
    if (min > 0 && max < 1000 && min < max) {
      setExcludedNumbers([]);
      handleNewNumbers();
    }
  }, [min, max, preferencies]);

  useEffect(() => {
    if (isCycling) {
      const intervalId = setInterval(() => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * numbers.length);
        } while (randomIndex === prevIndex);
        setPrevIndex(randomIndex);
        setIsAnimating(true);
        setResult(numbers[randomIndex]);
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
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
    setIsButtonHovered(false);
    if (max === min) {
      setResult(min);
      setNumbers([min]);
      return;
    }
    if (numbers.length === 1) {
      setResult(numbers[0]);
      return;
    }
    if (excludedNumbers.length > max - min) {
      return;
    }
    if (preferencies.length > max - min) {
      return;
    }
    if (
      preferencies.length + excludedNumbers.length >= max - min &&
      !allowRepeat
    ) {
      const remainingNumber = numbers.find((num) => num !== result);
      setResult(remainingNumber);
      setNumbers([remainingNumber]);
      return;
    }
    if (max > 999 || min < 1 || max < min) {
      return;
    }
    if (!allowRepeat) {
      handleFilterNumbers();
    } else {
      handleNewNumbers();
    }

    setIsGenerating(true);

    if (isSound) {
      playSound();
    }

    setIsCycling(true);

    setTimeout(() => {
      setIsCycling(false);
    }, 1750);
    setTimeout(() => {
      handleRandomNumber(min, max);
    }, 1850);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isGenerating) {
      handleButtonClick();
    }
  };

  const lastPickRef = useRef(null);

  useEffect(() => {
    if (lastPickRef.current) {
      lastPickRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [prev]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hero">
      <header>
        <h1>rand</h1>
        <img src={dice} alt="Dice" className={isGenerating ? "spin" : ""} />
        <h1>ms.fun</h1>
      </header>
      <div className="content">
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            style={{
              opacity: opacity,
              transition: "opacity 2s ease-out",
            }}
          />
        )}
        <div className="maincontainer">
          <div className={`result ${isAnimating ? "fade-up" : ""}`}>
            {result}
          </div>
          <div className="inputcontainer">
            <input
              type="number"
              onChange={(e) => {
                setMin(Number(e.target.value));
              }}
              onKeyDown={handleKeyPress}
              placeholder="1"
            />
            <input
              type="number"
              onChange={(e) => setMax(Number(e.target.value))}
              onKeyDown={handleKeyPress}
              placeholder="70"
            />
          </div>
          <button
            onClick={() => {
              handleButtonClick();
              setShowConfetti(false);
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            disabled={isGenerating}
            className={`generate ${isButtonHovered ? "hover" : ""}`}
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
            <div className="sound" onClick={() => setIsSound(!isSound)}>
              {isSound ? (
                <img src={sound_on} alt="Sound On" />
              ) : (
                <img src={sound_off} alt="Sound Off" />
              )}
            </div>
          </div>
          <textarea
            type="text"
            onChange={(e) => handlePreferincies(e.target.value)}
            placeholder="Write numbers to exclude (separated by spaces)"
          />
          <div className="lastpickscontainer">
            <h1>Last picks:</h1>
            {prev.length === 0 && <div className="lastpick">Pick!</div>}
            {prev.map((number, index) => (
              <div
                className="lastpick"
                key={index}
                ref={index === prev.length - 1 ? lastPickRef : null}
              >
                {number}
              </div>
            ))}
          </div>
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
      <div className="footercontainer">
        <footer>All rights reserved &copy; randoms.fun 2025</footer>
      </div>
    </div>
  );
}

export default Hero;
