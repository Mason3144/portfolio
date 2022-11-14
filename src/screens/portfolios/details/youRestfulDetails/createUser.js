export const createUserRoute = `import express from "express";
import {
  getJoin,
  postJoin,
} from "../Controller/userController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
// "/join"으로 url endpoint 설정하며 모든 request들은 publicOnlyMiddleware를 거치게 함으로써
// 로그인이 안된 유저만 get 및 post request를 수행함

export default rootRouter;


`;

export const publicFn = `export const publicOnlyMiddleware = (req, res, next) => {
    // req.session에 loggedIn 정보가 없다면 패스, 있다면 홈으로 돌려보냄
    if (!req.session.loggedIn) {
        next()
    } else {
        req.flash("error", "You are already logged in.")
        return res.redirect("/");
    }
}`;

export const createUserControl =
  `import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
// get request를 받으면 "join"이라는 페이지로 이동

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  //req.body를 이용하여 작성된 form의 정보를 받아옴

  const pageTitle = "Join";
  if (password !== password2) {
    req.flash("error", "Password confirmation does not match.");
    return res.status(400).render("join", { pageTitle });
  } // password confirmation으로 작성한 패스워드가 같지 않다면 req.flash를 이용하여 메세지 생성

  const usernameExists = await User.exists({ username });
  const emailExists = await User.exists({ email });
  // 현재 DB에 겹치는 유저 혹은 email이 있는지 체크후 메세지 생성
  if (usernameExists) {
    req.flash("error", ` +
  "`This username : ${username} is already taken`" +
  `);
    return res.status(400).render("join", { pageTitle });
  }
  if (emailExists) {
    req.flash("error", ` +
  "`This email : ${email} is already taken`" +
  `);
    return res.status(400).render("join", { pageTitle });
  }

  // 모든 조건들을 통과하면 Mongoose를 이용하여 유저 생성후 메세지 출력, 로그인페이지로 이동
  await User.create({
    name,
    email,
    username,
    password,
    location,
  });
  req.flash("success", "Creating an account success. Please log in.");
  return res.redirect("/login");
};`;
