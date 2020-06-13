import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Layout/Login";
import Register from "./components/Layout/Register";
import MainPage from "./components/Layout/MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </div>
  );
}

export default App;
