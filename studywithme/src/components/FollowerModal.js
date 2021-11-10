import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import dotenv from "dotenv";

import Image from "../elements/Image";
import Grid from "../elements/Grid";

// Modal.jsx

const FollowerModal = ({ modalClose, followerList }) => {
  const dispatch = useDispatch();

  console.log("followerList", followerList);

  const onCloseModal = (e) => {
    // console.log("e.target: ", e.target);
    // console.log("e.tarcurrentTarget", e.currentTarget);
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  return (
    <Container onClick={onCloseModal}>
      <Modal>
        <ModalTitle>
          <div>팔로워 목록</div>
          {/* <ModalBtn onClick={modalClose}> X</ModalBtn> */}
        </ModalTitle>
        <ModalBody>
          {followerList.map((follower, idx) => {
            return (
              <FlexGrid
                key={follower.userId}
              >
                <Grid>
                  <Image
                    size="60"
                    src={`${process.env.REACT_APP_API_URI}/${follower.avatarUrl}`}
                  />
                </Grid>
                <Grid>
                  <UserName
                    size="15px"
                  >
                    {follower.nickname}
                  </UserName>
                </Grid>
              </FlexGrid>
            )
          })}
        </ModalBody>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  width: 400px;
  height: 600px;
  background-color: #fff;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: solid 1px black;
  padding: 10px;
`;

const ModalBody = styled.div`
`;

const FlexGrid = styled.div`
display: flex;
justify-content: space-evenly;
margin-left: 5px;
margin-bottom: 5px;
align-items: center;
`;

const UserName = styled.p`
`;

// const ModalBtn = styled.button`
//   position: relative;
//   left: 30%;
//   top: 60%;
//   transform: translate(-50%, -50%);
// `;

export default FollowerModal;
