import React, { Component } from "react";
import Button from "../../components/Form/Button";
import { signInWithGoogle } from "./../../firebase/utils";
import "./styles.scss";

class SignIn extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="signin">
        <div className="wrap">
          <h2>login</h2>
          <div className="formWrap">
            <form>
              <div className="socialSignIn">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign in with google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {};

export default SignIn;
