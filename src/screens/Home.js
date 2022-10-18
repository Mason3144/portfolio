import styled from "styled-components";
import { Layout } from "./components";
import Header from "./Header";
import { Link } from "react-router-dom";

const BigContainer = styled.div``;
const Container = styled.div``;

export default function Home() {
  return (
    <BigContainer>
      <Header></Header>
      <Layout>
        <Container>
          <Link to={"/instagram-clone"}>
            <h2>Instagram clone coding (IOS)</h2>
          </Link>
        </Container>
      </Layout>
    </BigContainer>
  );
}
