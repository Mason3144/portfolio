import styled from "styled-components";
import { Layout } from "../components/components";
import Header from "../components/Header";
import QRcode from "../../assets/instaClone/InstaCloneQR.png";
import welcome from "../../assets/instaClone/welcome.jpg";
import signUp from "../../assets/instaClone/signUp.jpg";
import feed from "../../assets/instaClone/feed.jpg";
import aChat from "../../assets/instaClone/aChat.jpg";
import Nav from "../components/Nav";
import InstaDetails from "../portfolios/details/instaDetails";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BigContainer = styled.div``;
const Container = styled.div``;
const Span = styled.span``;
const BlackDiv = styled.div`
  margin-left: 15px;
  background-color: rgb(39, 40, 34);
  color: rgb(248, 248, 242);
  padding: 10px;
  border-radius: 4px;
  line-height: 25px;
`;
const Div = styled.div`
  margin-bottom: 30px;
`;
const Img = styled.img`
  margin-left: 15px;
`;
const Screenshots = styled.img`
  padding: 10px;
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

export default function Insta() {
  return (
    <BigContainer>
      <Header></Header>
      <Nav />
      <Contents>
        <Layout>
          <Container>
            <H1>Instagram clone coding (IOS)</H1>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <Div>
              <H3>Backend</H3>
              <P>
                Node.js, Apollo, Graphql, Postgre, Prisma, Typescript, AWS S3를
                이용하여 백엔드 및 DB구축
              </P>
              <a
                href={"https://github.com/Mason3144/insta-clone-backend"}
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
                    https://github.com/Mason3144/insta-clone-backend
                  </GitSpan>
                </GitLink>
              </a>
            </Div>
            <Div>
              <H3>Frontend</H3>
              <P>
                React native, Expo, Apollo client를 이용하여 프론트엔드 서버
                구축
              </P>
              <a
                href={"https://github.com/Mason3144/insta-clone-native"}
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
                    https://github.com/Mason3144/insta-clone-native
                  </GitSpan>
                </GitLink>
              </a>
            </Div>
            <Div>
              <H3>Features</H3>
              <P>Prisma를 사용하여 모델생성 및 관계형성</P>
              <P>Mutation과 Query로 user, photo, comment의 CRUD 서비스 구현</P>
              <P>Bcrypt를 사용하여 password 암호화</P>
              <P>Token을 이용하여 user authentication 구현 </P>
              <P>Websocket server를 이용한 Direct Message</P>
              <P>AWS S3를 이용하여 파일 업로드 Heroku와 Expo를 이용하여 배포</P>
            </Div>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <H3>Instruction</H3>
            <P>1) App store에서 "Expo go"를 설치해주세요(IOS 전용).</P>
            <P>2) "Expo go"의 테스터 계정으로 로그인해주세요.</P>

            <BlackDiv>
              <Span>Username: test.acc</Span>
              <br />
              <Span>Password: wg2BTVhRxW</Span>
            </BlackDiv>
            <P>3-1) 카메라를 이용하여 아래의 QR코드를 스캔해주시거나</P>
            <Img src={QRcode} width="200" />
            <P>3-2) 아래의 링크를 이용해 주세요</P>
            <BlackDiv>
              <Span>
                exp://exp.host/@x121212/insta-clone-native?release-channel=default
              </Span>
            </BlackDiv>
            <P style={{ marginTop: 50 }}>
              처음 회원가입하시면 Master계정과 자동으로 follow되어있습니다.
            </P>
            <P>
              Photo업로드, Direct Message, Profile변경 등 많은 기능들을
              이용해주세요.
            </P>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <H3>Screenshots</H3>
            <Screenshots src={welcome} width="200" height="400"></Screenshots>
            <Screenshots src={signUp} width="200" height="400"></Screenshots>
            <Screenshots src={feed} width="200" height="400"></Screenshots>
            <Screenshots src={aChat} width="200" height="400"></Screenshots>
          </Container>
        </Layout>
        <InstaDetails />
      </Contents>
    </BigContainer>
  );
}
