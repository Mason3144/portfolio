const CreateAccount = `import { Resolvers } from "../../types";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { sendEmail } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { password, email, firstName, lastName },
      { client }
    ) => {
      try {
        const exist = await client.user.findUnique({
            // PrismaClient를 context로 받은후 중복된 유저가 있는지 체크
          where: { email },
          select: { socialLogin: true },
        });
        if (exist) {
          if (!exist.socialLogin) {
            // 이미 가입된 계정이 있지만 소셜 로그인이 아닌경우 밑의 에러 출력

            return {
              ok: false,
              error: "Email already taken,Please try to login",
            };
          } else {
            // 소셜 로그인인 경우 밑의 에러 출력

            return {
              ok: false,
              error: "Email already taken,Please try social login",
            };
          }
        }

        const hash = await bcrypt.hash(password, 10);
        // 기존에 생성된 계정이 없다면 argument로 받은 password Bcrypt로 암호화하기 

        const user = await client.user.create({
          data: { password: hash, email, firstName, lastName },
        });// 남은 정보들로 계정생성을 해준후 

        const code = uuidv4();
        // uuid를 이용하여 email verification을 위한 랜덤키 생성

        await client.verificationCode.create({
          data: { code, user: { connect: { id: user.id } } },
        }); // 만들어진 랜덤키를 이용하여 verificationCode모델 생성후 유저와 연결

        await sendEmail(user.email, user.firstName, code);
        // mailgun 사용을위한 sendEmail 함수 호출
        
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
`;

export default CreateAccount;
