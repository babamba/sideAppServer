import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Loading from "components/Loading";

const Notification = (props, context) => {
  console.log("noti!!!!")
    if(props.loading){
        return <LoadingNotifications {...props} />;
    } else {
        return <RenderNotification {...props} />;
    }
};

const LoadingNotifications = props => (
  <div className={styles.feed}>
    <Loading />
  </div>
);

const RenderNotification = (props, context) => (
    <div className={styles.container}>
        {props.list.map(notifications => <UserDisplay notifications={notifications} key={notifications.id}/>)}
    </div>
);

const UserDisplay = (props, context) => {
    return (
            <div className={styles.column}>
                <img src={props.noti.creator.profile_image || require("images/noPhoto.jpeg")} alt={props.noti.creator.username} className={styles.avatar} />
                <div className={styles.user}>
                <span className={styles.username}>{props.noti.creator.name}</span>{" "}
                <span className={styles.username}>
                    {props.noti.notification_type === "follow" ? "started following you." : "" }
                    {props.noti.notification_type === "comment" ? "commented:" : "" }
                    {props.noti.notification_type === "like" ? "liked your photo." : "" }
                </span>
                <span className={styles.username}>{props.noti.comment}</span>
                </div>
                <img src={props.noti.image ? props.noti.image.file : require("images/noPhoto.jpeg")} 
                    alt={props.noti.creator.username} 
                    className={styles.postImage} />
            </div>
    );
};

UserDisplay.propTypes = {
    comment: PropTypes.string,
    image: PropTypes.shape({
        file: PropTypes.string
    }),
    notification_type: PropTypes.string,
    creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })
};

Notification.propTypes = {
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array
};


export default Notification;