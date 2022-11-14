export const UploadVideo = `import { uploadToS3 } from "../../shared/shared.uploads";
import { Resolvers } from "../../types";
import { handleHashtags } from "../videos.utils";

const resolvers: Resolvers = {
  Mutation: {
    createVideo: async (
      _,
      { video, videoName, description, chennelId },
      { client, loggedinUser, protectedUser }
    ) => {
      try {
        protectedUser(loggedinUser);
        // 유저 로그인 확인후 

        const location = await uploadToS3(video, loggedinUser.id, "video");
        // 비디오파일, 유저id, "video"(경로명)과 함께 
        // 업로드를 위한 uploadToS3 함수 호출 후 파일경로를 리턴값으로 받음

        await client.video.create({
          data: {
            video: location,
            // uploadToS3에서 받은 경로를 입력

            videoName,
            description,
            hashtags: {
              ...(description && {
                connectOrCreate: handleHashtags(description),
              }), // description이 있을경우 handleHashtags 함수를 이용하여 
              // 받은 리턴값으로 hashtag 생성

            },
            user: { connect: { id: loggedinUser.id } },
            chennel: { connect: { id: chennelId } },
          }, // 유저와 채널 연결후 비디오 생성

        });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
`;

export const UploadS3 =
  `import * as AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});// AWS S3 API key 설정 입력

const S3 = new AWS.S3();

export const uploadToS3 = async ({ file }, userId: number, path: string) => {
  const { filename, createReadStream } = file;
  const Body = createReadStream();
  // createReadStream 함수를 이용하여 파일정보 추출

  const Key = ` +
  "`${path}/${userId}-${Date.now()}-${filename.toLowerCase().replace(/s+/g, " +
  `""` +
  ")}`" +
  `;
  // 파일명 설정

  const { Location } = await S3.upload({
    Bucket: process.env.S3_BUCKET,
    Key,
    ACL: "public-read",
    Body,
  }).promise();
  // promise를 이용하여 업로드가 완료될때까지 기다린후 파일경로 리턴

  return Location;
};
`;
