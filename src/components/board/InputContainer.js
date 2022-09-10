import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export default function InputContainer({
  title,
  name,
  placeholder,
  handleChange,
}) {
  return (
    <InputWrapper>
      {title}
      <Input name={name} onChange={handleChange} placeholder={placeholder} />
    </InputWrapper>
  );
}

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
