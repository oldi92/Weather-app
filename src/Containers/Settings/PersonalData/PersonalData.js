import React, { Component } from "react";
import * as actions from "../../../store/actions/indexActions";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import classes from "./PersonalData.module.css";

class PersonalData extends Component {
  state = {
    name: "",
    lastName: "",
    country: "",
  };
  componentDidMount() {
    this.props.onSetLocalIdIdtoken(
      localStorage.getItem("token"),
      localStorage.getItem("localId")
    );
    if (localStorage.getItem("localId")) {
      this.props.onPersonalInfoFetch(this.props.localId);
      this.props.onPersonalDataLoaded();
    }
  }

  personalDataToggle = () => {
    this.props.onPersonalDataToggle();
  };

  personalDataEditToggle = (event) => {
    event.preventDefault();
    if (!this.props.personalDataToggle) {
      this.props.onPersonalDataToggle();
    }
    if (this.props.localId) {
      this.props.onPersonalDataEditFetch(this.state, this.props.localId);
    }
  };
  inputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    let personalInfoDiv = "";

    if (this.props.personalDataLoaded) {
      if (this.props.personalData) {
        personalInfoDiv = (
          <ul>
            <li>
              <h3>First Name:</h3>
              <h2>
                {this.props.personalData.name
                  ? this.props.personalData.name
                  : "Please edit name"}
              </h2>
            </li>
            <li>
              <h3>Last Name:</h3>
              <h2>
                {this.props.personalData.lastName
                  ? this.props.personalData.lastName
                  : "Please edit name"}
              </h2>
            </li>
            <li>
              <h3>Country:</h3>
              <h2>
                {this.props.personalData.country
                  ? this.props.personalData.country
                  : "Please edit country"}
              </h2>
            </li>
          </ul>
        );
      } else {
        this.props.onPersonalInfoFetch(this.props.localId);
        personalInfoDiv = (
          <ul>
            <li>
              <h3>First Name</h3>
              <h2>No Name</h2>
            </li>
            <li>
              <h3>Last Name</h3>
              <h2>No Last Name</h2>
            </li>
            <li>
              <h3>Country</h3>
              <h2>No Country</h2>
            </li>
          </ul>
        );
      }
    } else {
      this.props.onPersonalDataLoaded();
    }

    return (
      <div>
        <Transition in={this.props.personalDataToggle} timeout={200}>
          {(state) => (
            <div>
              <div
                className={classes.PersonalInfo}
                style={{
                  position: "absolute",
                  transition: "all 0.2s ease-out",
                  opacity: state === "entered" ? 1 : 0,
                }}
              >
                <button onClick={this.personalDataToggle}>
                  <FontAwesomeIcon icon={faPencilAlt} /> Edit Profile
                </button>
                {personalInfoDiv}
              </div>
              <div
                className={classes.PersonalData}
                style={{
                  position: "absolute",
                  transition: "all 0.2s ease-in",
                  opacity: state === "exited" ? 1 : 0,
                  pointerEvents: state === "exited" ? "auto" : "none",
                }}
              >
                <form onSubmit={this.personalDataEditToggle}>
                  <button type="submit">
                    <FontAwesomeIcon icon={faCheck} /> Save Changes
                  </button>
                  <label>
                    First Name <br />
                    <input
                      type="text"
                      name="name"
                      onChange={this.inputHandler}
                    />
                  </label>
                  <label>
                    Last Name <br />
                    <input
                      type="text"
                      name="lastName"
                      onChange={this.inputHandler}
                    />
                  </label>
                  <label>
                    Country <br />
                    <input
                      type="text"
                      name="country"
                      onChange={this.inputHandler}
                    />
                  </label>
                </form>
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    personalDataToggle: state.personalDataToggle,
    localId: state.localId,
    personalData: state.personalData,
    personalDataLoaded: state.personalDataLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPersonalDataToggle: () => dispatch(actions.personalDataToggle()),
    onPersonalDataEditFetch: (personalData, localId) =>
      dispatch(actions.personalDataEditFetch(personalData, localId)),
    onPersonalInfoFetch: (localId) =>
      dispatch(actions.personalInfoFetch(localId)),
    onPersonalDataLoaded: () => dispatch(actions.personalDataLoaded()),
    onSetLocalIdIdtoken: (idToken, localId) =>
      dispatch(actions.setLocalIdIdtoken(idToken, localId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);
