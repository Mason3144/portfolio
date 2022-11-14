const SearchUser = `import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) => {
      return client.user.findMany({
        where: {
          OR: [
            { username: { startsWith: keyword.toLowerCase() } },
            { username: { contains: keyword.toLowerCase() } },
          ], // argument로 받은 키워드를 통해서 유저를 검색
        },

        take: 10, // 리스트에 올리는 기본 유저수는 10명으로 설정, 10개의 데이터씩 로딩

        skip: lastId ? 1 : 0, 
        // 리스트의 유저수가 10명이상일경우 마지막 10번째 유저의 id를 argument로 받고
        // lastId를 받앗을경우 마지막유저를 스킵후 다음 리스트를 불러옴

        ...(lastId && { cursor: { id: lastId } }),
        // lastId를 받을경우 cursor는 lastId
      });
    },
  },
};

export default resolvers;
`;

export default SearchUser;
