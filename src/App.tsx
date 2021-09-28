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
  const theme = useSelector((state) => state.config.theme);

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

  function getBackgroundColor() {
    if (theme === "pomodoro") {
      return "#db524d";
    } else if (theme === "shortbreak") {
      return "#468e91";
    } else if (theme === "longbreak") {
      return "#437ea8";
    } else {
      return "#db524d";
    }
  }

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <button onClick={() => notify("muster")}>upd</button>
        <Clock />
      </header>
    </div>
  );
}

export default App;
