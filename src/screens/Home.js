import styled from "styled-components";
import { Layout } from "./components";
import Header from "./Header";
import { Link } from "react-router-dom";

const BigContainer = styled.div``;
const Container = styled.div``;
const H2 = styled.h2`
  color: rgba(0, 0, 0, 0.7);
  text-decoration: underline;
`;

export default function Home() {
  return (
    <BigContainer>
      <Header></Header>
      <Layout>
        <Container>
          <Link to={"/instagram-clone"} style={{ textDecoration: "none" }}>
            <H2>Instagram clone coding (IOS)</H2>
          </Link>
        </Container>
      </Layout>
    </BigContainer>
  );
}
