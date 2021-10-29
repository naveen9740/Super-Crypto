import { Route } from "react-router";
import { Link } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header";
import { Home, Coins } from "./Pages";

let App = () => {
  return (
    <div className="App">
      <Header />
      <Route path="/" component={Home} exact />
      <Route path="/coins/:id" component={Coins} />
    </div>
  );
};

export default App;
