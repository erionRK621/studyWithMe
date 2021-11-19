import React from "react";
import styled from "styled-components";

const SelectBox = (props) => {
  const { _onChange, _value, category } = props;
  let optionData = [];
  if(category === "sort") {
    optionData = [
      { option: "정렬", value: "" },
      { option: "최신순", value: "asc" },
      { option: "오래된순", value: "desc" }
    ]
  }
  if (category === "space") {
    optionData = [
      { option: "공간", value: "" },
      { option: "집", value: "집" },
      { option: "카페", value: "카페" },
      { option: "도서관", value: "도서관" },
    ];
  } else if (category === "studyMate") {
    optionData = [
      { option: "유형", value: "" },
      { option: "혼자", value: "혼자" },
      { option: "그룹", value: "그룹" },
    ];
  } else if (category === "interest") {
    optionData = [
      { option: "관심사", value: "" },
      { option: "개발", value: "개발" },
      { option: "입시", value: "입시" },
    ];
  }
  return (
    <Grid>
      <Select onChange={_onChange} value={_value}>
        {optionData.map((o, idx) => {
          return idx === 0 ? (
            <Option value={o.value} key={idx} disabled defaultValue hidden>
              {o.option}
            </Option>
          ) : (
            <Option value={o.value} key={idx}>
              {o.option}
            </Option>
          );
        })}
      </Select>
    </Grid>
  );
};
SelectBox.defaultProps = {
  _onChange: () => {},
  _value: "",
  category: "",
};

const Grid = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Select = styled.select`
  ${(props) =>
    props.value !== ""
      ? "background-color:#FFC85C;"
      : "background-color:#ECECEC;"};
  font-size: 16px;
  width: 80px;
  height: 40px;
  text-align: center;
  border-radius: 10px;
  border : none;
  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 12px;
  }
`;
const Option = styled.option``;
export default SelectBox;
