export const createTables = `
/*처음 AWS-RDS에 SQL서버를 구축후 
HeidiSQL을 이용하여 테이블들을 만들어주었다.*/

CREATE TABLE IF NOT EXISTS
owner(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL UNIQUE
)
/* CREATE TABLE [테이블명]이후 
 ([칼럼명], [타입], [속성]) 순으로 입력*/
/* id의 경우 관계형성을 위해 SEREAL KEY 대신 INT와 다른 옵션들을 부여해주었다.
밑에 설명*/

CREATE TABLE IF NOT EXISTS
customers(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(128) NOT NULL,
  snsID VARCHAR(128),
  owner_id INT NOT NULL,
  FOREIGN KEY(owner_id) REFERENCES owner(id) ON DELETE CASCADE
)

/*VARCHAR는 variable charaters의 약자로 일반적인 string을 의미하며 옆의 숫자로 limit을 걸수있다.
(숫자만큼의 개수가아닌 byte를 의미)*/
/*INT DATE 등 다른 타입도 가능 */

CREATE TABLE IF NOT EXISTS
orders(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    owner_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY(owner_id) REFERENCES owner(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE
)
/*FOREIGN KEY와 REFERENCES를 이용하여 one to one, one to many 관계 형성,
ON DELETE CASCADE 옵션을 줄경우 형성된 관계와 상관없이 데이터 삭제가 가능*/

CREATE TABLE IF NOT EXISTS
product(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128),
    pictures VARCHAR(128),
    owner_id INT NOT NULL,
    FOREIGN KEY(owner_id) REFERENCES owner(id) ON DELETE CASCADE
)
/* 처음 Postgres문으로 시작했다가 Mysql로 변경게 되었는데 
이때 id 부분을 serial로 할시 관계형성때 문제가생겼다.
foreign key값이 연결되는 owner.id와 같은 sereal 이어야되는데 그렇게되면
sereal key는 테이블당 1개의 칼럼에게만 부여가 가능하므로 customers.id와 중복되기때문이다.
결국 같은 기능의 속성으로 "int NOT NULL AUTO_INCREMENT PRIMARY KEY" 부여 */

`;

export const modules = `
import { conn } from "./db";

// 아래와 같이 쿼리문을 모듈로 만들어 import를 하여 사용해보았다.
module.exports = {
  test: async () => {
    const [time] = await conn.query(`+"`select now()`"+`)
    return time[0]
  },
/* 연결이 잘됫는지 알아보기위한 쿼리문*/

  findSingleUser: async (value: string, type: string) => {
    const [rows] = await conn.query(`+"`SELECT * FROM owner WHERE ${type} = '${value}'`"+`)
    return rows[0]
  },
  /* SELECT FROM을 이용하여 원하는 정보를 조회할수있다. 
위의 경우 type이 username이라면 username이 value값인 데이터를 조회*/

  createProduct: async (name: string, pictures: string, owner_id: string) => {
    await conn.query(`+"`INSERT INTO product (name, pictures, owner_id) VALUES ('${name}', '${pictures}', '${owner_id}')`"+`)
    const [rows] = await conn.query(`+"`SELECT * FROM product WHERE name = '${name}'`"+`)
    return rows[0]
  },
  /* INSERT를 사용하여 row를 생성해준다. 
INSERT INTO [테이블명] (칼럼명1, 칼럼명2, 칼럼명3) VALUES(칼럼데이터1, 칼럼데이터2, 칼럼데이터3)*/

  editProduct: async (id: number, name: string, url?: string) => {
    await conn.query(`+"`UPDATE product SET name = '${name}' ${url? `, pictures = ${url}` :''} WHERE id = ${id};`"+`)
    const [rows] = await conn.query(`+"`SELECT * FROM product WHERE name = '${name}'`"+`)
    return rows[0]
  },
  /* UPDATE를 이용하여 특정 데이터를 바꿔줄수있다. 위의 쿼리문의 경우
기본적으로 name을 변경해주고 url이 들어올경우 url도 변경되게 해주었다. */

  deleteProduct: async (id: number) => {
    await conn.query(`+"`DELETE FROM product WHERE id = ${id}`"+`)
  }
  /* DELETE를 이용하여 해당하는 데이터를 지워줄수있다
  DELETE FROM [테이블명] WHERE [칼럼명] = [원하는 데이터의 위치]*/
};
`