import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pageActions } from "../redux/modules/pagination";
const Pagination = (props) => {
  const totalPg = props.totalPg;
  const itemLength=props.itemLength;
  const pageList = useSelector(state=> state.pagination.pageList);
  console.log(pageList);
  const dispatch = useDispatch();
  const changePage = (page) => {
    dispatch(pageActions.setPage(page, totalPg));
  };
  // 실제로 뷰로 보여줄 페이지
  let totalPage = [];
  for(let i=1; i<=totalPg; i++) {
    totalPage.push(i);
  }
  if(itemLength){
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
    }
    else {
      return null;
    }
};

const Page = styled.p`
  margin: 5px;
`;
export default Pagination;
