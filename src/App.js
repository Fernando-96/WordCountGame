import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const STARTING_TIME = 30;
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textBoxRef = useRef(null);
  //handling change for the text area input field
  function handleChange(e) {
    const { value } = e.target;
    setText(value);
  }
  function calWordCount(words) {
    const wordsArray = words.trim().split(" ");
    return wordsArray.filter((word) => word !== "").length;
  }
  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("");
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }
  function endGame() {
    setIsTimeRunning(false);
    setWordCount(calWordCount(text));
  }
  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div className="App">
      <h1>How fast Do You Type?</h1>
      <textarea
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
        ref={textBoxRef}
      />
      <h4>Time remaining {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word Count {wordCount} </h1>
    </div>
  );
}

export default App;
