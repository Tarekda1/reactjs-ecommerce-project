import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";

//layouts
import HomePageLayout from "./layouts/HomePageLayout";
import { MainLayout } from "./layouts/MainLayout";

//pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Recovery from "./pages/Recovery";

import "./default.scss";

// const initialState = {
//   currentUser: null,
// };

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ...initialState,
  //   };
  // }

  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    //subscribe
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data(),
          //   },
          // });
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
        });
      }
      // this.setState({
      //   ...initialState,
      // });
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    //unsubscribe
    this.authListener();
  }

  render() {
    //const { currentUser } = this.state;
    const { currentUser } = this.props;

    return (
      <div className="App">
        {/* <Header></Header>
      <div className="main"> */}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePageLayout currentUser={currentUser}>
                <Homepage />
              </HomePageLayout>
            )}
          />
          <Route
            path="/registration"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
          <Route
            path="/recovery"
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}
          />
        </Switch>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
