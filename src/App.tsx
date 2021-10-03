import React, { useState } from "react";
import "./App.css";
import Clock from "./Clock";
import Tasks from "./Tasks";
import BarChart from "./BarChart";
import { RootState } from "./types";
import { useSelector } from "react-redux";
import { writeJson } from "./util/files";

function App() {
  const theme = useSelector((state: RootState) => state.config.theme);
  const wholeState = useSelector((state) => state);

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
  const handleDownloadData = async () => {
    await writeJson(JSON.stringify(wholeState));
  };

  return (
    <div className="App">
      <div
        className="App-header"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <div className="flex justify-between w-full">
          <div />
          <button
            className="bg-white text-sm text-black mr-2 rounded p-1"
            onClick={handleDownloadData}
          >
            Download Data
          </button>
        </div>
        <Clock />
        <Tasks />
      </div>
      <BarChart />
    </div>
  );
}

export default App;
