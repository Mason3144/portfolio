import styled from "styled-components";
import { Layout } from "../components/components";
import Header from "../components/Header";
import Nav from "../components/Nav";
import WsDetails from "../portfolios/details/WsDetails";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const GitSpan = styled.span``;
const GitLink = styled.div`
  display: flex;
  align-items: center;
`;

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

export default function Websocket() {
  return (
    <BigContainer>
      <Header></Header>
      <Nav />
      <Contents>
        <Layout>
          <Container>
            <H1>Websocket을 이용한 실시간 채팅</H1>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <Div>
              <H3>Tech stack</H3>
              <P>
                Express, SocketIO, WebRTC를 이용하여 WS서버 및 P2P통신 기능 구현
              </P>
              <a
                href={"https://github.com/Mason3144/zoom-clone"}
                target="_blank"
                rel="noreferrer"
              >
                <GitLink>
                  <FontAwesomeIcon
                    icon={faSquareGithub}
                    color="black"
                    style={{ fontSize: 25, margin: 10 }}
                  />
                  <GitSpan>https://github.com/Mason3144/zoom-clone</GitSpan>
                </GitLink>
              </a>
            </Div>
            <Div>
              <H3>Details</H3>
              <P>SocketIO의 emit, on, join, to의 활용</P>
              <P>RTC를 위한 offer, answer, ice candidate의 생성 및 교환</P>
            </Div>
          </Container>
        </Layout>
        <WsDetails />
      </Contents>
    </BigContainer>
  );
}
