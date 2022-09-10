import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export default function SelectContainer({ optionList, handleChange, name }) {
  return (
    <SelectWrapper>
      <Select onChange={handleChange} name={name}>
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

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  background-color: ${theme.color.lightGrey};
  border-radius: 3rem;
  padding: 1rem;
`;

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: GmarketSansMedium;
  border: none;
  outline: none;
  width: 100%;
  background-color: ${theme.color.lightGrey};
  -webkit-appearance: none;
  background-position-x: 96%;
  background-position-y: 50%;
`;
const Option = styled.option`
  padding: 30px;
`;
