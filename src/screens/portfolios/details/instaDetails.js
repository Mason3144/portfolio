import { Layout } from "../../components/components";
import styled from "styled-components";
import createAccount from "./instaDetails/createAccount";
import logIn from "./instaDetails/logIn";
import { Authentication, serverConfig } from "./instaDetails/Authentication";
import { editProfile, typeDefs, upload } from "./instaDetails/EditProfile";
import ContentsForm from "../../components/ContentsForm";
import { UploadSetup } from "./instaDetails/UploadSetup";
import SearchUser from "./instaDetails/SearchUser";
import Comment from "./instaDetails/Comment";
import Follow from "./instaDetails/Follow";
import { PubSub, Subscription } from "./instaDetails/Subscription";
import { RoomUpdates, SendMessage } from "./instaDetails/Realtime";
import Model from "./instaDetails/Model";
import ComputedFiled from "./instaDetails/ComputedField";

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

export default function InstaDetails() {
  return (
    <DetailsLayout>
      <DetailNav>
        <Details>Details</Details>
        <Layer />
        <DetailLink href="#모델생성">모델생성</DetailLink>
        <DetailLink href="#유저생성">유저생성</DetailLink>
        <DetailLink href="#로그인">로그인</DetailLink>
        <DetailLink href="#유저인증">유저인증</DetailLink>
        <DetailLink href="#Express server(GraphQl upload를 위한) 설정">
          Express
        </DetailLink>
        <DetailLink href="#Profile 변경(AWS S3를 이용한 파일 업로드)">
          Profile(Upload)
        </DetailLink>
        <DetailLink href="#유저 찾기(cursor pagination)">유저찾기</DetailLink>
        <DetailLink href="#Comment (offset pagination)">Comment</DetailLink>
        <DetailLink href="#Follow">Follow</DetailLink>
        <DetailLink href="#Subscriptions(실시간 업데이트 서버)">
          Subscriptions
        </DetailLink>
        <DetailLink href="#실시간 채팅">실시간 채팅</DetailLink>
        <DetailLink href="#유저 Computed Field">Computed Field</DetailLink>
      </DetailNav>
      <div>
        <TitleDiv>
          <H3>Details</H3>
        </TitleDiv>
        <ContentsForm
          title="모델생성"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/prisma/schema.prisma"
          }
          text1={Model}
        ></ContentsForm>
        <ContentsForm
          title="유저생성"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/createAccount/createAccount.resolvers.ts"
          }
          text1={createAccount}
        ></ContentsForm>
        <ContentsForm
          title="로그인"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/login/login.resolvers.ts"
          }
          text1={logIn}
        ></ContentsForm>
        <ContentsForm
          title="유저인증"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/server.ts"
          }
          text1={serverConfig}
          url2={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/users.utils.ts"
          }
          text2={Authentication}
        ></ContentsForm>
        <ContentsForm
          title="Express server(GraphQl upload를 위한) 설정"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/commit/52a7a33aa55aa2d0ca4fa522c8a8a6db1253b21c"
          }
          text1={UploadSetup}
        ></ContentsForm>

        <ContentsForm
          title="Profile 변경(AWS S3를 이용한 파일 업로드)"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/editProfile/editProfile.resolvers.ts"
          }
          text1={editProfile}
          url2={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/shared/shared.utils.ts"
          }
          text2={upload}
          text3={typeDefs}
          url3={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/editProfile/editProfile.typeDefs.ts"
          }
        ></ContentsForm>

        <ContentsForm
          title="유저 찾기(cursor pagination)"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/searchUsers/searchUsers.resolvers.ts"
          }
          text1={SearchUser}
        ></ContentsForm>

        <ContentsForm
          title="Comment (offset pagination)"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/comments/seePhotoComments/seePhotoComments.resolvers.ts"
          }
          text1={Comment}
        ></ContentsForm>
        <ContentsForm
          title="Follow"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/followUser/followUser.resolvers.ts"
          }
          text1={Follow}
        ></ContentsForm>
        <ContentsForm
          title="Subscriptions(실시간 업데이트 서버)"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/server.ts"
          }
          text1={Subscription}
          url2={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/pubsub.ts"
          }
          text2={PubSub}
        ></ContentsForm>
        <ContentsForm
          title="실시간 채팅"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/messages/sendMessage/sendMessage.resolvers.ts"
          }
          text1={SendMessage}
          url2={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/messages/roomUpdates/roomUpdates.resolvers.ts"
          }
          text2={RoomUpdates}
        ></ContentsForm>
        <ContentsForm
          title="유저 Computed Field"
          url1={
            "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/users.resolvers.ts"
          }
          text1={ComputedFiled}
        ></ContentsForm>
      </div>
    </DetailsLayout>
  );
}
