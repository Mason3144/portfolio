export const answerFrontGuest = `## Client side - 게스트 ##
let dataChannel;

/*게스트쪽에서 offer를 받은후 answer를 만들고 그 answer와 호스트에게 받은 offer를 RTC에 등록, 그후 호스트쪽으로 answer전달*/
socket.on("offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (event) => { // 호스트가 생성한 데이터채널을 RTC를 통해 전달받음
    dataChannel = event.channel;  // 전달받은 데이터채널을 가변변수에 저장
    dataChannel.addEventListener("message", handleMessage); // (datachannel을 통해 전달받은 메세지를 보여주기 위한 설정)
  });

  myPeerConnection.setRemoteDescription(offer); // 호스트에게 받은 offer를 RTC에 등록
  const answer = await myPeerConnection.createAnswer(); // 호스트에게 줄 answer를 생성
  myPeerConnection.setLocalDescription(answer); // 생성한 answer를 자신(게스트)의 RTC에 등록
  socket.emit("answer", answer, roomName); // 생성한 answer를 백엔드를 통해 호스트로 전달
});`;
export const answerBack = `## Server side ##

socket.on("answer", (answer, roomName) => {
  socket.to(roomName).emit("answer", answer);
}); // 게스트에게서 받은 answer를 roomName안의 호스트에게 전달`;

export const answerFrontHost = `## Client side - 호스트 ##

socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
}); // 백엔드를 통해 게스트에게서 받은 answer를 호스트의 RTC에 등록

/* 이로써 각자의 식별을 위한 offer와 answer가 교환되고 마지막 절차인 icecandidate교환만 남았다. */
`;
