import { Layout } from "../../components/components";
import styled from "styled-components";
import ContentsForm from "../../components/ContentsForm";
import UserModel from "./youRestfulDetails/UserModel";
import {
  createUserControl,
  createUserRoute,
  publicFn,
} from "./youRestfulDetails/createUser";
import {
  LoginOut,
  LoginRouter,
  ProtectorMiddleware,
} from "./youRestfulDetails/Login";
import { PostUpload, S3, VideoUpload } from "./youRestfulDetails/VideoUpload";
import VideoEdit from "./youRestfulDetails/VideoEdit";
import VideoDelete from "./youRestfulDetails/VideoDelete";
import SocialLogin from "./youRestfulDetails/SocialLogin";

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

export default function YouRestfulDetail() {
  return (
    <DetailsLayout>
      <DetailNav>
        <Details>Details</Details>
        <Layer />
        <DetailLink href="#모델생성">모델생성</DetailLink>
        <DetailLink href="#유저생성">유저생성</DetailLink>
        <DetailLink href="#로그인/로그아웃">로그인/아웃</DetailLink>
        <DetailLink href="#소셜 로그인(Github)">소셜 로그인</DetailLink>
        <DetailLink href="#비디오생성">비디오 생성</DetailLink>
        <DetailLink href="#비디오 정보 수정">비디오 수정</DetailLink>
        <DetailLink href="#비디오 삭제">비디오 삭제</DetailLink>
      </DetailNav>
      <div>
        <TitleDiv>
          <H3>Details</H3>
        </TitleDiv>
        <ContentsForm
          title="모델생성"
          url1={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/models/User.js"
          }
          text1={UserModel}
        ></ContentsForm>
        <ContentsForm
          title="유저생성"
          url1={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/routers/rootRouter.js"
          }
          text1={createUserRoute}
          url2={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/middlewares.js"
          }
          text2={publicFn}
          url3={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/Controller/userController.js"
          }
          text3={createUserControl}
        ></ContentsForm>
        <ContentsForm
          title="로그인/로그아웃"
          url1={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/routers/userRouter.js"
          }
          text1={LoginRouter}
          url2={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/middlewares.js"
          }
          text2={ProtectorMiddleware}
          url3={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/Controller/userController.js"
          }
          text3={LoginOut}
        ></ContentsForm>
        <ContentsForm
          title="소셜 로그인(Github)"
          url1={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/Controller/userController.js"
          }
          text1={SocialLogin}
        ></ContentsForm>
        <ContentsForm
          title="비디오생성"
          url1={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/routers/videoRouter.js"
          }
          text1={VideoUpload}
          url2={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/middlewares.js"
          }
          text2={S3}
          url3={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/Controller/videoController.js"
          }
          text3={PostUpload}
        ></ContentsForm>
        <ContentsForm
          title="비디오 정보 수정"
          url1={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/Controller/videoController.js"
          }
          text1={VideoEdit}
        ></ContentsForm>
        <ContentsForm
          title="비디오 삭제"
          url1={
            "https://github.com/Mason3144/wetube-reloaded/blob/master/src/Controller/videoController.js"
          }
          text1={VideoDelete}
        ></ContentsForm>
      </div>
    </DetailsLayout>
  );
}
