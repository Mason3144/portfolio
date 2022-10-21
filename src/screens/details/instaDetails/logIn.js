const logIn = `import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return { ok: false, error: "User not found." };
      } 
      //유저가 존재하는지 확인후

      const checkPassword = await bcrypt.compare(password, user.password);
      // bcrypt.compare를 사용하여 유저에게 받은 password를 암호화하여 DB안의 암호화된 password와 비교
      // (boolean으로 return됨)

      if (!checkPassword) {
        return { ok: false, error: "Incorrect password." };
      }

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return { ok: true, token };
      //암호가 일치한다면 json web token을 이용하여 토큰을 생성후 발행
      //이후 사용자 기기의 localStorage에 token저장
    },
  },
};

export default resolvers;
`;

export default logIn;
