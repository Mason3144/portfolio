const createAccount = `import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { client } 
      //PrismaClient를 context로 받고 위의 유저정보들을 arguments로 받아 진행.
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });  //먼저 username과 email은 unique속성을 지니므로 다른사용자가 있는지 체크

        if (username.length < 3) {
          if (existingUser && existingUser.username === username) {
            return { ok: false, error: "Username already taken." };
          }
          return {
            ok: false,
            error: "Username must be more than 2 characters",
          };  //2글자 이상의 username으로 validation생성
        }

        if (!/^[a-zA-Z0-9_.-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
            //Regex를 이용하여 email타입만 입력 가능하도록 validation추가
          if (existingUser && existingUser.email === email) {
            return { ok: false, error: "Email already taken." };
          }
          return { ok: false, error: "Wrong email address" };
        }

        if (
          !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d#?!@$%^&*-]{8,}$/.test(password)
        ) { //위와 마찬가지로 Regex를 이용하여 8글자이상, 영문+숫자 포함 password 생성
          return {
            ok: false,
            error:
              "Password must be more than 7 characters, at least one letter and one number",
          };
        }
        const hash = await bcrypt.hash(password, 10);
        //Bcrypt를 이용하여 사용자암호를 암호화

        const newUser = await client.user.create({
          data: { firstName, lastName, username, email, password: hash },
        }); //사용자 생성
        

        // 밑의 코드는 사용자가 계정생성시 마스터계정과 자동 팔로우 되도록하였습니다.
        // 테스트만을 위한 코드로 무시하셔도 무방합니다.
        await client.user.update({
          where: { username: "master" },
          data: {
            following: {
              connect: { username: newUser.username },
            },
            followers: {
              connect: { username: newUser.username },
            },
          },
        });

        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      } 
      //계정생성시 return값으로 ok: boolean 설정  
      //사용자가 username, email이 중복될경우 알수있도록 error도 return을 함
      
    },
  },
};

export default resolvers;
`;

export default createAccount;
