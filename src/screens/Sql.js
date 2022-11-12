import styled from "styled-components";
import { Layout } from "./components";
import Header from "./Header";
import Nav from "./Nav";
import SqlDetails from "./details/SqlDetails";
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

export default function Sql() {
  return (
    <BigContainer>
      <Header></Header>
      <Nav />
      <Contents>
        <Layout>
          <Container>
            <H1>SQL Query 문법(연습)</H1>
          </Container>
        </Layout>
        <Layout>
          <Container>
            <Div>
              <H3>Tech stack</H3>
              <P>SQL Query</P>
            </Div>
            <Div>
              <H3>Details</H3>
              <P>DDL 데이터 정의어(CREATE, ALTER, DROP)</P>
              <P>DML 데이터조작어(SELECT,INSERT,UPDATE,DELETE)</P>
            </Div>
          </Container>
        </Layout>
        <SqlDetails />
      </Contents>
    </BigContainer>
  );
}
