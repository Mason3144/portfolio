const ComputedFiled = `import client from "../client";
import { Resolvers } from "../types";

// Computed field를 사용하여 기존에 저장된 데이터를 이용해 새로운 필드를 만들수있음
const resolvers: Resolvers = {
  User: {
    totalFollowing: ({ id }, _, { client }) =>
    // typeDefs에서 설정한 결과값들 모두를 parent에서 받을수있음
    // user의 id를 parent로 받은후
    
      client.user.count({
        where: { followers: { some: { id } } },
      }), //결과값의 사용자를 팔로우하는 모든사람의 수를 계산함

    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({
        where: { following: { some: { id } } },
      }),

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return id === loggedInUser.id;
    }, //로그인된 사용자와 결과값의 사용자가 같을경우 true를 리턴

    isFollowing: async ({ id }, {}, { client, loggedInUser }) => {
      if (!loggedInUser) return false;
      const isFollow = await client.user.count({
        where: { username: loggedInUser.username, following: { some: { id } } },
        // DB에서 loggedInUser.username를 찾고 그 username의 following안에서 id의 유무로 boolean 리턴
      });
      return Boolean(isFollow);
    },
    photos: async ({ id }, { lastId }) => {
      return client.user.findUnique({ where: { id } }).photos({
        // 결과로 받은 유저의 아이디로 연결된 모든 사진들을 찾은후
        
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });// 프론트엔드에서 마지막으로 받은 사진의 id를 받아 cursor pagination으로 5개의 사진씩 로드시킴
      // 유저 프로필보기 에서 사용
    },
  },
};

export default resolvers;
`;

export default ComputedFiled;
