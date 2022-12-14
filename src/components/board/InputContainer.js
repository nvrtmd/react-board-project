import React, { memo } from "react";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export const InputContainer = memo(
  ({ title, name, placeholder, handleChange, type, value }) => {
    return (
      <InputWrapper>
        {title}
        <Input
          name={name}
          type={type}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
        />
      </InputWrapper>
    );
  }
);

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 100%;
  background-color: ${theme.color.lightGrey};
  border-radius: 3rem;
  font-size: 1.2rem;
`;

const Input = styled.input`
  font-size: 1.2rem;
  width: 100%;
  margin-left: 1rem;
  border: none;
  ::placeholder {
    font-family: GmarketSansMedium;
  }
`;
