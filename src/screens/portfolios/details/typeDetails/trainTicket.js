export const managerTicket = `// 목적: 승차권 발급기에 승객들이 선택할수 있는 목적지 정보 등록

type Arrive = "Seoul" | "Busan" | "Deajeon" | "Deagoo" | "";
// 지정된 역만 선택 및 등록이 가능하도록 type 등록

interface Obj {
  arrive: Arrive;
  price: number;
  distance: string;
} // 생성되는 객체에 대한 type 등록

class ATravel implements Obj {
  constructor(
    public readonly arrive: Arrive,
    public readonly price: number,
    public readonly distance: string
  ) {}
} // 목적지 생성에 대한 객체 설계

// 관리자가 티켓정보를 관리할수있도록 class 추가
class Travels {
  private travels: ATravel[];
  // 위의 객체의 array타입 등록
  constructor() {
    this.travels = [];
  } //초기 목적지 array값은 empty

  // 관리자가 목적지를 등록할수 있도록 메소드 생성
  public addTravel(arrive: Arrive, price: number, distance: string) {
    const newTravel = new ATravel(arrive, price, distance);
    // ATravel class에 맞게 파라미터들을 가저온뒤 인스턴스 생성

    this.travels.push(newTravel);
  }

  // 관리자가 목적지를 삭제할수 있도록 메소드 생성
  public rmTravel(arrive: Arrive) {
    this.travels = this.travels.filter((item) => item.arrive !== arrive);
    //목적지 이름에 해당되는 객체 삭제
  }

  // 관리자가 등록한 목적지를 볼수있도록 메소드 생성
  public getTravel() {
    return [...this.travels];
  }
}

const manager = new Travels();
manager.addTravel("Seoul", 11000, "200km"); // 목적지들 생성
manager.addTravel("Deagoo", 10000, "180km");
manager.addTravel("Busan", 10000, "190km");
manager.addTravel("Deajeon", 5000, "80km");
manager.rmTravel("Deagoo"); // 잘못생성한 목적지 삭제
console.log(manager.getTravel()); // 등록한 목적지들 확인

/* 결과값
[
  ATravel { arrive: 'Seoul', price: 11000, distance: '200km' },
  ATravel { arrive: 'Busan', price: 10000, distance: '190km' },
  ATravel { arrive: 'Deajeon', price: 5000, distance: '80km' }
]
*/`;

export const passengerTicket =
  `//목적:  승객이 여행할 목적지를 선택후 해당하는 티켓의 금액표시
//          지불할 금액과 지불한 금액에 따라 다른 리턴값 출력
  
  // 승객들이 목적지 선택후 티켓을 구매할수 있도록 class추가
class Ticketer {
  public readonly travels: ATravel[];
  private myTravel: ATravel;
  constructor() {
    this.travels = manager.getTravel();
    //관리자가 등록한 모든목적지 정보들을 travels에 등록

    this.myTravel = { arrive: "", price: 0, distance: "" };
    // 현재 내가 선택한 목적지의 정보의 초기값
  }
  static seeTravels() {
    return manager.getTravel();
    // 관리자가 등록한 모든 목적지의 정보를 확인
  }

  //원하는 목적지를 선택하는 메소드
  setTravel(arrive: Arrive) {
    const pickOne = this.travels.find((item) => item.arrive === arrive);
    // 원하는 목적지의 이름을 파라미터로 받은뒤 travels array에서 그 목적지만을 선택

    if (!pickOne) {
      return "Wrong destination";
    }
    this.myTravel = pickOne;
    return ` +
  "`${pickOne.price} needs to be charged`" +
  `;
    // 선택한 목적지를 myTravel에 등록후 티켓가격 리턴
  }

  // 선택된목적지의 티켓의 구매하는 메소드
  payTravel(price: number) {
    // 입금된 금액을 파라미터로 받은후

    if (price < this.myTravel.price) {
      const value = this.myTravel.price - price;
      return ` +
  "`${value} needed more`" +
  `;
    } // 입금된 금액이 티켓가격보다 낮을경우 더 필요한 가격값을 리턴

    const exchange = price - this.myTravel.price;
    return { TicketInfo: this.myTravel, exchange };
  } // 입금된 금액이 더 높거나 같을경우 티켓정보와 함께 거스름돈값을 리턴
}

console.log(Ticketer.seeTravels()); //현재 선택가능한 목적지들의 정보 출력
const passenger = new Ticketer(); // 승객으로 인스턴스를 만든후
passenger.setTravel("Seoul"); // 원하는목적지 선택
console.log(passenger.payTravel(10000)); // 실제가격보다 낮은금액 지불
console.log(passenger.payTravel(12000)); // 실제가격보다 높은금액 지불

/* 결과값
[ 
  ATravel { arrive: 'Seoul', price: 11000, distance: '200km' },
  ATravel { arrive: 'Busan', price: 10000, distance: '190km' },
  ATravel { arrive: 'Deajeon', price: 5000, distance: '80km' }
]  // 현재 운행중인 목적지들

1000 needed more // 실제가격보다 낮은급액을 지불하였을경우

{
  TicketInfo: ATravel { arrive: 'Seoul', price: 11000, distance: '200km' },
  exchange: 1000
} // 실제가격보다 높은금액을 지불하였을경우
*/
`;
