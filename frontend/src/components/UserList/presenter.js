import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Loading from "../../components/Loading";
import UserDisplay from "../../components/UserDisplay";


const UserList = props => (
  <div className={styles.container}>
    <div className={styles.box}>
      <header className={styles.header}>
        <h4 className={styles.title}>{props.title}</h4>
        <span className={styles.closeBox} onClick={props.closeLikes} >
          <Ionicon icon="md-close" fontSize="20px" color="black" />
        </span>
      </header>
      <div className={styles.contet} > 
        {props.loading ? <Loading /> : <RenderUsers list= {props.userList} />}
      </div>
    </div>
  </div>
);

const RenderUsers = props => 
  props.list.map(user => (
    < UserDisplay horizontal={true} user={user} key={user.id} />
  ));

UserList.contextTypes = {
  t: PropTypes.func.isRequired
};

RenderUsers.propTypes = {
  list: PropTypes.array
}

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  userList: PropTypes.array,
  closeLikes : PropTypes.func.isRequired
}

export default UserList;