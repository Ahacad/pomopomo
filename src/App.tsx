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
    const data = await file.text();
    try {
      let j = JSON.parse(data);
      setText(j.a);
    } catch (e) {
      window.alert("invalid json data file! Please find the correct data file.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="bg-white text-black" onClick={handleClick}>
          open data file
        </button>
        <Clock />
        <p>this is: {text}</p>
      </header>
    </div>
  );
}

export default App;
