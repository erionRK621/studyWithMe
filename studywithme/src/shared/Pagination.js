import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pageActions } from "../redux/modules/pagination";
const Pagination = (props) => {
  const pageCnt = props.pageCnt;
  const dispatch = useDispatch();
  const changePage = (page) => {
    dispatch(pageActions.setPage(page));
  };
  let totalPage = [];
  for (let i = 1; i <= pageCnt; i++) {
    totalPage.push(i);
  }
  return (
    <>
      {totalPage.map((page, idx) => {
        return (
          <Page
            className="textButton"
            onClick={() => {
              changePage(page);
            }}
            key={idx}
          >
            {page}
          </Page>
        );
      })}
    </>
  );
};

const Page = styled.p`
  margin: 5px;
`;
export default Pagination;
