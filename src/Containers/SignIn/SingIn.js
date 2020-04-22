import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import classes from "./SignIn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passError: "",
  };
  componentDidUpdate() {
    if (this.props.loginSuccess) {
      this.props.history.push("/");
    }
  }

  changedHanlder = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    const isValid = this.validation();

    if (isValid) {
      this.props.onSignInAuth(this.state.email, this.state.password);
      this.setState({
        email: "",
        password: "",
        emailError: "",
        passError: "",
      });
    }
  };

  validation = () => {
    let errorPass = "";
    let errorEmail = "";

    if (!this.state.email.includes("@")) {
      errorEmail = "Please type @ with your email";
    }

    if (this.state.email.length < 2) {
      errorEmail = "Email to short";
    }
    if (this.state.email.length > 25) {
      errorEmail = "Email to long";
    }

    if (this.state.password.length < 6) {
      errorPass = "Password to short";
    }
    if (this.state.password.length > 20) {
      errorPass = "Password to long";
    }

    if (errorPass || errorEmail) {
      this.setState({ passError: errorPass, emailError: errorEmail });
      return false;
    }

    if (errorPass || errorEmail) {
      this.setState({
        emailError: "",
        passError: "",
      });
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className={classes.Settings}>
        <div className={classes.BackButton}>
          <NavLink to="/">
            <FontAwesomeIcon icon={faBackspace} size="3x" />
          </NavLink>
        </div>
        <div className={classes.Form}>
          <div className={classes.LockIcon}>
            <div className={classes.LockIconDiv}>
              <FontAwesomeIcon
                icon={faUnlockAlt}
                size="1x"
                style={{ color: "white" }}
              />
            </div>
          </div>
          <h2>Sign in</h2>
          <form onSubmit={this.submitHandler}>
            <div className={classes.Error}>{this.state.emailError}</div>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              value={this.state.name}
              onChange={this.changedHanlder}
            />
            <div className={classes.Error}>{this.state.passError}</div>
            <input
              type="password"
              name="password"
              placeholder="password*"
              value={this.state.password}
              onChange={this.changedHanlder}
            />
            <button type="submit">Sign in</button>
            <NavLink to="/signup" className={classes.SignUp}>
              Don't have an account? Sign Up
            </NavLink>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginSuccess: state.loginSuccess,
    idToken: state.idToken,
    localId: state.localId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInAuth: (email, password) =>
      dispatch(actions.signInAuth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
