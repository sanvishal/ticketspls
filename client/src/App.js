import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Layout/Login";
import Register from "./components/Layout/Register";
import MainPage from "./components/Layout/MainPage";
import Movies from "./components/Layout/Movies";
import Seats from "./components/Layout/Seats";
import PrivateRoute from "./components/PrivateRoute";

import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store";

import { setCurrentUser, logoutUser } from "./actions/authActions";

// logout if JWT expired else login automatically through local JWT
if (localStorage.JWT) {
  const token = localStorage.JWT;
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/seats" component={Seats} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
