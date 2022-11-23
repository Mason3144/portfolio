import styled from "styled-components";
import { Layout } from "./components/components";
import Header from "./components/Header";
import photo from "../assets/home/photo.jpg";
import Nav from "./components/Nav";

const BigContainer = styled.div`
  flex-direction: column;
`;
const Container = styled.div``;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;
const H2 = styled.h2`
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
  font-size: 30px;
  margin: 10px;
`;

const Layouts = styled(Layout)`
  justify-content: flex-start;
`;
const Img = styled.img`
  width: 150px;
  border-radius: 50%;
`;
const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;
const GreetingDiv = styled.div``;

const Ul = styled.ul`
  margin: 30px 0 0 20px;
`;
const Li = styled.li`
  list-style-type: circle;
  color: black;
  margin: 5px;
  line-height: 20px;
`;

const ContactSpan = styled.span`
  font-size: 18px;
  background-color: #f28b85;
  border-radius: 5px;
`;
const Span = styled.span`
  margin-top: 10px;
  font-size: 18px;
`;
const ContactDiv = styled.div`
  margin-top: 10px;
`;
const SkillsDiv = styled.div`
  margin: 10px 0 30px 0;
`;
const SkillsSpan = styled.span`
  background-color: #99d8f4;
  border-radius: 5px;
  padding: 2px;
  margin: 0 0 20px 10px;
`;
const SkillsUl = styled.ul`
  margin-bottom: 10px;
  font-size: 20px;
`;
export default function Home() {
  return (
    <BigContainer>
      <Header></Header>
      <Nav />
      <Contents>
        <Layouts>
          <Container>
            <H2>About Me</H2>
            <PhotoDiv>
              <Img src={photo}></Img>
              <GreetingDiv>
                <Ul>
                  <Li>안녕하세요! 신입 개발자 이태섭입니다.</Li>
                  <Li>
                    목표를 성취하는것을 좋아하고 <br></br>
                    꾸준히 노력하는것을 즐깁니다.
                  </Li>
                  <Li>
                    호기심이 생기면 계속해서 알아보고 <br></br>
                    새로운것에 대한 두려움이나 망설임이 없는 <br></br>
                    개발자입니다.
                  </Li>
                </Ul>
              </GreetingDiv>
            </PhotoDiv>
            <H2>Contact</H2>
            <Div>
              <ContactDiv>
                <ContactSpan>Phone:</ContactSpan>
                <Span> 010.5008.3144</Span>
              </ContactDiv>
              <ContactDiv>
                <ContactSpan>Email:</ContactSpan>
                <Span> lts890303@gmail.com </Span>
              </ContactDiv>

              <ContactDiv>
                <ContactSpan>Github:</ContactSpan>
                <a
                  href="https://github.com/Mason3144/"
                  style={{ color: "black" }}
                >
                  <Span> https://github.com/Mason3144/</Span>
                </a>
              </ContactDiv>
            </Div>
            <H2>Overseas Activity & Language</H2>
            <Div>
              <Span>영어-IELTS 6.5</Span>
              <Span>캐나다 2년거주</Span>
              <Span>호주 4년거주</Span>
            </Div>
          </Container>
        </Layouts>
        <Layouts>
          <Container>
            <H2>Skills</H2>
            <SkillsDiv>
              <SkillsUl>Backend:</SkillsUl>
              <SkillsSpan>Node.js</SkillsSpan>,<SkillsSpan>Express</SkillsSpan>,
              <SkillsSpan>Typescript</SkillsSpan>
            </SkillsDiv>
            <SkillsDiv>
              <SkillsUl>API:</SkillsUl> <SkillsSpan>REST</SkillsSpan>,
              <SkillsSpan>GraphQL</SkillsSpan>
            </SkillsDiv>
            <SkillsDiv>
              <SkillsUl>DB:</SkillsUl><SkillsSpan>Mysql</SkillsSpan> <SkillsSpan>Postigre SQL</SkillsSpan>,
              <SkillsSpan>Prisma</SkillsSpan>
            </SkillsDiv>
            <SkillsDiv>
              <SkillsUl>Frontend:</SkillsUl>
              <SkillsSpan>ES6</SkillsSpan>,<SkillsSpan>React</SkillsSpan>
            </SkillsDiv>
            <H2>Editor</H2>
            <Span>VS code, WSL Ubuntu </Span>
          </Container>
        </Layouts>
      </Contents>
    </BigContainer>
  );
}
