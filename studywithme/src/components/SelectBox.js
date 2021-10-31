import React from "react";
import styled from "styled-components";

const SelectBox = (props) => {
  const { _onChange, _value, category } = props;
  let optionData = [];
  if (category === "space") {
    optionData = [
      { option: "공간", value: "" },
      { option: "집", value: "home" },
      { option: "카페", value: "cafe" },
    ];
  } else if (category === "studyMate") {
    optionData = [
      { option: "유형", value: "" },
      { option: "혼자", value: "solo" },
      { option: "그룹", value: "group" },
    ];
  } else if (category === "interest") {
    optionData = [
      { option: "관심사", value: "" },
      { option: "개발", value: "dev" },
      { option: "입시", value: "univ" },
    ];
  }
  return (
    <Select onChange={_onChange} value={_value}>
      {optionData.map((o, idx) => {
        return (
          <Option value={o.value} key={idx}>
            {o.option}
          </Option>
        );
      })}
    </Select>
  );
};
SelectBox.defaultProps = {
  _onChange: () => {},
  _value: "",
  category: "",
};

const Select = styled.select``;
const Option = styled.option``;
export default SelectBox;
