const SocialLogin =
  `import User from "../models/User";
  import fetch from "node-fetch";

  export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
      client_id: process.env.GH_CLIENT, // 관리자가 깃허브에서 받은 고유ID
      allow_signup: false, // 깃허브 계정이 없을경우 계정 생성 권한 유무
      scope: "read:user user:email", // 정보 접근 권한 설정
    }; // Github에서 요구하는 정보들을 입력후 객체로 만듬
    
    const params = new URLSearchParams(config).toString();
    // URLSearchParams을 이용하여 생성된 객체를 url형태로 변환

    const finalUrl = ` +
  "`${baseUrl}?${params}`" +
  `;
    return res.redirect(finalUrl);
  }; // 유저를 조합된 url로 이동시킴
  // 이후 도착한 url에서 깃허브로 로그인한후 관리자가 설정한 url로 다시 redirect됨

  // redirect후 밑의 fetch를 통해 필요한정보들을 깃허브로 다시보내며 (node-fetch 필요)
  // 관리자가 원하는정보(이경우 유저의 Email)을 받아올수있음
  export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
      client_id: process.env.GH_CLIENT,// 관리자가 깃허브에서 받은 고유ID
      client_secret: process.env.GH_SECRET, //마찬가지로 관리자가 깃허브에서 받은 secret넘버
      code: req.query.code, // 깃허브 로그인후 redirect될때 url로 받은 code를 추출
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = ` +
  "`${baseUrl}?${params}`" +
  `;
  // 처음 startGithubLogin 함수와 마찬가지로 필요한 정보들을 url을 통해 깃허브로 보냄

  // node-fetch를 설치해준후 fetch를 통하여 위의 조합된 url로 post request를 보냄
    const tokenRequest = await (
      await fetch(finalUrl, {
        method: "POST",
        headers: {
          Accept: "application/json", // 정보의 형태를 json으로 요구함
        },
      })
    ).json();// json형태를 일반 객체형태로 변환

    // 위의 fetch로 받은 access_token을 이용하여 또다른 api에 접근 후 데이터를 받음
    if ("access_token" in tokenRequest) {
      const { access_token } = tokenRequest;
      const apiUrl = "https://api.github.com";

      // Github에서 제공하는 api url과 받은 access_token을 이용하여 Github에서 보유한 유저의 개인정보에 접근
      const userData = await (
        await fetch(` +
  "`${apiUrl}/user`" +
  `, {
          headers: {
            Authorization: ` +
  "`token ${access_token}`" +
  `,
          },// headers에 위에서 받은 access_token을 등록한후 두번째 api url로
          // fetch를 이용하여 get request를 보내서 Github의 user data를 가저옴
        })
      ).json();

      // 위와 동일하며 fetch로 접근하는 url만 변경하여 유저의 이메일정보에 접근
      const emailData = await (
        await fetch(` +
  "`${apiUrl}/user/emails`" +
  `, {
          headers: {
            Authorization: ` +
  "`token ${access_token}`" +
  `,
          },
        })
      ).json();

      // emailData는 array형태로 받으며 여러 이메일이 등록되어 있을수 있음 
      const emailObj = emailData.find(
        (email) => email.primary === true && email.verified === true
      ); // 받은 여러 이메일중 기본으로 설정되었고 인증이 완료된 이메일을 찾음

      if (!emailObj) {
        return res.redirect("/login");
      }
  
      // 받은 정보를 이용하여 DB내의 유저를 찾음
      let user = await User.findOne({ email: emailObj.email });
      if (!user) { // 만약 DB내에 유저가없다면 위의 정보들로 유저를 만듬
        user = await User.create({
          name: userData.name ? userData.name : "Unknown",
          avatarUrl: userData.avatar_url,
          email: emailObj.email,
          username: userData.login,
          password: "",
          socialOnly: true, 
          // socialOnly 옵션을 주어 해당사용자는 소셜로그인만 가능하며
          // 추후 유저가 password를 업데이트하면 일반 로그인도 가능
          location: userData.location ? userData.location : null,
        });
      }

      // 유저 정보를 session에 저장
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
      
    } else { // access_token을 받지 못할경우 로그인 페이지로 redirect
      return res.redirect("/login");
    }
  };`;

export default SocialLogin;
