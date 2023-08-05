import React, { useState, useEffect } from "react";
import * as math from "mathjs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiMiniCodeBracket } from "react-icons/hi2";
import { MdModeNight } from "react-icons/md";
import { BiSolidSun } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);
  const [historyModel, setHistoryModel] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  }

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleButtonClick = (value) => {
    setSelectedHistory(null); // Reset selectedHistory when new input is entered.
    setInput(input + value);
  };

  const handleClear = () => {
    setSelectedHistory(null); // Reset selectedHistory when clearing input.
    setInput("");
  };

  const handleCalculate = () => {
    try {
      const result = math.evaluate(input);
      setHistory([...history, { input, result }]);
      setInput(result.toString());
      setSelectedHistory(null); // Reset selectedHistory after calculation.
    } catch (error) {
      setInput("Error");
    }
  };

  const handleBackspace = () => {
    setSelectedHistory(null); // Reset selectedHistory when backspacing.
    setInput(input.slice(0, -1));
  };

  const handleHistoryItemClick = (item) => {
    setInput(item.input);
    setSelectedHistory(item);
  };

  return (
    <div className="container">
      <div className={`calculator ${theme}`}>
        <div className="heading">
          <p>Calculator</p>
          <div className=" thm-btn">
            <button className="theme-toggle" 
            onClick={handleThemeToggle}>
              {theme === "light" ? (
                <MdModeNight className="night-btn" />
              ) : (
                <BiSolidSun className="light-btn" />
              )}
            </button>
          </div>
        </div>
        <div className="display">{input}</div>
        <div className="buttons">
          <button onClick={handleClear} className="clear">
            AC
          </button>
          <button onClick={handleBackspace} className="backspace">
            ←
          </button>
          <button onClick={() => handleButtonClick("%")}>%</button>
          <button
            className="operator-btn"
            onClick={() => handleButtonClick("+")}
          >
            +
          </button>
          <button onClick={() => handleButtonClick("1")}>1</button>
          <button onClick={() => handleButtonClick("2")}>2</button>
          <button onClick={() => handleButtonClick("3")}>3</button>
          <button
            className="operator-btn"
            onClick={() => handleButtonClick("-")}
          >
            -
          </button>
          <button onClick={() => handleButtonClick("4")}>4</button>
          <button onClick={() => handleButtonClick("5")}>5</button>
          <button onClick={() => handleButtonClick("6")}>6</button>
          <button
            className="operator-btn"
            onClick={() => handleButtonClick("*")}
          >
            x
          </button>
          <button onClick={() => handleButtonClick("7")}>7</button>
          <button onClick={() => handleButtonClick("8")}>8</button>
          <button onClick={() => handleButtonClick("9")}>9</button>
          <button
            className="operator-btn"
            onClick={() => handleButtonClick("/")}
          >
            /
          </button>
          <button onClick={() => setHistoryModel(true)}>
            <HiMiniCodeBracket />
          </button>
          <button onClick={() => handleButtonClick("0")}>0</button>
          <button onClick={() => handleButtonClick(".")}>.</button>

          <button className="operator-btn equal" onClick={handleCalculate}>
            =
          </button>
        </div>
        {/* --------- HISTORY------------ */}
        <div className={` ${historyModel ? "history" : "hide"}`}>
          <h2>History</h2>
          {history.map((item, index) => (
            <p
              key={index}
              className={
                selectedHistory === item
                  ? "selected history-item"
                  : "history-item"
              }
              onClick={() => {
                handleHistoryItemClick(item), setHistoryModel(false);
              }}
            >
              {item.input} = {item.result}
            </p>
          ))}
          <div className="close">
            <RxCross2 onClick={() => setHistoryModel(false)} />
          </div>
        </div>

        {/* --------- HISTORY------------ */}
      </div>
    </div>
  );
}

export default App;
