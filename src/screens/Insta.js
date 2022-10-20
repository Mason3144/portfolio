import styled from "styled-components";
import { Layout } from "./components";
import Header from "./Header";
import QRcode from "../assets/InstaCloneQR.png";

const BigContainer = styled.div``;
const Container = styled.div``;
const Span = styled.span`
  margin-left: 15px;
  background-color: rgb(39, 40, 34);
  color: rgb(248, 248, 242);
  padding: 10px;
  border-radius: 4px;
`;
const Div = styled.div`
  margin-bottom: 30px;
`;
const Img = styled.img`
  margin-left: 15px;
`;
const P = styled.p``;
const GitSpan = styled.span`
  margin-left: 15px;
`;

export default function Insta() {
  return (
    <BigContainer>
      <Header></Header>
      <Layout>
        <Container>
          <h1>Instagram clone coding (IOS)</h1>
        </Container>
      </Layout>
      <Layout>
        <Container>
          <Div>
            <h3>Backend</h3>
            <P>
              Node.js, Apollo, Graphql, Postgre, Prisma, Typescript를 이용하여
              백엔드 및 DB구축
            </P>
            <a
              href={"https://github.com/Mason3144/insta-clone-backend"}
              target="_blank"
              rel="noreferrer"
            >
              <GitSpan>
                https://github.com/Mason3144/insta-clone-backend
              </GitSpan>
            </a>
          </Div>
          <Div>
            <h3>Frontend</h3>
            <P>
              React native, Expo, Apollo client를 이용하여 프론트엔드 서버 구축
            </P>
            <a
              href={"https://github.com/Mason3144/insta-clone-backend"}
              target="_blank"
              rel="noreferrer"
            >
              <GitSpan>
                https://github.com/Mason3144/insta-clone-frontend
              </GitSpan>
            </a>
          </Div>
          <Div>
            <h3>Features</h3>
            <P>User, Photo, Comment의 CRUD서비스 </P>
            <P>Token을 이용하여 User authentication 구현 </P>
            <P>Websocket server를 이용한 direct Message</P>
            <P>AWS S3를 이용하여 파일 업로드 Heroku와 Expo를 이용하여 배포</P>
          </Div>
        </Container>
      </Layout>
      <Layout>
        <Container>
          <h3>Instruction</h3>
          <P>1) App store에서 "Expo go"를 설치해주세요(IOS 전용).</P>
          <P>2) "Expo go"의 테스터 계정으로 로그인해주세요.</P>
          <Span>Username: test.acc</Span>
          <Span>Password: wg2BTVhRxW</Span>
          <P>3-1) 카메라를 이용하여 아래의 QR코드를 스캔해주시거나</P>
          <Img src={QRcode} width="200" />
          <P>3-2) 아래의 링크를 이용해 주세요</P>
          <Span>
            exp://exp.host/@x121212/insta-clone-native?release-channel=default
          </Span>

          <P style={{ marginTop: 50 }}>
            처음 회원가입하시면 Master계정과 자동으로 follow되어있습니다.
          </P>
          <P>
            Photo업로드, Direct Message, Profile변경 등 많은 기능들을
            이용해주세요.
          </P>
        </Container>
      </Layout>
    </BigContainer>
  );
}
