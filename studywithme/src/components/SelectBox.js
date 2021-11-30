import React from "react";
import styled from "styled-components";

const SelectBox = (props) => {
  const { _onChange, _value, category } = props;
  let optionData = [];
  if(category === "sort") {
    optionData = [
      { option: "정렬", value: "" },
      { option: "최신순", value: "desc" },
      { option: "오래된순", value: "asc" }
    ]
  }
  if (category === "space") {
    optionData = [
      { option: "공간", value: "" },
      { option: "공유오피스", value: "공유오피스" },
      { option: "집", value: "집" },
      { option: "카페", value: "카페" },
      { option: "회사", value: "회사" },
    ];
  } else if (category === "interest") {
    optionData = [
      { option: "분야", value: "" },
      { option: "개발", value: "개발" },
      { option: "건축", value: "건축" },
      { option: "공부", value: "공부" },
      { option: "교육", value: "교육" },
      { option: "금융", value: "금융" },
      { option: "기획", value: "기획" },
      { option: "디자인", value: "디자인" },
      { option: "마케팅", value: "마케팅" },
      { option: "미디어", value: "미디어" },
      { option: "법률", value: "법률" },
      { option: "비즈니스", value: "비즈니스" },
      { option: "서비스", value: "서비스" },
      { option: "엔지니어링", value: "엔지니어링" },
      { option: "엔터테인먼트", value: "엔터테인먼트" },
      { option: "의료/바이오", value: "의료/바이오" },
      { option: "자기계발", value: "자기계발" },
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
