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
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Pomopomo!</p>
        <button onClick={handleClick}>a</button>
        <Clock />
        <p>this is: {text}</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
