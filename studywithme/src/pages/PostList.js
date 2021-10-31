import React, { useEffect, useState } from "react";
import { actionCreators as postCreators } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";

import SelectBox from "../components/SelectBox";
const PostList = (props) => {
  const dispatch = useDispatch();

  // url에서 쿼리스트링 가져오기
  const getQueryString = props.location.search;

  // 쿼리스트링 파싱
  const queryInterest = getQueryString.includes("&categoryInterest=")
    ? getQueryString.split("&categoryInterest=")[1].split("&")[0]
    : null;
  const querySpace = getQueryString.includes("&categorySpace=")
    ? getQueryString.split("&categorySpace=")[1].split("&")[0]
    : null;
  const queryStudyMate = getQueryString.includes("&categoryStudyMate=")
    ? getQueryString.split("&categoryStudyMate=")[1]
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

    dispatch(postCreators.getFilterPostDB(setQueryString));
  }, [interestVal, spaceVal, studyMateVal]);

  return (
    <>
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
    </>
  );
};

export default PostList;
