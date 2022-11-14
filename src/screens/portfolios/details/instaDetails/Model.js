const Model = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id Int @id @default(autoincrement()) 
  // @id는 자동으로 unique속성이 추가되며 디폴트값으로 자동 증가옵션을 넣어줌

  firstName String
  lastName String?
  // lastname, bio, avatar 같은경우 "?"로 optional 옵션 부여

  username String @unique
  // username과 email은 unique속성 부여(@id와는 다르게 사용자가 지정할수 있음)

  email String @unique
  password String
  bio String?
  avatar String?
  photos Photo[]
  // 사용자가 올린 사진들과 one to many 관계형성

  likes Like[]
  comment Comment[]
  followers User[] @relation("FollowRelation")
  following User[] @relation("FollowRelation")
  //FollowRelation이라는 관계 형성, 팔로우시 자동으로 상대방의 팔로윙도 설정됨

  rooms Room[]
  message Message[]
  createdAt DateTime @default(now())
  // 시간 값으로 생성당시의 날짜 및 시간을 기본값으로 설정

  updatedAt DateTime @updatedAt
  // 업데이트가 될때마다 시간이 자동으로 업데이트됨
}


model Photo {
  id Int @id @default(autoincrement())
  user User @relation(fields: [userId],references: [id], onDelete: Cascade)
  userId Int
  // one to many relationship, 사진을올린 유저의 id로 관계를 형성하며
  // onDelete:Cascade 옵션으로 관계된 사용자정보가 삭제되면 모든 포토들도 같이 삭제

  file      String
  caption String?
  hashtags Hashtag[]
  // Hashtag와 many to many 관계형성

  //----------  이하 설정값들은 모두 비슷하거나 같음 ----------//
  likes Like[] 
  comment Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Hashtag{
  id Int @id @default(autoincrement())
  hashtag String @unique
  photos Photo[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Like{
  id Int @id @default(autoincrement())
  photo Photo @relation(fields: [photoId],references: [id],onDelete: Cascade)
  user User[]
  photoId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@unique([photoId])
}

model Comment {
  id Int @id @default(autoincrement())
  user User @relation(fields: [userId],references: [id])
  photo Photo @relation(fields: [photoId], references: [id],onDelete: Cascade)
  payload String
  photoId Int
  userId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Room{
  id Int @id @default(autoincrement())
  users User[]
  messages Message[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Message{
  id Int @id @default(autoincrement())
  payload String
  user User @relation(fields: [userId],references: [id])
  userId Int
  room Room @relation(fields: [roomId],references: [id],onDelete: Cascade)
  roomId Int
  read Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`;

export default Model;
