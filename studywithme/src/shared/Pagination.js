import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pageActions } from "../redux/modules/pagination";
const Pagination = (props) => {
  const totalPg = props.totalPg;
  const itemLength = props.itemLength;

  // 실제로 뷰로 보여줄 페이지 리스트
  const pageList = useSelector((state) => state.pagination.pageList);
  const [currentPage, setCurrentPage] = React.useState(1);
  console.log(pageList);
  const dispatch = useDispatch();
  const changePage = (page) => {
    setCurrentPage(page);
    dispatch(pageActions.setPage(page, totalPg));
  };

  if (itemLength) {
    return (
      <>
        {currentPage !== 1 ? (
          <PreNextButton
            onClick={() => {
              if (currentPage > 1) {
                changePage(currentPage - 1);
              }
            }}
          >
            &lt;
          </PreNextButton>
        ) : null}
        {pageList.map((page, idx) => {
          return (
            <Page
              className="textButton"
              onClick={() => {
                changePage(page);
              }}
              key={idx}
              page={page}
              currentPage={currentPage}
            >
              {page}
            </Page>
          );
        })}
        {currentPage !== totalPg ? (
          <PreNextButton
            onClick={() => {
              if (currentPage < totalPg) {
                changePage(currentPage + 1);
              }
            }}
          >
            &gt;
          </PreNextButton>
        ) : null}
      </>
    );
  } else {
    return null;
  }
};

const Page = styled.p`
  margin: 5px;
  ${(props) => (props.page === props.currentPage ? `color:#FFC85C; text-decoration:underline;` : null)};
`;

const PreNextButton = styled.button`
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
export default Pagination;
