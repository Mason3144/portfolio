export const EmailVerification =
  `import * as mailgun from "mailgun-js";
export const sendEmail = async (
  email: string,
  username: string,
  code: string
  // createAccount Mutation에서 email, username, code(random key)를 받음

) => {
  try {
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    }); // Mailgun 셋업 후

    const data = {
      from: "Wetube Clone with GraphQL <mailgun@mailgun-test.com>",
      to: ` +
  "`${email}`" +
  `, // 받을 유저의 email

      subject: "Email confirmation with Mailgun",
      template: "verify-email",
      "v:username": ` +
  "`${username}`" +
  `, 
      "v:code": ` +
  "`${code}`" +
  `, // 미리 제작한 이메일 템플릿에 맞는 변수들, username과 code 보내기

    };
    await mg.messages().send(data, function (error, body) {
      if (error) {
        return { ok: false, error };
      }
    });
  } catch (error) {
    return { ok: false, error };
  }
};`;

export const VerifyEmail = `import { Resolvers } from "../../types";
const resolvers: Resolvers = {
  Mutation: {
    verifyEmail: async (_, { code }, { client }) => {
        // 보내진 이메일 링크 클릭시 프론트엔드에서 param으로 code를 추출후 보냄

      try {
        await client.verificationCode.update({
          where: { code },
          data: { verified: true },
        });  // 받은 code를 DB에서 찾은후 verified true로 변경

        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
`;
