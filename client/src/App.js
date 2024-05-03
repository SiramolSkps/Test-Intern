import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UsersListComponent from "./components/UserListComponent";
import CreateUserComponent from "./components/CreateUserComponent";
import EditUserComponent from "./components/EditUserComponent";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={UsersListComponent} />
          <Route exact path="/create" component={CreateUserComponent} />
          <Route exact path="/user/:slug" component={EditUserComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;