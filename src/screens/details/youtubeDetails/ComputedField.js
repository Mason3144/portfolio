const ComputedField = `import { Resolvers } from "../types";

// Computed field를 사용한 새로운 리턴 필드 생성
const resolvers: Resolvers = {
  Video: {
    user: async ({ userId }, _, { client }) =>
    // video의 typeDefs에서 설정한 유저id를 parent로 받은후 

      client.user.findUnique({ where: { id: userId } }),
    //비디오 소유자 정보를 리턴

    totalLikes: async ({ id }, _, { client }) => {
      const { _count } = await client.videoLikes.findUnique({
        where: { videoId: id },
        select: { _count: { select: { users: true } } },
      }); 
      //ApolloClient의 _count를 이용하여 해당 비디오의 like 모델의 유저수를 자동으로 계산 후 리턴

      return _count.users;
    },

    allComments: async ({ id }, { lastId }, { client }) =>
      client.comment.findMany({
        where: { videoId: id },
        take: 4,
        // 해당 비디오에 달린 댓글들을 받은후 cursor pagination을 이용하여 
        // 4개씩 댓글이 생성된 순으로 출력

        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: "desc" },
      }), 
      // 댓글이 4개 이상일 경우 마지막 4번째 댓글의 id를 프론트엔드에서 받고
      // 다음 4개의 리스트를 불러옴

    isMine: async ({ userId }, _, { loggedinUser }) => {
        // 해당비디오의 소유자 id를 parent에서 받아와 로그인 유저와 비교하여
        // 자신의 비디오인지 판별

      if (!loggedinUser) {
        return false;
      }
      return userId === loggedinUser.id;
    },
  },
};

export default resolvers;
`;

export default ComputedField;
