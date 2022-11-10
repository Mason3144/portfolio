export const controlRow = `INSERT INTO EmployeesTest VALUES(1,"Lee","Taeseop",1989-01-26,"photo.jpg","SQL query test")
// INSERT를 이용하여 Table내의 Row를 생성하며
// NULL 속성이 있는경우 column들을 지정하여 생성가능

UPDATE EmployeesTest SET BirthDate = "1989-01-26" WHERE EmployeeID = 1
// 이미 생성된 Row를 업데이트 할때 사용

DELETE FROM EmployeesTest WHERE EmployeeID = 1
// 생성된 Row를 삭제
`;

export const selectRow = `SELECT Employees.* FROM Orders, Employees // SELECT를 사용하여 특정 데이터를 검색
WHERE Orders.EmployeeID = Employees.EmployeeID
ORDER BY BirthDate ASC
// 전체 직원들중 주문을 넣은 직원들만 출력하며 나이가 많은 순으로 정렬
`;
