import styled from "styled-components";
const HeaderContainer = styled.header`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  margin-bottom: 50px;
  align-items: center;
  display: flex;
`;
const HeaderTitle = styled.h1`
  margin-left: 20px;
  font-size: 30px;
  font-weight: 600;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle>Taeseop's portfolios</HeaderTitle>
    </HeaderContainer>
  );
}
