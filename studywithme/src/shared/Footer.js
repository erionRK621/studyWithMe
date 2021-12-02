import React from "react";
import styled from "styled-components";
import logo from "../icon/footerLogo.png";
import Swal from "sweetalert2";

const Footer = () => {
  return (
    <FooterWrap>
      <Wrap>
        <FooterBtnList>
          <li>
            <img src={logo} style={{ maxWidth: "100%" }} />

            <CopyRight>
              © 2021 Project Letskkirri. All rights reserved.
            </CopyRight>
          </li>
          <MenuList>
            <Title>Service</Title>
            <Element
              onClick={() => {
                Swal.fire("서비스 준비중입니다.", "", "error");
              }}
            >
              서비스 소개
            </Element>
            <Element
              onClick={() => {
                Swal.fire("서비스 준비중입니다.", "", "error");
              }}
            >
              서비스 이용 방법
            </Element>
          </MenuList>

          <MenuList>
            <Title>Team</Title>
            <Element
              onClick={() => {
                window.location.href =
                  "https://github.com/erionRK621/studyWithMe";
              }}
            >
              프론트엔드
            </Element>
            <Element
              onClick={() => {
                window.location.href =
                  "https://github.com/JangJaeWon22/focus-with-me";
              }}
            >
              백엔드
            </Element>
          </MenuList>
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
  background-color: #f9f9f9;
  @media screen and (max-width: 768px) {
    height: 150px;
  }
`;
const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: black;

  @media screen and (max-width: 768px) {
    margin-top: 14px;
    font-size: 14px;
  }
`;
const Element = styled.p`
  cursor: pointer;
`;

const Wrap = styled.div`
  max-width: 1134px;
  background-color: #f9f9f9;
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
  grid-template-columns: 1.5fr 1fr 1fr;
  /* flex-direction:row;
    flex-wrap: wrap;
    align-items:flex-start; */
  margin: 30px auto 0 auto;
  padding: 50px auto;
  list-style: none;

  & li {
    min-width: 100px;
    display: block;
    list-style-type: none;
    box-sizing: border-box;
    margin: 30px 0 16px 0;
    text-align: start;
  }
  & li:nth-child(1) {
    margin-right: 20px;
  }
`;
const MenuList = styled.li`
  margin: auto;
`;

const CopyRight = styled.div`
  font-size: 8px;
  display: flex;
  justify-content: start;
  @media screen and (max-width: 768px) {
    font-size: 4px;
  }
`;

export default Footer;
