import React, { useState } from "react";
import "./App.css";
import Clock from "./Clock";
import { notify } from "./util";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleClick = async () => {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const data = await file.text();
    try {
      let j = JSON.parse(data);
      setText(j.a);
    } catch (e) {
      window.alert(
        "invalid json data file! Please find the correct data file."
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => notify("muster")}>upd</button>
        <Clock />
      </header>
    </div>
  );
}

export default App;
