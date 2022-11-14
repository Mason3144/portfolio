export const tableControl = `CREATE TABLE EmployeesTest
(
EmployeeID uuid,  // 유니크 id 타입
LastName VARCHAR(10),   // 가변문자 타입으로 최대 10bytes
FirstName VARCHAR(10),
BirthDate DATE,   // 날짜 타입
Photo VARCHAR(20),
Notes VARCHAR(50)
);
// INT(size)로 숫자 타입을 부여할수 있으며 
// 타입 옆에 UNIQUE, NULL과 같은 속성들 추가 가능

DROP TABLE EmployeesTest  // Table 삭제
`;

export const columnControl = `ALTER TABLE EmployeesTest RENAME TO Employees  // 테이블 이름변경
ALTER TABLE EmployeesTest ADD Email VARCHAR // 테이블에 Email column추가
ALTER TABLE EmployeesTest DROP COLUMN Email // Email column 삭제
// ALTER를 이용하여 Table 및 Column의 정보들을 변경할수 있다
`;
