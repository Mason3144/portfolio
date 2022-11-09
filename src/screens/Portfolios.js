import styled from "styled-components";
import { Layout } from "./components";
import Header from "./Header";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const BigContainer = styled.div`
  flex-direction: column;
`;
const Container = styled.div``;
const Contents = styled.div``;
const H2 = styled.h2`
  color: rgba(0, 0, 0, 0.7);
  text-decoration: underline;
  font-weight: 600;
  font-size: 20px;
`;

export default function Portfolios() {
  return (
    <BigContainer>
      <Header></Header>
      <Nav />
      <Contents>
        <Layout>
          <Container>
            <Link
              to={"/portfolios/instagram-clone"}
              style={{ textDecoration: "none" }}
            >
              <H2>Instagram clone coding (Fullstack, IOS)</H2>
            </Link>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <Link
              to={"/portfolios/youtube-graphql"}
              style={{ textDecoration: "none" }}
            >
              <H2>Youtube clone coding (Backend, GraphQL)</H2>
            </Link>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <Link
              to={"/portfolios/youtube-restful"}
              style={{ textDecoration: "none" }}
            >
              <H2>Youtube clone coding (Backend, Restful)</H2>
            </Link>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <Link
              to={"/portfolios/oop-practice"}
              style={{ textDecoration: "none" }}
            >
              <H2>타입스크립트를 이용한 객체 지향 프로그래밍(연습)</H2>
            </Link>
          </Container>
        </Layout>
      </Contents>
    </BigContainer>
  );
}
