import React, { useEffect, useState } from "react";
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import styled from "styled-components";
import { history } from "../redux/configStore";

import Text from "../elements/Text";
import CardPost from "../components/CardPost";
import SelectBox from "../components/SelectBox";
const PostListTest = (props) => {
  const dispatch = useDispatch();

  // url에서 쿼리스트링 가져오기
  const getQueryString = props.location.search;

  // 쿼리스트링 파싱
  const queryInterest = getQueryString.includes("&categoryInterest=")
    ? decodeURI(getQueryString.split("&categoryInterest=")[1].split("&")[0])
    : null;
  const querySpace = getQueryString.includes("&categorySpace=")
    ? decodeURI(getQueryString.split("&categorySpace=")[1].split("&")[0])
    : null;
  const queryStudyMate = getQueryString.includes("&categoryStudyMate=")
    ? decodeURI(getQueryString.split("&categoryStudyMate=")[1])
    : null;

  // 카테고리 초기화
  const [interestVal, setInterestVal] = useState(
    queryInterest ? queryInterest : ""
  );
  const [spaceVal, setSpaceVal] = useState(querySpace ? querySpace : "");
  const [studyMateVal, setStudyMateVal] = useState(
    queryStudyMate ? queryStudyMate : ""
  );

  const post_list = useSelector((state) => state.post.list);
  const _selectArray = [
    { value: interestVal, func: setInterestVal },
    { value: spaceVal, func: setSpaceVal },
    { value: studyMateVal, func: setStudyMateVal },
  ];
  const selectArray = _selectArray.filter((s, idx) => {
    if (s.value !== "") {
      return s;
    }
  });

  // select box 이벤트
  const space = (e) => {
    setSpaceVal(e.target.value);
  };
  const studyMate = (e) => {
    setStudyMateVal(e.target.value);
  };
  const interest = (e) => {
    setInterestVal(e.target.value);
  };

  useEffect(() => {
    // category 값이 변할때마다 쿼리스트링 수정 및 api요청
    let setQueryString = `${
      interestVal ? "&categoryInterest=" + interestVal : ""
    }${spaceVal ? "&categorySpace=" + spaceVal : ""}${
      studyMateVal ? "&categoryStudyMate=" + studyMateVal : ""
    }`;
    dispatch(postActions.getFilterPostDB(setQueryString));
  }, [interestVal, spaceVal, studyMateVal]);

  return (
    <Wrap>
      <SelectGrid>
        <SelectBox
          category="interest"
          _onChange={interest}
          _value={interestVal}
        />
        <SelectBox category="space" _onChange={space} _value={spaceVal} />
        <SelectBox
          category="studyMate"
          _onChange={studyMate}
          _value={studyMateVal}
        />
      </SelectGrid>
      <SelectedGrid>
        {selectArray.map((filter, idx) => {
          return (
            <Selected key={idx}>
              <Text color="#aaaaaa">{filter.value}</Text>
              <TiDeleteOutline
                color="#aaaaaa"
                onClick={() => {
                  filter.func("");
                }}
              />
            </Selected>
          );
        })}
        {selectArray.length > 0 ? (
          <ButtonText
            onClick={() => {
              setInterestVal("");
              setSpaceVal("");
              setStudyMateVal("");
            }}
          >
            초기화
          </ButtonText>
        ) : null}
      </SelectedGrid>
      <GridWrap>
        {post_list.map((p, idx) => {
          return (
            <ItemGrid key={p.postId}>
              <CardPost
                {...p}
                onClick={() => {
                  history.push(`/detail/${p.postId}`);
                }}
              />
            </ItemGrid>
          );
        })}
      </GridWrap>
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: 1090px;
  margin: auto;
  padding:20px;
`;
const GridWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0px;
  justify-content: flex-start;
`;

const ItemGrid = styled.div`
  width: 33.33333%;
  box-sizing: border-box;
  padding: 0px 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top:20px;
  }
`;

const SelectGrid = styled.div`
  height: 30px;
  padding-top: 20px;
  width: 100%;
  display: flex;
  padding-left:10px;
`;

const SelectedGrid = styled.div`
  padding-top: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  padding-left:10px;
`;

const Selected = styled.div`
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-right: 10px;
  border-radius: 10px;
`;

const ButtonText = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  line-height: ${(props) => props.lineHeight};
  word-break: break-all;
  overflow: hidden;
  &:hover {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;
export default PostListTest;
