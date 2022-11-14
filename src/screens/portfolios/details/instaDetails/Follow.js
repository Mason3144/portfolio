const Follow = `import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    followUser: async (
      _,
      { username },
      { loggedInUser, protectResolver, client }
    ) => {
      try {
        protectResolver(loggedInUser);
        // 로그인의 된 유저 체크

        const userExisting = await client.user.count({
          where: { username },
        }); // 팔로우 할 유저가 존재하는지 체크

        if (!userExisting) return { ok: false, error: "User doesn't exist" };
        if (username === loggedInUser.username)
          return { ok: false, error: "Cannot follow yourself" };
            // 자기 자신은 팔로우가 불가능하도록 설정

        const isFollow = await client.user.count({
          where: {
            username,
            followers: { some: { username: loggedInUser.username } },
          }, //팔로우할 대상이 자신과 이미 팔로우가 되있는지 확인
        });

        if (isFollow) {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: { following: { disconnect: { username } } },
          }); // 만약 팔로우가 이미 되있는 상태라면 언팔로우

        } else {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: {
                connect: { username },
              }, // 팔로우가 아니라면 팔로우
              
            },
          });
        }
        return { ok: true };
      } catch (error) {
        return { ok: true, error };
      }
    },
  },
};

export default resolvers;
`;

export default Follow;
