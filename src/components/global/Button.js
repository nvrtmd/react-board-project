import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export default function Button({ handleClick, buttonName }) {
  return <ButtonBox onClick={handleClick}>{buttonName}</ButtonBox>;
}

const ButtonBox = styled.div`
  background: ${theme.color.lightPurple};
  width: 20%;
  padding: 1rem 0px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background: ${theme.color.primary};
  }
`;
