import React, { useEffect, useState } from "react";
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configStore";

import Text from "../elements/Text";
import CardPost from "../components/CardPost";
import SelectBox from "../components/SelectBox";
import InfinityScroll from "../shared/InfinityScroll";

//icon
import { ReactComponent as Cross } from "../icon/cross.svg";
import { ReactComponent as Search } from "../icon/searchIcon.svg";

const PostList = (props) => {
  const dispatch = useDispatch();

  // 무한스크롤
  const { isLoading, totalPage, currentPage } = useSelector(
    (state) => state.post
  );

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
    ? decodeURI(getQueryString.split("&categoryStudyMate=")[1].split("&")[0])
    : null;
  const queryKeyword = getQueryString.includes("&keyword=")
    ? decodeURI(getQueryString.split("&keyword=")[1].split("&")[0])
    : null;
  const querySort = getQueryString.includes("&sort=")
    ? decodeURI(getQueryString.split("&sort=")[1].split("&")[0])
    : null;

  // 카테고리 초기화
  const [interestVal, setInterestVal] = useState(
    queryInterest ? queryInterest : ""
  );
  const [spaceVal, setSpaceVal] = useState(querySpace ? querySpace : "");
  const [studyMateVal, setStudyMateVal] = useState(
    queryStudyMate ? queryStudyMate : ""
  );
  const [sortVal, setSortVal] = useState(querySort ? querySort : "");
  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState(queryKeyword ? queryKeyword : "");

  const post_list = useSelector((state) => state.post.filterList);
  const _selectArray = [
    { value: interestVal, func: setInterestVal },
    { value: spaceVal, func: setSpaceVal },
    { value: studyMateVal, func: setStudyMateVal },
    { value: keyword, func: setKeyword },
  ];
  const selectArray = _selectArray.filter((s, idx) => {
    if (s.value !== "") {
      return s;
    }
  });
  // select box 이벤트
  const sort = (e) => {
    setSortVal(e.target.value);
  };
  const space = (e) => {
    setSpaceVal(e.target.value);
  };
  const studyMate = (e) => {
    setStudyMateVal(e.target.value);
  };
  const interest = (e) => {
    setInterestVal(e.target.value);
  };

  const changeKeyword = (e) => {
    setKeywordInput(e.target.value);
  };

  // 키워드 검색 이벤트
  const onEnterKeywordInput = () => {
    setKeyword(keywordInput);
  };

  useEffect(() => {
    // 필터, 검색어, 정렬이 변할때마다 쿼리스트링 수정 및 api요청
    let setQueryString = `${
      interestVal ? "&categoryInterest=" + interestVal : ""
    }${spaceVal ? "&categorySpace=" + spaceVal : ""}${
      studyMateVal ? "&categoryStudyMate=" + studyMateVal : ""
    }${keyword ? "&keyword=" + keyword : ""}&page=1${
      sortVal ? "&sort=" + sortVal : ""
    }`;
    dispatch(postActions.getFilterPostDB(setQueryString, 0));
  }, [dispatch, keyword, interestVal, spaceVal, studyMateVal, sortVal]);
  return (
    <Wrap>
      <SearchGrid>
        <Search />
        <SearchInput
          onSubmit={onEnterKeywordInput}
          onChange={changeKeyword}
          value={keywordInput}
          placeholder="내가 관심 있는 주제를 입력해보세요."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onEnterKeywordInput();
            }
          }}
        />
      </SearchGrid>
      <SelectGrid>
        <SelectBox category="sort" _onChange={sort} _value={sortVal} />
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

      {selectArray.length > 0 ? (
        <SelectedGrid>
          {selectArray.map((filter, idx) => {
            return (
              <Selected key={idx}>
                <Text margin="0px 4px">{filter.value}</Text>
                <Cross
                  className="iconButton"
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
                setKeyword("");
              }}
              color="#FFC85C"
            >
              초기화
            </ButtonText>
          ) : null}
        </SelectedGrid>
      ) : null}

      <GridWrap>
        <InfinityScroll
          totalPage={totalPage}
          loading={isLoading}
          currentPage={currentPage}
          interestVal={interestVal}
          spaceVal={spaceVal}
          studyMateVal={studyMateVal}
          keyword={keyword}
          callNext={(page, interestVal, spaceVal, studyMateVal) => {
            let setQueryString = `${
              interestVal ? "&categoryInterest=" + interestVal : ""
            }${spaceVal ? "&categorySpace=" + spaceVal : ""}${
              studyMateVal ? "&categoryStudyMate=" + studyMateVal : ""
            }&page=${page + 1}${keyword ? "&keyword=" + keyword : ""}${
              sortVal ? "&sort=" + sortVal : ""
            }`;
            dispatch(postActions.getFilterPostDB(setQueryString, page));
          }}
        >
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
        </InfinityScroll>
      </GridWrap>
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: 1134px;
  margin: auto;
  padding: 20px;
  @media screen and (max-width: 768px) {
    max-width: 768px;
  }
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
    margin-top: 20px;
  }
`;

const SelectGrid = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  padding-left: 10px;
  @media screen and (max-width: 768px) {
    margin: auto;
    max-width: 358px;
  }
`;

const SelectedGrid = styled.div`
  margin-top: 17px;
  /* padding-top: 10px; */
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 10px;
`;

const Selected = styled.div`
  background-color: rgba(255, 200, 92, 1);
  opacity: 50%;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-right: 10px;
  border-radius: 20px;
`;

const ButtonText = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  line-height: ${(props) => props.lineHeight};
  word-break: break-all;
  overflow: hidden;
  &:hover {
    opacity: 50%;
    text-decoration: underline;
    cursor: pointer;
  }
`;
const SearchInput = styled.input`
  margin-left: 24px;
  border: none;
  background-color: rgba(221, 221, 221, 0);
  width: 100%;
  &:focus {
    outline: none;
  }
`;
const SearchGrid = styled.div`
  background-color: #ececec;
  margin-bottom: 15px;
  display: flex;
  padding: 8px 30px;
  border-radius: 50px;
`;
export default PostList;
