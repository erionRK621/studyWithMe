import React,{useState} from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Image from "../elements/Image";
import Text from "../elements/Text";
import Input from "../elements/Input";
import Button from "../elements/Button";
import {actionCreators as commentActions} from "../redux/modules/comment";
const CommentWrite = (props) => {
    const postId=props.postId;
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const commentHandler =(e)=> {
        setComment(e.target.value);
    }
    const registComment = () => {
        dispatch(commentActions.addCommentMiddleware(postId,comment));
    }
  return (
    <React.Fragment>
      <FlexGrid align="center" color="#eeeeee" padding="10px">
        <FlexGrid align="center" margin="0px 10px">
          <Image size="30" />
        </FlexGrid>
        <Input border="none" _onChange={commentHandler}/>
        <Button width="40px" _onClick={registComment}>등록</Button>
      </FlexGrid>
    </React.Fragment>
  );
};

const FlexGrid = styled.div`
  display: flex;
  max-width: 750px;
  ${(props) => (props.color ? `background-color:${props.color};` : null)};
  ${(props) => (props.margin ? `margin:${props.margin};` : null)};
  ${(props) => (props.direction ? `flex-direction:${props.direction};` : null)};
  ${(props) => (props.align ? `align-items:${props.align};` : null)}
  ${(props) => (props.justify ? `justify-content:${props.justify};` : null)}
  ${(props) => (props.padding ? `padding:${props.padding};` : null)}
`;

export default CommentWrite;
