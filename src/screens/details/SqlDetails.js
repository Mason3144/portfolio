import { Layout } from "../components";
import styled from "styled-components";
import { columnControl, tableControl } from "./sqlDetails/ddl";
import { controlRow, selectRow } from "./sqlDetails/dml";
import SqlForm from "../SqlForm";

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

export default function SqlDetails() {
  return (
    <DetailsLayout>
      <DetailNav>
        <Details>Details</Details>
        <Layer />
        <DetailLink href="#DDL(Data Define Language) 데이터 정의어">
          DDL
        </DetailLink>
        <DetailLink href="#DML(Data Manipulation Language) 데이터 조작어">
          DML
        </DetailLink>
      </DetailNav>
      <div>
        <TitleDiv>
          <H3>Details</H3>
          <span>
            (글자수를 최소화하기위해 음씀체를 사용하였습니다. 양해부탁드려요😊)
          </span>
        </TitleDiv>
        <SqlForm
          title="DDL(Data Define Language) 데이터 정의어"
          text1={tableControl}
          text2={columnControl}
        ></SqlForm>
        <SqlForm
          title="DML(Data Manipulation Language) 데이터 조작어"
          text1={controlRow}
          text2={selectRow}
        ></SqlForm>
      </div>
    </DetailsLayout>
  );
}
