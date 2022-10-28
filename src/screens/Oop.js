import styled from "styled-components";
import { Layout } from "./components";
import Header from "./Header";
import Nav from "./Nav";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TypeDetails from "./details/typeDetails";
const BigContainer = styled.div``;
const Container = styled.div``;

const Div = styled.div`
  margin-bottom: 30px;
`;

const P = styled.p`
  font-size: 20px;
  line-height: 25px;
  margin: 5px;
`;
const GitSpan = styled.span``;
const Contents = styled.div``;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 30px;
`;
const H3 = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`;
const GitLink = styled.div`
  display: flex;
  align-items: center;
`;

export default function Oop() {
  return (
    <BigContainer>
      <Header></Header>
      <Nav />
      <Contents>
        <Layout>
          <Container>
            <H1>타입스크립트를 이용한 OOP(연습)</H1>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <Div>
              <H3>Tech stack</H3>
              <P>Typescript</P>
              <a
                href={"https://github.com/Mason3144/typescript-practice"}
                target="_blank"
                rel="noreferrer"
              >
                <GitLink>
                  <FontAwesomeIcon
                    icon={faSquareGithub}
                    color="black"
                    style={{ fontSize: 25, margin: 10 }}
                  />
                  <GitSpan>
                    https://github.com/Mason3144/typescript-practice
                  </GitSpan>
                </GitLink>
              </a>
            </Div>
            <Div>
              <H3>Features</H3>
              <P>간단한 블록체인 기능 구현</P>
              <P>자동 기차 승차권 판매 기능 구현</P>
            </Div>
          </Container>
        </Layout>
        <TypeDetails />
      </Contents>
    </BigContainer>
  );
}
