import styled from "styled-components";
const HeaderContainer = styled.header`
  height: 50px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  margin-bottom: 50px;
`;
const HeaderTitle = styled.h2`
  margin-left: 20px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle>Taeseop's portfolio</HeaderTitle>
    </HeaderContainer>
  );
}
