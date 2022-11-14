export const iceFront = `## Client side ##
const handleIce = (data) => {// 처음 방에 입장시 RTC설정을 통해 실행된다.
    socket.emit("ice", data.candidate, roomName); // 각자의 ice candidate을 서버를 통해 상대방에게 전달
  };
  
socket.on("ice", (ice) => {
    myPeerConnection.addIceCandidate(ice);
}); // 상대방의 ice candidate을 자신의 RTC커넥션에 등록
    `;

export const iceBack = `## Server side ##
socket.on("ice", (ice, roomName) => { // ice라는 이벤트로 candidate이 넘어오면
    socket.to(roomName).emit("ice", ice); // 다른 룸 참여자에게 자신의 cadidate을 넘겨줌
  });`;
