import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Clock from "./Clock";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = async () => {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    let j = JSON.parse(contents);
    setText(j.somethin);
  };



  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>a</button>
        <Clock />
        <p>this is: {text}</p>
      </header>
    </div>
  );
}

export default App;
