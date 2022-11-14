const Model = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}


model User{
  id Int @default(autoincrement()) @id
  // unique속성과 자동오름 속성 부여

  password String?
  // 소셜로그인을 할경우 password는 필요없게되므로 "?"optional 옵션 부여

  email String @unique
  // unique속성 부여함으로써 소셜로그인과 일반로그인시 같은계정이 되도록 설정

  avatar String?
  firstName String
  lastName String?
  socialLogin Boolean @default(false)
  // 디폴트값은 false, 소셜로그인시 true로 변경

  verified VerificationCode? 
  // one to one 관계형성, Mailgun의 인증코드 등록 및 인증완료 여부 설정
  // 소셜로그인시 Mailgun 인증은 필요없어지므로 optional 옵션 부여

  chennel Chennel?
  videos Video[]
  // 사용자가 올린 비디오들과 one to many 관계형성

  comment Comment[]
  videoLikes VideoLikes[] @relation("videoLikes")
  // 사용자가 like한 비디오들과 many to many 관계 형성

  commentLikes CommentLikes[] @relation("commentLikes")
  // 사용자가 like한 댓글들과 many to many 관계 형성

  createdAt DateTime @default(now())
  // 유저가 생성된 현재시간을 디폴트로 설정

  updatedAt DateTime @updatedAt
  // 유저정보가 업데이트 될때의 현재시간으로 업데이트됨
}

model VerificationCode{
  id Int @default(autoincrement()) @id
  code String @unique
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId Int @unique
  // 관계된 유저의 id로 one to one 관계형성
  // onDelete:Cascade로 유저계정 삭제시 관계된 VerificationCode도 자동삭제

  verified Boolean @default(false)
  // 디폴트값은 false로 Mailgun을 통한 인증 완료시 true로 변경

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Chennel{
  id Int @default(autoincrement()) @id
  chennelName String @unique
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId Int @unique
  // 생성한 유저와 one to one 관계형성

  //----------  이하 설정값들은 모두 비슷하거나 같음 ----------//
  videos Video[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Video{
  id Int @default(autoincrement()) @id
  videoName String 
  description String
  video String
  views Int @default(0)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId Int
  chennel Chennel @relation(fields: [chennelId],references: [id], onDelete: Cascade)
  chennelId Int
  hashtags Hashtag[]
  comment Comment[]
  videoLikes VideoLikes?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

}

model Hashtag{
  id Int @default(autoincrement()) @id
  hashtag String @unique
  videos Video[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Comment{
  id Int @default(autoincrement()) @id
  comment String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId Int
  video Video @relation(fields: [videoId], references: [id], onDelete: Cascade)
  videoId Int
  commentLikes CommentLikes?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model VideoLikes{
  id Int @default(autoincrement()) @id
  video Video @relation(fields: [videoId], references: [id], onDelete: Cascade)
  videoId Int @unique
  users User[] @relation("videoLikes")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model CommentLikes{
  id Int @default(autoincrement()) @id
  comment Comment @relation(fields: [commentId], references: [id], onDelete: Cascade)
  commentId Int @unique
  users User[] @relation("commentLikes")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`;

export default Model;
