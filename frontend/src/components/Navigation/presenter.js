import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Notification from "components/Notification"

const Navigation = (props, context) => (
  <div className={styles.navigation}>
    <div className={styles.inner}>
      <div className={styles.column}>
        <Link to="/">
          <img
            src={require("images/logo.png")}
            className={styles.logo}
            alt={context.t("Logo")}
          />
        </Link>
      </div>
      <div className={styles.column}>
      <form mehtod="post" onSubmit={props.onSubmit}>
        <input
          type="text"
          placeholder={context.t("Search")}
          className={styles.searchInput}
          value={props.value}
          onChange={props.onInputChange}
        />
        </form>
      </div>
      
      <div className={styles.column}>
        <div className={styles.navIcon} onClick={props.closeNotification} >
          <Link to="/explore">
            <Ionicon icon="ios-compass-outline" fontSize="28px" color="black" />
          </Link>
        </div>
        <div className={styles.navIcon} onClick={props.onNotification}>
          <Ionicon icon="ios-heart-outline" fontSize="28px" color="black" />
        </div>
        <div className={styles.navIcon} onClick={props.closeNotification}>
          <Link to="/profile">
            <Ionicon icon="ios-person-outline" fontSize="32px" color="black" />
          </Link>
        </div>
      </div>
    </div>
    <div>{props.notification && <RenderNavigation />}</div>
  </div>
);

const RenderNavigation = (props, context) => (
  <div>
    <Notification />
  </div>
);

Navigation.contextTypes = {
  t: PropTypes.func.isRequired
};

Navigation.propTypes = {
  onSubmit : PropTypes.func.isRequired,
  onInputChange : PropTypes.func.isRequired,
  value : PropTypes.string.isRequired,
  closeNotificatiopn : PropTypes.func,
  onNotification : PropTypes.func,
  notification : PropTypes.bool
}

export default Navigation;