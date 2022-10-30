import { Layout } from "../components";
import styled from "styled-components";
import ContentsForm from "../ContentsForm";
import BlockChain from "./typeDetails/blockChain";
import { managerTicket, passengerTicket } from "./typeDetails/trainTicket";
import { Customer, Manager } from "./typeDetails/kiosk";

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

export default function TypeDetails() {
  return (
    <DetailsLayout>
      <DetailNav>
        <Details>Details</Details>
        <Layer />
        <DetailLink href="#Kiosk 기능구현">Kiosk</DetailLink>
        <DetailLink href="#간단한 블록체인 기능 구현">블록체인</DetailLink>
        <DetailLink href="#자동 기차 승차권 판매 기능 구현">
          승차권발급
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
          title="Kiosk 기능구현"
          url1={
            "https://github.com/Mason3144/typescript-practice/blob/master/src/kiosk.ts"
          }
          text1={Manager}
          url2={
            "https://github.com/Mason3144/typescript-practice/blob/master/src/kiosk.ts"
          }
          text2={Customer}
        ></ContentsForm>
        <ContentsForm
          title="간단한 블록체인 기능 구현"
          url1={
            "https://github.com/Mason3144/typescript-practice/blob/master/src/blockchain.ts"
          }
          text1={BlockChain}
        ></ContentsForm>
        <ContentsForm
          title="자동 기차 승차권 판매 기능 구현"
          url1={
            "https://github.com/Mason3144/typescript-practice/blob/master/src/trainTickets.ts"
          }
          text1={managerTicket}
          url2={
            "https://github.com/Mason3144/typescript-practice/blob/master/src/trainTickets.ts"
          }
          text2={passengerTicket}
        ></ContentsForm>
      </div>
    </DetailsLayout>
  );
}
