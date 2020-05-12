import React from "react";
import { Switch, Route } from "react-router-dom";
import "./default.scss";
import HomePageLayout from "./layouts/HomePageLayout";
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import { MainLayout } from "./layouts/MainLayout";

function App() {
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
      </Switch>
      {/* </div> */}
    </div>
  );
}

export default App;
