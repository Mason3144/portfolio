import { Layout } from "../components";
import styled from "styled-components";
import ContentsForm from "../ContentsForm";
import Model from "./youtubeDetails/Model";
import CreateAccount from "./youtubeDetails/CreateAccount";
import {
  EmailVerification,
  VerifyEmail,
} from "./youtubeDetails/EmailVerification";
import Mailgun from "../../assets/youtubeClone/MailgunCapture.png";
import GoogleLogin from "./youtubeDetails/GoogleLogin";
import Login from "./youtubeDetails/Login";
import {
  ServerContext,
  UserAthentication,
} from "./youtubeDetails/UserAthentication";
import { Express, typeDefs } from "./youtubeDetails/Express";
import { UploadS3, UploadVideo } from "./youtubeDetails/Upload";
import Hashtag from "./youtubeDetails/Hashtag";
import { DeleteS3, DeleteVideo } from "./youtubeDetails/DeleteVideo";
import VideoLike from "./youtubeDetails/VideoLike";
import ComputedField from "./youtubeDetails/ComputedField";

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

export default function YoutubeDetails() {
  return (
    <DetailsLayout>
      <DetailNav>
        <Details>Details</Details>
        <Layer />
        <DetailLink href="#모델생성">모델생성</DetailLink>
        <DetailLink href="#계정생성">계정생성</DetailLink>
        <DetailLink href="#Email 인증(Mailgun)">Mailgun</DetailLink>
        <DetailLink href="#소셜 로그인(Google OAuth)">Google OAuth</DetailLink>
        <DetailLink href="#로그인">로그인</DetailLink>
        <DetailLink href="#로그인유저 인증">유저 인증</DetailLink>
        <DetailLink href="#Express server(GraphQl upload를 위한) 설정">
          Express
        </DetailLink>
        <DetailLink href="#Video 업로드(AWS S3를 이용한 파일 업로드)">
          비디오 업로드
        </DetailLink>
        <DetailLink href="#해쉬태그">해쉬태그</DetailLink>
        <DetailLink href="#Video 삭제(AWS S3에서의 파일 삭제)">
          비디오 삭제
        </DetailLink>
        <DetailLink href="#비디오 Like">Like</DetailLink>
        <DetailLink href="#비디오 Computed Field">Computed Filed</DetailLink>
      </DetailNav>
      <div>
        <TitleDiv>
          <H3>Details</H3>
          <span>
            (글자수를 최소화하기위해 음씀체를 사용하였습니다. 양해부탁드려요😊)
          </span>
        </TitleDiv>
        <ContentsForm
          title="모델생성"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/prisma/schema.prisma"
          }
          text1={Model}
        ></ContentsForm>
        <ContentsForm
          title="계정생성"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/users/createAccount/createAccount.resolvers.ts"
          }
          text1={CreateAccount}
        ></ContentsForm>
        <ContentsForm
          title="Email 인증(Mailgun)"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/users/users.utils.ts"
          }
          text1={EmailVerification}
          capture1={Mailgun}
          url2={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/users/verifyEmail/verifyEmail.resolvers.ts"
          }
          text2={VerifyEmail}
        ></ContentsForm>
        <ContentsForm
          title="소셜 로그인(Google OAuth)"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/users/googleLogin/googleLogin.resolvers.ts"
          }
          text1={GoogleLogin}
        ></ContentsForm>
        <ContentsForm
          title="로그인"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/users/login/login.resolvers.ts"
          }
          text1={Login}
        ></ContentsForm>
        <ContentsForm
          title="로그인유저 인증"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/server.ts"
          }
          text1={ServerContext}
          url2={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/users/users.utils.ts"
          }
          text2={UserAthentication}
        ></ContentsForm>
        <ContentsForm
          title="Express server(GraphQl upload를 위한) 설정"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/server.ts"
          }
          text1={Express}
          url2={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/videos/createVideo/createVideo.typeDefs.ts"
          }
          text2={typeDefs}
        ></ContentsForm>
        <ContentsForm
          title="Video 업로드(AWS S3를 이용한 파일 업로드)"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/videos/createVideo/createVideo.resolvers.ts"
          }
          text1={UploadVideo}
          url2={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/shared/shared.uploads.ts"
          }
          text2={UploadS3}
        ></ContentsForm>
        <ContentsForm
          title="해쉬태그"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/videos/videos.utils.ts"
          }
          text1={Hashtag}
        ></ContentsForm>
        <ContentsForm
          title="Video 삭제(AWS S3에서의 파일 삭제)"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/videos/deleteVideo/deleteVideo.resolvers.ts"
          }
          text1={DeleteVideo}
          url2={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/shared/shared.uploads.ts"
          }
          text2={DeleteS3}
        ></ContentsForm>
        <ContentsForm
          title="비디오 Like"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/likes/videoLikes/videoLikes.resolvers.ts"
          }
          text1={VideoLike}
        ></ContentsForm>
        <ContentsForm
          title="비디오 Computed Field"
          url1={
            "https://github.com/Mason3144/wetube-graphgl/blob/master/src/videos/videos.resolvers.ts"
          }
          text1={ComputedField}
        ></ContentsForm>
      </div>
    </DetailsLayout>
  );
}
