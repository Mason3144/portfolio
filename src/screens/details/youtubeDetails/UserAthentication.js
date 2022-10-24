export const ServerContext = `const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    context: async ({ req }) => {
        // 프론트엔드에서 token을 localStorage에 저장후 request로 보냄

      return {
        client,
        protectedUser,
        loggedinUser: await loggedinUser(req.headers.token),
        // 받은 token과 함께 loggeedinUser 함수 호출후 context로 등록
      };
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  await server.start();`;

export const UserAthentication = `import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import client from "../client";

export const loggedinUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const userVerify = await jwt.verify(token, process.env.SECRET_KEY);
    // token이 있을경우 json web token을 이용하여 인증하고 유저 id를 식별

    if (!userVerify) {
      return null;
    }
    const user = await client.user.findUnique({ where: { id: userVerify.id } });
    // 식별된 id로 유저를 찾은후 리턴

    if (!user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};

export const protectedUser = (user: User) => {
  if (!user) {
    throw new Error("Pls login first");
    // 로그인이 안되어있다면 에러를 출력하고
    // 되어있다면 패스 시킴
  }
};
`;
