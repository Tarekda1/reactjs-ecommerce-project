import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Connect } from "react-redux";
import Button from "../../components/Form/Button";
import { signInWithGoogle, auth } from "./../../firebase/utils";
import "./styles.scss";
import FormInput from "../../components/Form/FormInput";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="signin">
        <div className="wrap">
          <h2>login</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />
              <FormInput
                type="text"
                name="password"
                value={password}
                placeholder="password"
                onChange={this.handleChange}
              />

              <Button type="submit">logIn</Button>
              <div className="socialSignIn">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign in with google
                  </Button>
                </div>
              </div>
              <div className="links">
                <Link to="/recovery">Reset Password</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {};

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// });

export default SignIn;
