import React, { useState } from "react";
import "./App.css";
import Clock from "./Clock";
import Tasks from "./Tasks";
// @ts-ignore
import BarChart from "./BarChart";
import { RootState } from "./types";
import { useSelector } from "react-redux";
import { writeJson } from "./util/files";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Button, { ButtonProps } from "@mui/material/Button";
import { IconButton, ListItem, List, ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import HomeIcon from "@mui/icons-material/Home";

const ColorIconButton = styled(IconButton)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function App() {
  const theme = useSelector((state: RootState) => state.config.theme);
  const wholeState = useSelector((state) => state);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

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
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const drawerWidth: number = 240;

  return (
    <div className="App">
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="main" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="project" />
          </ListItem>
        </List>
      </SwipeableDrawer>

      <div
        className="App-header"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <div className="flex justify-between w-full">
          <div />
          <div>
            <ColorIconButton
              color="success"
              aria-label="upload picture"
              onClick={toggleDrawer(true)}
            >
              <MoreVertIcon />
            </ColorIconButton>
            &nbsp;
            <button
              className="bg-white text-sm text-black mr-2 rounded p-1"
              onClick={handleDownloadData}
            >
              Download Data
            </button>
          </div>
        </div>
        <Clock />

        <Tasks />
      </div>
      <div className="flex justify-center w-full">
        <BarChart />
      </div>
    </div>
  );
}

export default App;
