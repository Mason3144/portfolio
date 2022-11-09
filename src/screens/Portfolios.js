import styled from "styled-components";
import { Layout } from "./components";
import Header from "./Header";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const BigContainer = styled.div`
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;
const H2 = styled.h2`
  color: rgba(0, 0, 0, 0.7);
  text-decoration: underline;
  font-weight: 600;
  font-size: 20px;
  margin: 0 auto;
`;
const H1 = styled.h1`
  font-weight: 800;
  font-size: 40px;
  margin: 20px auto;
`;
const P = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin: 0 auto;
  padding-top: 15px;
  line-height: 20px;
`;

export default function Portfolios() {
  return (
    <BigContainer>
      <Header></Header>
      <Nav />
      <Contents>
        <H1>Project</H1>

        <Layout>
          <Link
            to={"/portfolios/instagram-clone"}
            style={{ textDecoration: "none" }}
          >
            <Container>
              <H2>Instagram clone coding (Fullstack, IOS)</H2>
              <P>
                인스타그램 클론코딩을 통해 Backend, Frontend, Database <br></br>
                서버들을 구축하고 websocket을 이용한 Direct Message등<br></br>
                여러기능들을 구현후 앱 배포
              </P>
            </Container>
          </Link>
        </Layout>

        <Layout>
          <Link
            to={"/portfolios/youtube-graphql"}
            style={{ textDecoration: "none" }}
          >
            <Container>
              <H2>Youtube clone coding (Backend, GraphQL)</H2>
              <P>
                GraphQL을 이용하여 밑의 유튜브 클론코딩을 재구현 하였으며,
                <br></br>구글 소셜로그인과 이메일 인증 기능 추가
              </P>
            </Container>
          </Link>
        </Layout>
        <Layout>
          <Link
            to={"/portfolios/youtube-restful"}
            style={{ textDecoration: "none" }}
          >
            <Container>
              <H2>Youtube clone coding (Backend, Restful)</H2>
              <P>
                REST api를 이용하여 Backend 및 Database서버들을 구축하고
                <br></br> AWS를 이용한 비디오 업로드등 다양한 기능들 구현
              </P>
            </Container>
          </Link>
        </Layout>
        <H1>Practice</H1>
        <Layout>
          <Link
            to={"/portfolios/oop-practice"}
            style={{ textDecoration: "none" }}
          >
            <Container>
              <H2>타입스크립트를 이용한 객체 지향 프로그래밍(연습)</H2>
              <P>
                타입스크립트와 함께 객체지향 프로그래밍을 이용하여 <br></br>
                간단한 코딩 연습
              </P>
            </Container>
          </Link>
        </Layout>
      </Contents>
    </BigContainer>
  );
}
