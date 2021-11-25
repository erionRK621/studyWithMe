import React from "react";
import styled from "styled-components";
import logo from "../icon/footerLogo.png";

const Footer = () => {
  return (
    <FooterWrap>
      <Wrap>
        <FooterBtnList>
          <li>
            <Title>Front-end & Design</Title>
            <p>권영준</p>
            <p>김준형</p>
            <p>김한준</p>
          </li>
          <li>
            <Title>Back-end</Title>
            <p>서연제</p>
            <p>장재원</p>
            <p>홍성현</p>
          </li>
          <li></li>
          <li>
            <ImgContents>
              <img src={logo} style={{ maxWidth: "100%" }} />
            </ImgContents>
          </li>
        </FooterBtnList>
      </Wrap>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  width: 100%;
  margin: auto;
  height: 180px;
  color: #707070;
  background-color: #ececec;
  @media screen and (max-width: 768px) {
    height: 150px;
  }
`;
const Title = styled.p`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Wrap = styled.div`
  max-width: 1134px;
  background-color: #ececec;
  padding: 0px 40px;
  margin: auto;
  @media screen and (max-width: 768px) {
    max-width: 768px;
    font-size: 8px;
    padding: 0px;
    height: 150px;
  }
`;

const FooterBtnList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* flex-direction:row;
    flex-wrap: wrap;
    align-items:flex-start; */
  margin: 30px auto 0 auto;
  padding: 50px auto;
  list-style: none;
  & li {
    display: block;
    list-style-type: none;
    box-sizing: border-box;
    margin: 30px 0 16px 0;
    text-align: center;
  }
`;
const ImgContents = styled.div`
  position: absolute;
  z-index: 2;
  right: 10%;
  @media screen and (max-width: 768px) {
    width: 100px;
    right: 10%;
  }
`;

export default Footer;
