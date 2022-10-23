import { Layout } from "../components";
import styled from "styled-components";
import createAccount from "./instaDetails/createAccount";
import logIn from "./instaDetails/logIn";
import { Authentication, serverConfig } from "./instaDetails/Authentication";
import { editProfile, typeDefs, upload } from "./instaDetails/EditProfile";
import ContentsForm from "../ContentsForm";
import { UploadSetup } from "./instaDetails/UploadSetup";
import SearchUser from "./instaDetails/SearchUser";
import Comment from "./instaDetails/Comment";
import Follow from "./instaDetails/Follow";
import { PubSub, Subscription } from "./instaDetails/Subscription";
import { RoomUpdates, SendMessage } from "./instaDetails/Realtime";

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

export default function InstaDetails() {
  return (
    <DetailsLayout>
      <div>
        <TitleDiv>
          <H3>Details</H3>
          <span>
            (글자수를 최소화하기위해 음씀체를 사용하였습니다. 양해부탁드려요😊)
          </span>
        </TitleDiv>

        <ContentsForm
          title="유저 생성"
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
      </div>
    </DetailsLayout>
  );
}
