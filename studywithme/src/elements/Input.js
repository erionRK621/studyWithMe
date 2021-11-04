import React from "react";
import styled from "styled-components";

import Grid from "./Grid";
import Text from "./Text";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_Submit,
    onSubmit,
    width,
    border,
    borderBottom,
    size,
    bgColor,
  } = props;

  const styles = {
    width: width,
    border: border,
    borderBottom: borderBottom,
    size: size,
    bgColor:bgColor,
  };
  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          {...styles}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {/* is_Submit이 있으면 value 컨트롤하기, 없으면 value 컨트롤하지 않기 */}
        {is_Submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                onSubmit(e);
              }
            }}
            {...styles}
          />
        ) : (
          <ElInput
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={_onChange}
            {...styles}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  is_Submit: false,
  onSubmit: () => {},
  _onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: ${(props) => (props.border ? props.border : "1px solid #212121")};
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 12px 4px;
  box-sizing: border-box;
  ${(props)=>(props.bgColor? `background-color:${props.bgColor};`: null)};
`;

const ElInput = styled.input`
  border: ${(props) => (props.border ? props.border : "1px solid #212121")};
  ${(props) => (props.borderBottom ? `border-bottom:1px solid;` : null)};
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 12px 4px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  ${(props) => (props.size ? `font-size:${props.size};` : null)};
  ${(props)=>(props.bgColor? `background-color:${props.bgColor};`: null)};
`;

export default Input;
