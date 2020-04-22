import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import WeatherNow from "../../Components/WeatherNow/WeatherNow";
import Forecast12 from "../../Components/Forecast12/Forecast12";
import Forecast5 from "../../Components/Forecast5/Forecast5";
import classes from "./Main.module.css";
import * as actions from "../../store/actions/indexActions";
import { NavLink } from "react-router-dom";

class Main extends Component {
  componentDidMount() {
    this.getGeolocation(); /**FOR TEST ONLY GET IMIDIATELLY THE LOCATION */
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     this.getGeolocation,
    //     this.geoLocationErrorHandler,
    //     { enableHighAccuracy: true, maximumAge: 10000 }
    //   );
    // }
    // this.props.onSetLocalIdIdtoken(
    //   localStorage.getItem("token"),
    //   localStorage.getItem("localId")
    // );
  }
  geoLocationErrorHandler = (errorObj) => {
    alert(errorObj.code + ": " + errorObj.message);
  };

  getGeolocation = (position) => {
    this.props.onGeolocation(-0.08994, 51.355129);
    this.props.onCurrentWeather(-0.08994, 51.355129);
    // this.props.onGeolocation(position.coords.longitude, position.coords.latitude)
    // this.props.onCurrentWeather(position.coords.longitude, position.coords.latitude)
  };

  render() {
    let weatherDiv = null;
    if (this.props.weatherIcon) {
      weatherDiv = <WeatherNow />;
    } else {
      this.getGeolocation = () => {
        this.props.onGeolocation(-0.08994, 51.355129);
        this.props.onCurrentWeather(-0.08994, 51.355129);
      };
    }

    let forecast12Div = null;

    if (this.props.longitude) {
      forecast12Div = <Forecast12 />;
    }

    let forecast5Div = null;
    if (this.props.longitude) {
      forecast5Div = <Forecast5 />;
    }

    return (
      <div className={classes.Main}>
        {this.props.idToken ? (
          <NavLink to="/logout" className={classes.NavLink}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className={classes.LogOut}
              size="3x"
            />
          </NavLink>
        ) : null}

        {this.props.idToken ? (
          <NavLink to="/settings" className={classes.NavLink}>
            <FontAwesomeIcon icon={faCogs} className={classes.Cogs} size="3x" />
          </NavLink>
        ) : (
          <NavLink to="/signin" className={classes.NavLink}>
            <FontAwesomeIcon icon={faCogs} className={classes.Cogs} size="3x" />
          </NavLink>
        )}

        <h2 className={classes.Title}>Weather App</h2>
        {weatherDiv}
        {forecast12Div}
        {forecast5Div}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    longitude: state.longitude,
    latitude: state.latitude,
    weatherIcon: state.weatherIcon,
    loginSuccess: state.loginSuccess,
    idToken: state.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGeolocation: (longitude, latitude) =>
      dispatch(actions.geolocation(longitude, latitude)),
    onCurrentWeather: (longitude, latitude) =>
      dispatch(actions.currentWeather(longitude, latitude)),
    onSetLocalIdIdtoken: (idToken, localId) =>
      dispatch(actions.setLocalIdIdtoken(idToken, localId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
