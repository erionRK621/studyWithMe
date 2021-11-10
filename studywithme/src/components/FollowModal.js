import React from "react";
import styled from "styled-components";

// Modal.jsx

const FollowModal = ({ modalClose }) => {
  const onCloseModal = (e) => {
    console.log("e.target: ", e.target);
    console.log("e.tarcurrentTargetget: ", e.currentTarget);
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  return (
    <Container onClick={onCloseModal}>
      <Modal>
        <ModalTitle>
          <div>팔로우 목록</div>
          {/* <ModalBtn onClick={modalClose}> X</ModalBtn> */}
        </ModalTitle>
        <div>팔로우 사람들 맵돌리기</div>
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

// const ModalBtn = styled.button`
//   position: relative;
//   left: 30%;
//   top: 60%;
//   transform: translate(-50%, -50%);
// `;

export default FollowModal;
