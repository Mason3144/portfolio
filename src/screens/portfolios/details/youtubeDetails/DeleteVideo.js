export const DeleteVideo = `import { deleteToS3 } from "../../shared/shared.uploads";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    deleteVideo: async (_, { id }, { client, loggedinUser, protectedUser }) => {
      try {
        protectedUser(loggedinUser);
        //로그인된 사용자 확인

        const video = await client.video.findUnique({
          where: { id },
          select: { userId: true, video: true },
        });// 프론트엔드에서 받은 비디오 id로 존재유무 확인

        if (!video) {
          return { ok: false, error: "Video not found" };
        }
        if (video.userId !== loggedinUser.id) {
          return { ok: false, error: "You have no authority of this video" };
        }// 비디오의 주인이 맞는지 확인후

        await deleteToS3(video.video);
        //deleteToS3함수를 비디오 경로와 함께 호출

        await client.video.delete({ where: { id } });
        // DB에서 비디오를 삭제

        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
`;

export const DeleteS3 = `import * as AWS from "aws-sdk";
const S3 = new AWS.S3();
export const deleteToS3 = async (url: string) => {
  const decodedUrl = decodeURI(url);
  // encode된 url을 decode시킴

  const fileName = decodedUrl.split("amazonaws.com/")[1];
  // decode된 url경로에서 파일명만 추출

  const Key = fileName.replace("%2C", ",");
    // 파일명에서 "," 가 "%2C"로 자동변경되기때문에 다시 ","로 변환후

  await S3.deleteObject({
    Bucket: process.env.S3_BUCKET,
    Key,
  }).promise();
}; // S3서버에서 해당 파일 삭제
`;
