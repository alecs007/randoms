import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(0);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10);
  const [prev, setPrev] = useState(0);
  const [numbers, setNumbers] = useState([]);

  const handleRandomNumber = (min, max) => {
    if (max > 100) {
      return;
    }
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (randomNumber === prev) {
      handleRandomNumber(min, max);
      return;
    }
    setPrev(randomNumber);
    setResult(randomNumber);
  };
  useEffect(() => {
    let newNumbers = [];
    for (let i = min; i <= max; i++) {
      newNumbers = [...newNumbers, i];
    }
    if (max > 100) {
      setNumbers([]);
    } else {
      setNumbers(newNumbers);
    }
  }, [min, max]);
  console.log(numbers);
  return (
    <>
      <div className="App">
        <div className={"maincontainer"}>
          <div>{result}</div>
          <input
            type="number"
            onChange={(e) => {
              setMin(Number(e.target.value));
            }}
          />
          <input
            type="number"
            onChange={(e) => setMax(Number(e.target.value))}
          />
          <button onClick={() => handleRandomNumber(min, max)}>Generate</button>
        </div>

        <div className="tablecontainer">
          <div className="numberscontainer">
            {numbers.map((number, index) => (
              <div className="number" key={index}>
                {number}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
