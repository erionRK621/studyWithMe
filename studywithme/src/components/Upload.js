import React from "react";
import styled from "styled-components";

const Upload = (props) => {
  const { _onChange, display } = props;
  const styles={display : display};
  const fileInput = React.useRef();
  return (
    <InputFile type="file" onChange={_onChange} ref={fileInput} accept="image/*" {...styles}/>
  );
};

Upload.defaultProps = {
  _onChange: () => {},
};

const InputFile = styled.input`
    ${(props)=> props.display? `display:${props.display}` : null};
`;

export default Upload;
