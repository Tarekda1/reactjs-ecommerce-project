import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { auth } from "./firebase/utils";

import "./default.scss";
import HomePageLayout from "./layouts/HomePageLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { MainLayout } from "./layouts/MainLayout";

const initialState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="App">
        {/* <Header></Header>
      <div className="main"> */}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePageLayout>
                <Homepage />
              </HomePageLayout>
            )}
          />
          <Route
            path="/registration"
            render={() => (
              <MainLayout>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )}
          />
        </Switch>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
