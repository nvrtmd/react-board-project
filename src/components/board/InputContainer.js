import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export default function InputContainer({ title, name, setData, placeholder }) {
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <InputWrapper>
      {title}
      <Input
        name={name}
        onChange={(e) => handleInputChange(e)}
        placeholder={placeholder}
      />
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
  border-radius: 45px;
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
