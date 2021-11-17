import React from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pageActions } from "../redux/modules/pagination";
const Pagination = (props) => {
    const pageCnt = props.pageCnt;
    const dispatch = useDispatch();
    const changePage = (number) => {
        dispatch(pageActions.setPage());
      };
    let totalPage = [];
    for(let i=1; i<=pageCnt; i++){
        totalPage.push(i);
    }
    return(
        // {totalPage.map((page)=>{
        //     <Page
        //     className="textButton"
        //     onClick={changePage}
        //   >
        //     1
        //   </Page>
        // })}
        <></>
          
          );
};

const Page = styled.p`
  margin: 5px;
`;
export default Pagination;