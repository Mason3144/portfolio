export const capsule = `## 캡슐화 ##

const player = {
  name: "Mason",
  power: 10,
  speed: 5,
};
const calculateDPS = (power: number, speed: number) => {
  return power * speed;
};
calculateDPS(player.power, player.speed);
/* 위의 경우player가 한명일 경우엔 상관없지만 몇십명 이상의 플레이어가 있을경우 player라는 객체를
 각각 만들어주어야 될경우가생긴다*/

 //위의 데이터들을 캡슐화를통해 class를 생성해주었다.
class Player { 
  public readonly dps: number; 
  //public과 readonly속성부여로 인스턴스에서도 dps를 도출해내지만 변경은 불가하도록설정

  constructor(
    public readonly name: string,
    private power: number, // private으로 class 내에서만 사용이 가능하도록 설정
    private speed: number
  ) {
    this.dps = this.power * this.speed;
  }
}
`;

export const inheritance =
  `## 상속화 ##

/* Actor와 Singer라는 두 집단에 공통으로 들어가는 firstName,lastName,fullName을
상속화를 이용하여 묶어 줄수있다.*/
class Person {
  private fullName:string
  /* 접근권한을 private으로 줄경우 현재 클래스에서만 사용이가능하지만 
  자식속성에서 super()를 사용함으로써 부모의 파라미터들도 상속받을수 있다. 
  접근권한으로 protected를 줄경우 super() 불필요*/
  constructor(
    private firstName: string,
    private lastName:string
  ) {
    this.fullName = ` +
  "`${this.firstName} ${this.lastName}`" +
  `
  }
  public greeting() {
    return ` +
  "`Hi my name is ${this.fullName}`" +
  `
  }
}

class Actor extends Person{
  constructor(
    firstName: string,
    lastName: string,
    private oscar: number
  ) {
    super(firstName,lastName)
    //super()를 이용하여 부모의 파라미터들까지 상속받음
}
}

class Singer extends Person{
  constructor(
    firstName: string,
    lastName: string,
    private billBoard: number
  ) {
    super(firstName,lastName)
}
}
//위처럼 상속화를 통해 파라미터들뿐 아니라 메소드또한 상속받을수 있다.`;

export const abstract =
  `## 추상화 ##

/* 상속화와 추상화는 비슷하면서 조금 다르다. 
상속화는 부모class의 속성을 자식class가 물려받는 목적이지만
추상화는 부모class가 자식class의 설계도(?)라 생각하면 쉽다.*/

/* 상속화와 추상화의 큰 차이점은, 
일단 추상화는 직접 인스턴스 생성을 하지 못한다. 오로지 자식class만이 인스턴스 생성이가능하다.
둘째로 추상 메소드는 직접적인 함수를 포함하지않는다 다만 타입만 지정해줄뿐이다.*/
abstract class User{
  constructor(
    protected firstName: string, //protected를 사용함으로써 자식class에서 super()없이 접근이 가능하다.
    protected lastName: string,
  ) { }
   abstract getFullName():void //추상메소드는 타입만 지정
}
class Player extends User{
  getFullName() {
    return ` +
  "`${this.firstName} ${this.lastName}`" +
  `// 자식 class에서 반드시 부모의 추상메소드를 만들어 주어야한다.
  }
}`;

export const polymorphism = `## 다양화 ##

// 오버라이딩을 통해 자식class에 다양화 해줄수있다.
class User {
  public greeting(): string | number {
    return "안녕하세요";
  } /* 부모class의 메소드가 string을 반환한다면 자식속성또한 무조건 string으로 반환해야한다.
   혹은 위와같이 타입을 지정해주어 자식속성에서 다른타입을 반환하게 할수도 있다.*/
}

class 얼라이언스 extends User {}
class 호드 extends User {
  // 부모class의 메소드와 같은 이름이지만 메소드 오버라이딩을 통해 다른 값을 리턴해 준다.
  public greeting() {
    return "록타르 오가르!";
  }
}`;
