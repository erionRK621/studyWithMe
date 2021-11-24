import React from 'react';
import { useDispatch} from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const ReplyList = (props) => {
    const dispatch = useDispatch();
    const postId = props.postId;
    const commentId = props.commentId;
    React.useEffect(()=>{
        dispatch(commentActions.getCommentReplyMiddleware(postId, commentId));
    })
    return (<></>);
};

export default ReplyList;