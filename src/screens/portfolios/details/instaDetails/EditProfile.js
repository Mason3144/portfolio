export const editProfile = `import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import {
  handleDeletePhotoFromAWS,
  uploadToS3,
} from "../../shared/shared.utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: async (
      _,
      {
        firstName,
        lastName,
        username,
        email,
        password: newPassword,
        bio,
        avatar,
      },
      { loggedInUser, protectResolver, client }
      // 유저인증에서 등록한 context를 받음
    ) => {
      try {
        protectResolver(loggedInUser);
        // 유저인증을 통해 현재 로그인 되있는지 체크후

        let avatarUrl = null;
        if (avatar) {
          const user = await client.user.findUnique({
            where: { id: loggedInUser.id },
            select: { avatar: true },
          }); // 만약 argument를 통해 유저가 avatar를 보내왓다면 유저를 찾은후

          if (user.avatar) {
            await handleDeletePhotoFromAWS(user.avatar);
          } // 유저에게 과거에 avatar를 등록했을경우 위의 함수 호출(하단에 설명)

          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
        } // 유저에게받은 avatar파일, 유저id 그리고 S3서버의 폴더 경로를 위한 "avatars"와 함께 upload함수 호출
          // (Post의 사진과 Profile의 사진을 분류하기위해 폴더경로를 다르게 지정해줌) 
        // 과거 avatar 유무에 상관없이 upload 함수 호출 후 리턴값을 가변변수에 저장


        let hash = null;
        if (newPassword) {
          if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d#?!@$%^&*-]{8,}$/.test(
              newPassword
            ) // 유저생성때와 같이 password validation 설정
          ) {
            return {
              ok: false,
              error:
                "Password must be more than 7 characters, at least one letter and one number",
            };
          }
          hash = await bcrypt.hash(newPassword, 10);
        } // 유저생성때와 마찬가지로 Bycript를 이용하여 암호화한후 가변변수에 저장

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(hash && { password: hash }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        }); // PrismaClient의 update를 이용하여 avatar와 password를 제외한 argument들은 바로 업데이트되도록 하고
            // avatar와 password는 위의 가변변수의 유무에 따라 업데이트
        
        if (!updatedUser.id) {
          return { ok: false, error: "Could not update" };
        }
        return { ok: true, user: updatedUser };
        // 성공여부 확인후 ok:boolean과 user정보를 return
        // 프론트엔드에서 return된 user정보를 이용하여 업데이트된 profile을 바로 refetch 시켜줌

      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
`;

export const typeDefs =
  `import { gql } from "apollo-server";

export default gql` +
  "`" +
  `
  scalar Upload // GraphQL 업로드를 위해 scalar 추가

  type EditProfileResponse {
    user: User
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): EditProfileResponse
  }
` +
  "`" +
  `;
`;

export const upload =
  `import * as AWS from "aws-sdk";

const Bucket = "insta-clone-2022";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
}); // AWS S3 생성후 받은 accessKey와 secretKey 설정

const s3 = new AWS.S3();

export const uploadToS3 = async (
  file: any,
  userId: number,
  folderName: string
) => {
  const {
    file: { filename, createReadStream },
  } = await file;
  const readStream = createReadStream();
    // 파일 업로드시 포함되어있는 createReadStream함수를 통해 파일정보를 추출

  const objName = ` +
  "`${folderName}/${userId}-${Date.now()}-${filename.toLowerCase().replace(/s+/g, " +
  ")}`s" +
  ` 
  // 업로드 호출시 받은 argument를 이용하여 파일 경로와 이름 설정

  const { Location } = s3.upload({
      Bucket,
      Key: objName,
      ACL: "public-read",
      Body: readStream,
    }) // 설정한 값들을 기입후
    .promise(); //promise 함수를 이용하여 완료될때까지 기다림
  return Location; // Location(파일에 접근할수있는 url)을 return
}; 



export const handleDeletePhotoFromAWS = async (fileUrl: string) => {
  const decodedUrl = decodeURI(fileUrl);
  // upload시 받은 Location(자동으로 encode됨)을 decode시킴

  const Key = decodedUrl.split("amazonaws.com/")[1];
    // decode된 url에서 파일명만 분리한후 S3서버에서 파일을 제거

  await s3
    .deleteObject({
      Bucket,
      Key,
    })
    .promise();
};
`;
