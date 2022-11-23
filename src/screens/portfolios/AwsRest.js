import styled from "styled-components";
import { Layout } from "../components/components";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AwsDetails from "./details/AwsDetails";
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

export default function AwsRest() {
  return (
    <BigContainer>
      <Header></Header>
      <Nav />
      <Contents>
        <Layout>
          <Container>
            <H1>AWS를 이용한 Rest 서버구축</H1>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <Div>
              <H3>Tech stack</H3>
              <P>AWS-S3, RDS, EC2, Mysql, Express, Rest API</P>
              <a
                href={"https://github.com/Mason3144/booking-manager-backend"}
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
              <H3>Details</H3>
              <P>SQL문을 이용하여 DB서버와 접속</P>
              <P>AWS를 이용하여 백엔드 및 DB 클라우드 서버 배포</P>
              <P>Mysql session store를 이용한 유저 Authentication</P> 
              <P>Express와 Rest API를 이용하여 CRUD서비스 구현</P>
            </Div>
          </Container>
        </Layout>
        <AwsDetails />
      </Contents>
    </BigContainer>
  );
}
