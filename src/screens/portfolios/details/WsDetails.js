import { Layout } from "../../components/components";
import styled from "styled-components";
import ContentsForm from "../../components/ContentsForm";
import NoGitForm from "../../components/NoGitForm";
import { frontend, stunServer, wsBackend } from "./wsDetails/Configuration";
import { offerBack, offerFront } from "./wsDetails/Offer";
import { iceFront, iceBack } from "./wsDetails/Icecandidate";

import {
  answerBack,
  answerFrontGuest,
  answerFrontHost,
} from "./wsDetails/Answer";
const DetailsLayout = styled(Layout)`
  width: 1000px;
`;
const H3 = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 10px;
`;
const TitleDiv = styled.div`
  display: flex;
  align-items: center;
`;
const DetailNav = styled.div`
  position: fixed;
  top: 20%;
  right: 12%;
  background-color: rgb(34, 34, 34);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  color: white;
`;
const DetailLink = styled.a`
  color: white;
  text-decoration: none;
  margin: 10px;
`;
const Layer = styled.div`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 5px 0 5px 0;
`;
const Details = styled.span`
  font-size: 20px;
  margin: 10px;
`;

export default function WsDetails() {
  return (
    <DetailsLayout>
      <DetailNav>
        <Details>Details</Details>
        <Layer />
        <DetailLink href="#Websocket 및 RTC 초기 설정 그리고 룸 생성 및 참여">
          초기설정
        </DetailLink>
        <DetailLink href="#RTC를 위한 offer 생성 및 전달(호스트 사이드)">
          RTC offer
        </DetailLink>
        <DetailLink href="#RTC를 위한 answer 생성 및 전달(게스트 사이드)">
          RTC answer
        </DetailLink>
        <DetailLink href="#RTC를 위한 ice candidate 생성 및 교환">
          RTC ice candidate
        </DetailLink>
      </DetailNav>
      <div>
        <TitleDiv>
          <H3>Details</H3>
          <span>
            (글자수를 최소화하기위해 음씀체를 사용하였습니다. 양해부탁드려요😊)
          </span>
        </TitleDiv>
        <ContentsForm
          title="Websocket 및 RTC 초기 설정 그리고 룸 생성 및 참여"
          url1={
            "https://github.com/Mason3144/zoom-clone/blob/master/src/public/js/app.js"
          }
          text1={frontend}
          url2={
            "https://github.com/Mason3144/zoom-clone/blob/master/src/public/js/app.js"
          }
          text2={stunServer}
          url3={
            "https://github.com/Mason3144/zoom-clone/blob/master/src/server.js"
          }
          text3={wsBackend}
        ></ContentsForm>
        <NoGitForm
          title="RTC를 위한 offer 생성 및 전달(호스트 사이드)"
          text1={offerFront}
          text2={offerBack}
        ></NoGitForm>
        <NoGitForm
          title="RTC를 위한 answer 생성 및 전달(게스트 사이드)"
          text1={answerFrontGuest}
          text2={answerBack}
          text3={answerFrontHost}
        ></NoGitForm>
        <NoGitForm
          title="RTC를 위한 ice candidate 생성 및 교환"
          text1={iceFront}
          text2={iceBack}
        ></NoGitForm>
      </div>
    </DetailsLayout>
  );
}
