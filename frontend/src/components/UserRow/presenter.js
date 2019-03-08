import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";


const UserRow = (props, context) => (
  <div className={styles.container}>
    <div className={styles.column}>
      <img 
        src={props.user.profile_image || require("images/noPhoto.jpeg") }
        alt={props.user.username}
        className={props.big ? styles.bigAvatar : styles.avatar}
      />
      <div className={styles.user}>
        <span className={styles.username}> {props.user.username}</span>
        <span className={styles.name}> {props.user.name}</span>
      </div>
    </div>
    <div className={styles.column}>
        <button className={styles.button} onClick={props.handleClick}>
          {props.user.following ? context.t("Follow") : context.t("UnFollow")  }
        </button>
      </div>
  </div>
);


UserRow.contextTypes = {
  t: PropTypes.func.isRequired
};

UserRow.propTypes = {
  user: PropTypes.shape({
    profile_image:PropTypes.string,
    username:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    following: PropTypes.bool.isRequired
  }).isRequired,
  big : PropTypes.bool,
  handleClick: PropTypes.func.isRequired
}

UserRow.defaultProps = {
  big: false
}

export default UserRow;