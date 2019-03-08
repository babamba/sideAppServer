import React from "react";
import PropTypes from "prop-types"
import styles from "./styles.module.scss"
import PhotoActions from "../../components/PhotoActions"
import PhotoComments from "../../components/PhotoComments"
import TimeStamp from "../../components/TimeStamp"
import CommentBox from "../../components/CommentBox"
import UserList from "../../components/UserList";

const FeedPhoto = (props, context) => {
    return (
        <div className={styles.feedPhoto}>
            <header className={styles.header}>
                <img 
                    className={styles.image}
                    src={ props.creator.profile_image || require("images/noPhoto.jpeg")}
                    alt={ props.creator.username } 
                />
                <div className={styles.headerColumn}>
                    <span className={styles.creator}>{ props.creator.username }</span>
                    <span className={styles.location}>{ props.location }</span>
                </div>
            </header>
            <img src={props.file} alt={props.caption} />

            <div className={styles.meta}>
                {/* 사진에 대한 액션들(좋아요, 좋아요누른 유저리스트 컴포넌트 표시(포토액션에게 전달) ) */}
                <PhotoActions 
                    number = {props.like_count} 
                    isLiked={props.is_liked} 
                    photoId={props.id}
                    openLikes={props.openLikes}
                />
                {/* 사진에 달려있는 댓글들을 보여준다. */}
                <PhotoComments 
                    caption = {props.caption}
                    creator = {props.creator.username}
                    comments = {props.comments}
                />
                {/* 언제 올렷는지 (파이썬 humanize를 통한 create_at 컬럼 변환하여 표시) */}
                <TimeStamp time={props.natural_time} />

                {/* 댓글 작성 area */}
                <CommentBox 
                    photoId={props.id}
                />
            </div>
            {/* likes를 클릭하면 유저리스트를 보여준다 
                타이틀은 likes 이며 유저리스트 컴포넌트에게 prop값을 준다.
            */}
            {props.seeingLikes && 
            <UserList title={context.t("likes")} 
                      closeLikes={props.closeLikes}
            />}
        </div>
    )
}

FeedPhoto.contextTypes = {
    t: PropTypes.func.isRequired
};

FeedPhoto.propTypes = {
    // 오브젝트 일때 (내부안에 값이 있을때 ) shape 사용
    creator : PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
    }),
    location: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    like_count:PropTypes.number.isRequired,
    caption:PropTypes.string.isRequired,
    // 배열안의 오브젝트 
    comments : PropTypes.arrayOf(
        PropTypes.shape({
            message : PropTypes.string.isRequired,
            creator : PropTypes.shape({
                profile_image: PropTypes.string,
                username: PropTypes.string.isRequired
            }).isRequired,
        })
    ).isRequired,
    natural_time : PropTypes.string.isRequired,
    is_liked : PropTypes.bool.isRequired,
    seeingLikes : PropTypes.bool.isRequired,
    openLikes : PropTypes.func.isRequired,
    closeLikes : PropTypes.func.isRequired,
    likes: PropTypes.arrayOf(
        PropTypes.shape({
          profile_image: PropTypes.string,
          username: PropTypes.string.isRequired,
          name: PropTypes.string
        }).isRequired
      )
}

export default FeedPhoto;
