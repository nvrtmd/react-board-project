import React, { memo } from "react";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export const Button = memo(({ handleClick, buttonName }) => {
  console.log("Button");
  return <ButtonBox onClick={handleClick}>{buttonName}</ButtonBox>;
});

const ButtonBox = styled.div`
  background: ${theme.color.tertiary};
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background: ${theme.color.primary};
    color: ${theme.color.white};
  }
  margin: 0.5rem;
`;
