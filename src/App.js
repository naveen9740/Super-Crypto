import { makeStyles } from "@material-ui/core";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Alert } from "./Components/Alert";
import { Header } from "./Components/Header";
import { Home, Coins } from "./Pages";

let App = () => {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));
  // Note: comment the below 2 lines during time of development
  console.error = () => {};
  console.warn = () => {};

  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<Coins />} />
      </Routes>
      <Alert />
    </div>
  );
};

export default App;
