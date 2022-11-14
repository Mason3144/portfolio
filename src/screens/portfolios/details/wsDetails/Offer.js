export const offerFront = `## Client side - 호스트 ##
let dataChannel;

/*RTC연결을 위해 호스트(peer A)에서 게스트(peer B)쪽으로 offer를 전달해준다. */
/*RTC 커넥션에는 각각 offer와 answer가 존재하며 호스트와 게스트를 식별하는데 사용된다. */
/*호스트에서 offer를 생성후 게스트에게 전달, 게스트에서 answer를 생성후 호스트로 전달 */

socket.on("welcome", async () => { // 사용자가 처음 접속후 백엔드에서 welcome이벤트를 받으면
  dataChannel = myPeerConnection.createDataChannel("chat"); // 실시간 채팅을 위한 데이터채널을 호스트에서 생성한다.
  dataChannel.addEventListener("message", handleMessage); // (datachannel을 통해 전달받은 메세지를 보여주기 위한 설정)

  const offer = await myPeerConnection.createOffer(); // 게스트에게 줄 offer를 생성후
  myPeerConnection.setLocalDescription(offer); // 생성된 offer를 자신(호스트)의 RTC커넥션에 등록
  socket.emit("offer", offer, roomName); // 이후 생선된 offer를 백엔드로 보낸후 게스트쪽으로 전달해준다.
});`;
export const offerBack = `## Server side ##

socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  }); // 호스트에게 받은 offer를 roomName안의 게스트에게 전달`;
