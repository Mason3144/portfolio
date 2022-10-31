import styled from "styled-components";
import { Layout } from "./components";
import Header from "./Header";
import Nav from "./Nav";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import YouRestfulDetail from "./details/YouRestfulDetail";
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

export default function YouRestful() {
  return (
    <BigContainer>
      <Header></Header>
      <Nav />
      <Contents>
        <Layout>
          <Container>
            <H1>Youtube clone coding</H1>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <Div>
              <H3>Backend</H3>
              <P>
                Node.js, Restful, MongoDB, Mongoose, ES6, AWS S3를 이용하여
                백엔드 및 DB구축
              </P>
              <a
                href={"https://github.com/Mason3144/wetube-reloaded"}
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
                    https://github.com/Mason3144/wetube-reloaded
                  </GitSpan>
                </GitLink>
              </a>
            </Div>
            <Div>
              <H3>Features</H3>
              <P>Mongoose를 사용하여 모델생성 및 관계형성</P>
              <P>Restful API를 이용하여 CRUD서비스 구현</P>
              <P>AWS S3를 이용하여 비디오 및 유저 사진 업로드</P>
              <P>Bcrypt를 사용하여 password 암호화</P>
            </Div>
          </Container>
        </Layout>
        <YouRestfulDetail />
      </Contents>
    </BigContainer>
  );
}