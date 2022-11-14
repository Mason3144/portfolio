export const Authentication = `import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import client from "../client";

export const getLoggedinUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const currectToken = token.replace(/["]+/g, "");
    //받은 토큰을 Regex를 사용하여 "" 기호를 없애줌(혹시모를 에러발생을 막기위해 설정)
    // 예시) token : "ekwkq.ndASm2!lasmmd#"

    const { id } = await jwt.verify(currectToken, process.env.SECRET_KEY);
    // jwt.verify를 이용하여 사용자 id(고유식별자, jwt.sign때 같이 넣은 값) 추출


    if (!id) {
      return null;
    }
    const user = await client.user.findUnique({
      where: { id },
    });
    // prisma client로 사용자를 찾은후 return

    if (!user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};

export const protectResolver = (user: User) => {
  if (!user) {
    throw new Error("Token doesn't exist");
  }
}; //로그인한 유저를 판별하기위한 함수(getLoggedinUser함수에서 return한 유저를 받음)

`;

export const serverConfig = `//* server.ts 설정
const apollo: ApolloServer = new ApolloServer({
    schema,
    introspection: true,
    context: async ({ req }) => {
      return {
        loggedInUser: await getLoggedinUser(req.headers.token),
        protectResolver,
        // headers.token을 사용자의 request에서 받은후
        // loggedInUser와 protectResolver 함수를 호출, context로 등록

        client: client,
      };
    },
  });
`;
