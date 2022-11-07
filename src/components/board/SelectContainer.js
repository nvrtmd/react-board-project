import React, { memo } from "react";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export const SelectContainer = memo(
  ({ optionList, handleChange, name, value }) => {
    return (
      <SelectWrapper>
        <Select onChange={handleChange} name={name} value={value}>
          {optionList &&
            optionList.map((option, index) => (
              <Option key={index} value={option.value}>
                {option.name}
              </Option>
            ))}
        </Select>
      </SelectWrapper>
    );
  }
);

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  background-color: ${theme.color.lightGrey};
  border-radius: 3rem;
  padding: 1rem;
  cursor: pointer;
`;

const Select = styled.select`
  cursor: pointer;
  font-size: 1.2rem;
  font-family: GmarketSansMedium;
  border: none;
  outline: none;
  width: 100%;
  background-color: ${theme.color.lightGrey};
`;
const Option = styled.option`
  padding: 30px;
`;
