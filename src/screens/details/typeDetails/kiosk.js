export const Manager = `/* 목적: Kiosk에서 사용이 가능한 메뉴 목록 등록,
    각 메뉴의 이름, 가격, 고유ID를 부여, 
    목록에서 선택된 메뉴를 삭제 */
interface Menu {
    ref: number; // ref를 주어 각 메뉴마다 고유ID부여
    name: string;
    price: number;
  }
  
  class Register {
    private menu: Menu[] = []; // 등록한 메뉴들의 array
    static ref: number = 1; // 메뉴들의 ID로 다른 인스턴스에서도 겹치지 않도록 static속성 부여

    public addMenu(key: string, value: number) {
      const newMenu: Menu = { ref: Register.ref, name: key, price: value };
      //interface Menu에 맞게 작성후
      Register.ref++; // ref번호를 1증가시켜 다음 메뉴등록때 다른 ID가 부여되도록 설정
      this.menu.push(newMenu);
    }

    public rmMenu(key: string) {
      const menus = this.menu.filter((menu) => menu.name !== key);
      this.menu = [...menus];
    }// filter를 이용하여 삭제하려는 메뉴를 제외한 후 menu[]에 등록

    public getMenu(key?: string) {
      if (key) {
        const aMenu = this.menu.find((menu) => menu.name === key);
        return [aMenu];
      } // key값을 받는다면 원하는 특정 메뉴만을 검색
      return [...this.menu]; // key값이 없다면 등록된 모든 메뉴들을 검색
    }
  }
  
  const burger = new Register();
  const drink = new Register();
  const side = new Register();
  // 각각에 맞는 인스턴스 생성`;

export const Customer = `/* 등록된 메뉴들을 이용하여 원하는 음식 선택, 선택된 음식들 출력,
    장바구니 내의 선택된 음식 취소, 선택된 음식들의 가격총합, 
    손님 고유의 오더넘버를 부여 */
interface myOrders extends Menu {
    orderNumber: number;
  } //Menu interface에서 orderNumber추가;
  
  class Order {
    static orderNumber: number = 1; //각각의 손님마다 다른 오더넘버가 필요하므로 static을 부여하여 조정
    private myOrder: myOrders[] = [];
    totalMenu() {
      return [burger.getMenu(), side.getMenu(), drink.getMenu()];
    }// 위의 매니저가 등록한 메뉴들을 통합으로 관리

    menuSelect(key: string) {
        //음식의 이름을 파라미터로 가저와 각 인스턴스 내에서 선택한 음식을 검색
      const aBurger = this.totalMenu()[0].find((menu) =>
        menu ? menu.name === key : null
      );
      const aSide = this.totalMenu()[1].find((menu) =>
        menu ? menu.name === key : null
      );
      const aDrink = this.totalMenu()[2].find((menu) =>
        menu ? menu.name === key : null
      );
      if (aBurger) {
        this.myOrder.push({ ...aBurger, orderNumber: Order.orderNumber });
      } else if (aSide) {
        this.myOrder.push({ ...aSide, orderNumber: Order.orderNumber });
      } else if (aDrink) {
        this.myOrder.push({ ...aDrink, orderNumber: Order.orderNumber });
      }// 검색후 장바구니에 추가
    }

    getMyOrder() {
      return this.myOrder;
    }// 장바구니에 추가된 모든 음식들 출력

    rmOder(key: string) {
        const newMenus = this.myOrder.filter((menu) => menu.name !== key);
        this.myOrder = [...newMenus];
    }// 원하지않는 음식을 선택후 그 음식을 제외한 나머지 음식을 다시 장바구니에 추가

    confirmOrder() {
        //모든 메뉴 결정후 장바구니의 아이템들을 불러와, map과 reduce 함수를 사용하여 총합 가격을계산
      const totalPrice = this.getMyOrder()
        .map((item) => item.price)
        .reduce((a, b) => a + b, 0);
      const order = { orderNumber: Order.orderNumber, totalPrice };
      Order.orderNumber++; // 마지막으로 static 오더넘버의 값을 올려주어 다음 손님은 1 증가된 넘버 부여
      return [...this.getMyOrder(), order];
    } // 장바구니의 모든 아이템들과 가격총합, 오더넘버를 리턴
  }
  
  const newOrder = new Order();`;
