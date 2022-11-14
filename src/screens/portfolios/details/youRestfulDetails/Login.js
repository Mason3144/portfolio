export const LoginRouter = `import express from "express";
import { logout } from "../Controller/userController";
import { getLogin, postLogin } from "../Controller/userController";
import { protectorMiddleware } from "../middlewares";

const rootRouter = express.Router();
const userRouter = express.Router();

rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
  // 로그인라우터의 경우 유저생성때와 같음
userRouter.get("/logout", protectorMiddleware, logout);
// "/logout"으로 get request를 보내며 protectorMiddleware로 유저인증

`;

export const ProtectorMiddleware = `export const protectorMiddleware = (req, res, next) => {
    // req.session에서 loggedIn 정보가 있으면 패스, 없으면 메시지 출력후 로그인 페이지로 이동
    if (req.session.loggedIn) {
        return next()
    } else {
        req.flash("error", "You need to log in first.")
        return res.redirect("/login");
    }
}`;

export const LoginOut = `export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    // req.body를 이용하여 로그인 페이지 form의 정보를 받아옴
    const pageTitle = "Login";
    const user = await User.findOne({ username, socialOnly: false });
    // 받은 정보의 유저가 DB에 존재하지않는다면 error 메세지를 보내고 로그인페이지로 다시 이동
    if (!user) {
      req.flash("error", "An account with this username does not exists.");
      return res.status(400).render("login", { pageTitle });
    }

    // 유저가 존재한다면 받아온 password를 bycript.compare를 이용하여 DB의 암호화된 password와 비교
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      req.flash("error", "The confirmation of password does not match.");
      return res.status(400).render("login", { pageTitle });
    }

    //password가 일치한다면 req.session 내의 로그인 유저 정보를 갱신하여 유저인증을 등록한뒤 홈으로 보냄
    req.session.loggedIn = true;
    req.session.user = user;
  
    return res.redirect("/");
  };
  

  export const logout = async (req, res) => {
    // get request를 받으면 req.session에 저장된 유저인증을 지운후 홈으로 보냄
    req.session.destroy();
    return res.redirect("/");
  };
  `;
