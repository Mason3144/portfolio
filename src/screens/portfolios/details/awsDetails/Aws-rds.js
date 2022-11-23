
export const rds = `
/* RDS와 세션스토어를 같은 Mysql로 설정해 주었다. */
import session from "express-session";
const MySQLStore = require('express-mysql-session')(session);
/* mysql session store에 express-session을 연결해준다 */ 

const mysql = require('mysql2/promise');
/* mysql2를 사용하여 비동기 가능 */

const options = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port:process.env.DB_PORT
}
export const conn = mysql.createPool(options)
/* AWS-RDS생성 후 모든 정보들을 받은뒤 mysql2를 연결해주면 손쉽게 컷!*/

export const sessionStore = new MySQLStore(options, conn);
/* 그후 session store까지 연결 */
`

export const sessionStore = `
/* 유저 authentication기능을 구현하려다보니 세션이 필요했고
로컬 세션으로는 서버가 재부팅함에 따라 세션정보가 지워저서 DB에 session정보를 저장했어야 했다. */

app.use(
  session({
    key: "login-session",
    secret: process.env.COOKIE_SECRET,
    store: sessionStore, // 위에서 설정한 mysql-session-store를 받아 연결해줌
    resave: true,
    saveUninitialized: false,
    cookie : {
      expires : farFuture
    }/* expires를 사용하면 지정된 날짜에 세션정보가 지워지고 
  }) maxAge를 사용할경우 생성된 날짜로부터 지정된 시간까지만 저장이되는 차이점이 있다.*/
);


/* 이후 밑에와 같이 미들웨어를 만들어주어 각 라우터에 연결 */
export const protectorMiddleware = (req, res, next) => {
  if (req.session.login) {
    return next();
  } else {
    return res.send({ok:false, error:"로그인이 필요합니다."});
  }
};

`