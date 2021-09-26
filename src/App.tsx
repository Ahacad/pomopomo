import React, { useState } from "react";
import "./App.css";
import Clock from "./Clock";
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

  function notify(title: string, options: NotificationOptions) {
    if (!("Notification" in window)) {
      console.warn("Notification not supported in this browser");
    } else if (Notification.permission === "granted") {
      let notification = new Notification(title, options);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          let notification = new Notification(title, options);
        }
      });
    }
  }

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
