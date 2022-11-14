const Comment = `import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, { photoId, offset }, { client }) => {
      return client.comment.findMany({
        where: { photoId:photoId },
        // Photo의 id를 받은후 해당하는 photo내의 모든 댓글을 찾음

        take: 10,
        // 리스트에 올릴 기본 댓글 개수는 10개로 지정
        
        skip: offset,
        // 프론트엔드에서 표시된 댓글의 갯수를 offset으로 설정후 받은후
        // 나머지 데이터를 10개씩 더 받음

        orderBy: { createdAt: "desc" },
        // 최신댓글 순으로 데이터를 보냄

        include: { user: true },
        // 댓글주인의 정보도 함께 보냄

      });
    },
  },
};

export default resolvers;
`;

export default Comment;
