import React from 'react';
import { useDispatch} from "react-redux";
import styled from "styled-components";
import { actionCreators as commentActions } from "../redux/modules/comment";

const ReplyList = (props) => {
    const dispatch = useDispatch();
    const postId = props.postId;
    const commentId = props.commentId;
    React.useEffect(()=>{
        dispatch(commentActions.getCommentReplyMiddleware(postId, commentId));
    },[]);
    return (<FlexGrid></FlexGrid>);
};
const FlexGrid = styled.div`
  display: flex;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "750px")};
  ${(props) => (props.minWidth ? `min-width:${props.minWidth};` : null)};
  ${(props) => (props.color ? `background-color:${props.color};` : null)};
  ${(props) => (props.margin ? `margin:${props.margin};` : null)};
  ${(props) => (props.direction ? `flex-direction:${props.direction};` : null)};
  ${(props) => (props.align ? `align-items:${props.align};` : null)};
  ${(props) => (props.justify ? `justify-content:${props.justify};` : null)};
  ${(props) => (props.padding ? `padding:${props.padding};` : null)};
  margin-top: ${(props) => props.marginTop};
  ${(props) =>
    props.paddingLeft ? `padding-left:${props.paddingLeft};` : null};
`;
export default ReplyList;