import { Layout } from "../../components/components";
import styled from "styled-components";
import ContentsForm from "../../components/ContentsForm";
import NoGitForm from "../../components/NoGitForm";
import SqlForm from "../../components/SqlForm";
import {  passengerTicket } from "./typeDetails/trainTicket";
import { createTables, modules } from "./awsDetails/SQL";
import { s3 } from "./awsDetails/Aws-s3";
import { rds,sessionStore } from "./awsDetails/Aws-rds";
import { ec2, ec2Error } from "./awsDetails/Aws-ec2";
import {  crudCreate, crudDelete, crudEdit, crudRead } from "./awsDetails/crud";
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

export default function AwsDetails() {
  return (
    <DetailsLayout>
      <DetailNav>
        <Details>Details</Details>
        <Layer />
        <DetailLink href="#SQL 쿼리문">
          SQL문
        </DetailLink>
        <DetailLink href="#AWS-RDS와 Mysql-session-store">RDS</DetailLink>
        <DetailLink href="#AWS-S3, multer, multer-s3 설정">S3</DetailLink>
        <DetailLink href="#AWS-EC2 배포">
          EC2
        </DetailLink>
        <DetailLink href="#CRUD 서비스 구현">
          CRUD
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
          title="SQL 쿼리문"
          text1={createTables}
          text2={modules}
        ></SqlForm>
        <ContentsForm
          title="AWS-RDS와 Mysql-session-store"
          url1={
            "https://github.com/Mason3144/booking-manager-backend/blob/master/src/db.ts"
          }
          text1={rds}
          url2={
            "https://github.com/Mason3144/booking-manager-backend/blob/master/src/server.ts"
          }
          text2={sessionStore}
        ></ContentsForm>
        <ContentsForm
          title="AWS-S3, multer, multer-s3 설정"
          url1={
            "https://github.com/Mason3144/booking-manager-backend/blob/master/src/middlewares.ts"
          }
          text1={s3}
        ></ContentsForm>
        <NoGitForm
          title="AWS-EC2 배포"
          text1={ec2}
          text2={ec2Error}
        ></NoGitForm>
        <ContentsForm
          title="CRUD 서비스 구현"
          url1={
            "https://github.com/Mason3144/booking-manager-backend/blob/master/src/controllers/product/productApply.ts"
          }
          text1={crudCreate}
          url2={
            "https://github.com/Mason3144/booking-manager-backend/blob/master/src/controllers/product/product.ts"
          }
          text2={crudRead}
          url3={
            "https://github.com/Mason3144/booking-manager-backend/blob/master/src/controllers/product/productEdit.ts"
          }
          text3={crudEdit}
          url4={
            "https://github.com/Mason3144/booking-manager-backend/blob/master/src/controllers/product/productDelete.ts"
          }
          text4={crudDelete}
        ></ContentsForm>



      </div>
    </DetailsLayout>
  );
}
