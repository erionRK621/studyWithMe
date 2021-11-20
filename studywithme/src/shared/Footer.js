import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrap>
      <Wrap>
        <FooterBtnList>
          <li>
            <p>Front-end</p>
            <p>권영준</p>
            <p>김준형</p>
            <p>김한준</p>
          </li>
          <li>
            <p>Back-end</p>
            <p>서연제</p>
            <p>장재원</p>
            <p>홍성현</p>
          </li>
          <li>
            <span>Design</span>
          </li>
        </FooterBtnList>
      </Wrap>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  width: 100%;
  margin: auto;
  color: #707070;
  background-color: #ececec;
`;

const Wrap = styled.div`
  max-width: 980px;
  background-color: #ececec;
  margin: 0px auto;
`;

const FooterBtnList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* flex-direction:row;
    flex-wrap: wrap;
    align-items:flex-start; */
  margin: 20px auto 0 auto;
  padding: 50px auto;
  list-style: none;
  & li {
    display: block;
    list-style-type: none;
    box-sizing: border-box;
    margin: 0 0 16px 0;
  }
  & span {
    font-size: 15px;
  }
`;

export default Footer;
