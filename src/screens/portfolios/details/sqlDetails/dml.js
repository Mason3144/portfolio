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

export const join = `## JOIN ##

SELECT Employees.* FROM Employees 
JOIN Orders
ON Employees.EmployeeID = Orders.EmployeeID //위와 같은 결과값이며 JOIN을 사용하였다.
// 여지껏 주문을 한 직원들 출력
// 오더를 넣은 수만큼 직원들이 중복되어 출력됨`;

export const groupBy = `## GROUP BY ##

SELECT Employees.* FROM Orders, Employees
WHERE Orders.EmployeeID = Employees.EmployeeID
GROUP BY Employees.EmployeeID
// GROUP BY를 사용하여 중복된 결과값들을 제외시켜줄수있다.`;

export const subqueryNested = `## Subquery - Nested ##

/* WHERE절에 들어가는 Subquery를 중첩 서브쿼리라고하며 이를 이용하여 조건을 더 추가해줄수 있다.*/
/*서브쿼리의 결과값을 먼저 추출한뒤 메인쿼리가 실행되며 괄호를 사용한다. */

SELECT Employees.* FROM  Employees
WHERE Employees.EmployeeID 
IN (SELECT Orders.EmployeeID FROM Orders WHERE Orders.OrderDate between "1996-07-01" and "1996-07-09" )
GROUP BY Employees.EmployeeID
/*위와 같이 특정기간안의 주문을 먼저 검색한후 결과값으로 EmployeeID만을 추출한뒤
그 안에서 해당 직원의 정보를 출력한다.*/
`;

export const subqueryInlineview = `## Subquery - Inline Views ##

/* FROM절에 들어가는 Subquery를 인라인뷰 서브쿼리라고하며 위의 중첩서브쿼리와 결과값은 같지만 방식이 다르다.*/
/* 인라인뷰의 경우 반드시 하나의 테이블로 리턴 되어야한다. */

SELECT Employees.* 
FROM  (SELECT Orders.EmployeeID AS 직원 FROM Orders WHERE Orders.OrderDate between "1996-07-01" and "1996-07-09" ), Employees
WHERE Employees.EmployeeID = 직원
GROUP BY Employees.EmployeeID
/*위의 쿼리문과 같이 특정기간안에 주문을한 EmployeeID를 "직원"이라는 테이블로 반환해주고
그 반환된 테이블안에 포함되는 직원의 정보를 출력한다.*/
`;
