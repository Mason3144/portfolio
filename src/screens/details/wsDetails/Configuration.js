export const frontend = `##  초기설정 및 room 참여 ##

let roomName;

//welcomeForm에서 사용자가 room name을 입력후
const handleWelcomeSubmit = async (event) => {
  const input = welcomeForm.querySelector("input");
  await makeConnection(); // P2P통신을 위한 RTC 피어 케넥션을 연결하고
  socket.emit("join_room", input.value); //emit을 이용해 "join_room"이라는 이벤트로 input값(room name)을 백엔드로 보낸다.
  roomName = input.value; // 입력받은 room name을 가변변수로 저장
  input.value = "";
};

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

`;
export const stunServer = `## RTC 피어커넥션 생성 및 STUN서버 설정 ##

/*RTC란???
Real Time Comunication의 약자로, RTC를 이용하면 서버를 거치지않고 사용자들간의 P2P통신이 가능하다.
서버에 부담이 적은 장점이있지만 데이터가 서버에 저장되지않는다는 단점이 있음. */

/*STUN서버란??
STUN서버를 이용하면 일반 기기에서도 외부 네트워크에서도 접근이 가능한 공용IP주소를 갖게 해줌 */

let myPeerConnection
const makeConnection = () => {
  myPeerConnection = new RTCPeerConnection({ // RTC피어커넥션을 생성후 가변변수에 값을 저장
    iceServers: [ 
      {
        urls: ["stun:ntk-turn-2.xirsys.com"], // 구글의 무료 STUN서버를 이용하였다.
      },
      {
        username:
          "*********************",
        credential: "******-****-****-****-********",
        urls: [
          "turn:ntk-turn-2.xirsys.com:80?transport=udp",
          "turn:ntk-turn-2.xirsys.com:3478?transport=udp",
          "turn:ntk-turn-2.xirsys.com:80?transport=tcp",
          "turn:ntk-turn-2.xirsys.com:3478?transport=tcp",
          "turns:ntk-turn-2.xirsys.com:443?transport=tcp",
          "turns:ntk-turn-2.xirsys.com:5349?transport=tcp",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  /* icecandidate라는 이벤트가 발생하면 각 클라이언트에서 생성된 
  icecandidate를 상대방과 교환해주어야함(이후 설명) */
};`;

export const wsBackend = `import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer); //SocketIO를 이용하여 websocekt서버 생성

/* .on("connection",fn)을 이용하여 websocket 요청을 받으면 실행 */
wsServer.on("connection", (socket) => { 
  socket.on("join_room", (roomName) => { // 처음 클라이언트에서 "join_room"이라는 이벤트 요청을 받으면
    socket.join(roomName); // join을 이용하여 특정 room을 생성하거나 조인함
    socket.to(roomName).emit("welcome"); //to를 이용하여 실행될 방을 특정짓고 "welcome"이라는 이벤트를 프론트엔드로 요청
  });
});
`;
