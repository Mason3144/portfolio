export const SendMessage = `import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: async (
      _,
      { payload, roomId, userId },
      //기존에 채팅방이 존재하면 roomId로 채팅방 id를 받고 존재하지않을경우 userId로상대방 id를받음
      { loggedInUser, protectResolver, client }
    ) => {
      protectResolver(loggedInUser);
      let room = null;
      if (userId) {
        const user = await client.user.count({
          where: {
            id: userId,
          }, // userId를받앗다면(기존의 채팅방이 없다면) 상대 유저가 존재하는지 먼저 체크후
        });

        if (!user) {
          return { ok: false, error: "the User not found" };
        }
        room = await client.room.create({
          data: {
            users: { connect: [{ id: userId }, { id: loggedInUser.id }] },
          },// 새로운 채팅방을 만든후 가변변수 room에 채팅방 정보 등록
        });

      } else if (roomId) {
        //만약 userId가 아닌 roomId를 받앗다면(기존의 채팅방존재)
        room = await client.room.findUnique({
          where: {
            id: roomId,
          },
          select: { id: true },
        }); 가변변수 room에 채팅방 id 등록

        if (!room) {
          return { ok: false, error: "the Room not found" };
        }
      }

      const message = await client.message.create({
        data: {
          payload,
          room: { connect: { id: room.id } },
          user: { connect: { id: loggedInUser.id } },
        }, // message를 database에 생성후 생성자와 채팅방을 연결
      });

      pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
      // pubsub을 이용하여 NEW_MESSAGE라는 이벤트를 생성후 
      // roomUpdates라는 subscription으로 생성된 message를 보냄

      return { ok: true, id: message.id };
    },
  },
};

export default resolvers;
`;

export const RoomUpdates = `import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { subscriptionResolver } from "../../types";

const resolvers: subscriptionResolver = {
  Subscription: {
    roomUpdates: {
      subscribe: async (_, { id }, { client, loggedInUser }) => {
        const room = await client.room.findFirst({
          where: { id, users: { some: { id: loggedInUser.id } } },
          //argument로 받은 채팅방의 id와 유저의 id를 이용하여 채팅방을 찾음
          select: { id: true },
        });
        if (!room) {
          throw new Error("Room not found");
        } // 채팅방이 존재하지 않다면 Subscription이 가동되지않음 

        return withFilter(
            // withFilter를 이용하여 사용자와 관련된 채팅방만 확인할수있게 필터링해줌
          () => pubsub.asyncIterator(NEW_MESSAGE), 
          //asyncIterator를 이용하여 NEW_MESSAGE라는 이벤트를 추적

          async ({ roomUpdates }, { id }, { loggedInUser }) => {
            // sendMessage mutation을 통해 message 정보를 roomUpdates로 받고
            // 채팅방 id를 프론트엔드에서 받음

            if (roomUpdates.roomId === id) {
              const room = await client.room.findFirst({
                where: { id, users: { some: { id: loggedInUser.id } } },
                select: { id: true },
              }); 
              if (!room) {
                return false;
              } // 채팅방에 로그인된 유저가 참여 되있지 않다면 false를 리턴

              return true;
            } // message의 채팅방id와 프론트엔드의 id가 동일하고 유저가 참여되있는 채팅방을 찾을경우 true를 리턴
            // 리턴값이 true일경우 withFilter함수는 유저에게 그 채팅방의 message를 보여줌

          }
        )(_, { id }, { loggedInUser });
      },
    },
  },
};

export default resolvers;
`;
