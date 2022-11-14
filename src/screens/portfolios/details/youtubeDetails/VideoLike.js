const VideoLike = `import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    videoLikes: async (_, { id }, { client, protectedUser, loggedinUser }) => {
      try {
        protectedUser(loggedinUser);
        const exist = await client.video.count({
          where: { id },
        }); // 비디오가 존재하는지 확인

        if (!exist) {
          return { ok: false, error: "Video not found" };
        }

        const checkUser = await client.videoLikes.count({
          where: {
            AND: [
              { videoId: id },
              { users: { some: { id: loggedinUser.id } } },
            ], // 로그인된 유저가 현재 비디오에 like를 한 상태인지 확인
          },
        });

        if (checkUser) {
          await client.videoLikes.update({
            where: { videoId: id },
            data: { users: { disconnect: { id: loggedinUser.id } } },
          });
          return { ok: true };
        } // 현재 like한 상태이라면 like 연결 해제 
        // like를 한 상태가 아니라면 밑의 코드 실행

        await client.videoLikes.upsert({
            // upsert를 이용하여 해당 비디오에 like한 유저가 아무도 없엇다면
            // 해당 비디오의 like를 생성 후 유저와 모델 연결
            // like모델이 이미 생성되어있을경우 해당 like모델에 유저만 연결

          where: { videoId: id },
          update: {
            users: { connect: { id: loggedinUser.id } },
          },
          create: {
            video: { connect: { id } },
            users: { connect: { id: loggedinUser.id } },
          },
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

export default VideoLike;
