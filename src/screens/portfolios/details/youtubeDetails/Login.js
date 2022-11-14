const Login = `import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sendEmail } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { client }) => {
      const user = await client.user.findUnique({
        // 받은 email로 계정의 존재유무 확인

        where: { email },
        select: {
          password: true,
          socialLogin: true,
          id: true,
          firstName: true,
        },
      });
      if (!user) {
        return { ok: false, error: "Account does not exsist" };
      }
      if (user.socialLogin) {
        return { ok: false, error: "Pls use social login" };
      } // 소셜로그인 계정일경우 error출력 

      const hash = await bcrypt.compare(password, user.password);
      // bycript.compare로 받은 password를 hash한후 hash화 된 기존의 password랑 비교 후 boolean으로 리턴 

      if (!hash) {
        return { ok: false, error: "Password does not match" };
      }

      const userVerification = await client.verificationCode.findUnique({
        where: { userId: user.id },
        select: { code: true, verified: true },
      });

      if (!userVerification.verified) {
        // 계정생성후 email verification이 진행이 안되었을경우
        // mailgun을 통해 한번더 verification 진행

        await sendEmail(email, user.firstName, userVerification.code);
        return {
          ok: false,
          error: "Please confirm verification on your email",
        };
      }

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      // json web token과 유저 id를 이용하여 token 발행

      return { ok: true, token };
    },
  },
};

export default resolvers;
`;

export default Login;
