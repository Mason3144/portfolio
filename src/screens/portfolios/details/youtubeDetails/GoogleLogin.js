const GoogleLogin = `import { Resolvers } from "../../types";
import { OAuth2Client } from "google-auth-library";
import * as jwt from "jsonwebtoken";

const OAuth = new OAuth2Client(process.env.GOOGLE_CLIENT);
// Google OAuth client api key등록

const resolvers: Resolvers = {
  Mutation: {
    googleLogin: async (_, { idToken }, { client }) => {
      try {
        const clientId = process.env.GOOGLE_CLIENT;
        const { payload } = await OAuth.verifyIdToken({
          idToken,
          audience: clientId,
        }); // 연결된 링크로 이동, 구글 로그인후 자동으로 받아오는 idToken과 client api key를 이용하여
        // OAuth.verifyIdToken 실행

        if (payload.email_verified) {
            // 이메일 인증 확인후

          let user = null;
          user = await client.user.findUnique({
            where: { email: payload.email },
            select: { id: true },
          }); // 기존에 유저가 있는지 확인, 유저가 있다면 token발행

          if (!user) {
            user = await client.user.create({
              data: {
                email: payload.email,
                avatar: payload.picture,
                firstName: payload.given_name,
                lastName: payload.family_name,
                socialLogin: true,
              },// 기존에 유저가 없다면 유저를 생성해줌
            });
          }
          const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
          // json web token과 유저 id를 이용하여 토큰 발행 후 리턴

          return { ok: true, token };
        }
        return { ok: false, error: "User not verified" };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
`;

export default GoogleLogin;
