import React from "react";
import PropTypes from "prop-types"
import Textarea from "react-textarea-autosize";
import styles from "./styles.module.scss"

const CommentBox = (props, context) => (
        <form className={styles.commentBox}>
            <Textarea 
                      placeholder={context.t("Add a Comment...")} 
                      className={styles.input} 
                      value={props.comment}
                      onChange={props.handleInputChange}
                      onKeyPress={props.handleKeyPreess}
            />
        </form>
)

CommentBox.contextTypes = {
    t: PropTypes.func.isRequired
}

CommentBox.propTypes = {
    handleInputChange : PropTypes.func.isRequired,
    handleKeyPreess : PropTypes.func.isRequired,
    comment : PropTypes.string.isRequired,
    photoId : PropTypes.number.isRequired
}

export default CommentBox;
