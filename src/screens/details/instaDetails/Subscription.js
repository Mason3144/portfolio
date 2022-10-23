export const Subscription =
  `const startServer = async (): Promise<void> => {
  const app = express();
  app.use(graphqlUploadExpress());
  app.use("/static", express.static("uploads"));
  // 파일 upload를 위한 express server설정

  const httpServer: Server = createServer(app);
  // http server생성

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  }); ws server생성

  const serverCleanup = useServer(
    {
      schema, // GraphQLSchema를 이용하여 resolver와 schema파일들 통합후 관리필요

      context: async ({ connectionParams }) => {
        // websocket에는 request나 response가 없기에 ws서버에서 request를 받기위해 설정
        return {
          loggedInUser: await getLoggedinUser(connectionParams.token),
          protectResolver,
          client: client,
        };
      },
    },
    wsServer
  );

    //기존의 apollo 서버생성후 http와 ws서버 종료를 위한 플러그인 추가
  const apollo: ApolloServer = new ApolloServer({
    schema,
    introspection: true,
    context: async ({ req }) => {
      return {
        loggedInUser: await getLoggedinUser(req.headers.token),
        protectResolver,
        client: client,
      };
    },
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // http 서버 종료를 위한 플러그인

      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            }, // ws서버 종료를 위한 플러그인

          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await apollo.start();
  apollo.applyMiddleware({ app });
  httpServer.listen(process.env.PORT, () => //express.listen이 아닌 httpServer.listen을 해주어야함
    console.log(
      ` +
  "`🚀 Server: http://localhost:${process.env.PORT}${apollo.graphqlPath}`" +
  `
    )
  );
};
startServer();
`;

export const PubSub = `import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
// Publish와 Subscription 이벤트를 위한 함수
export default pubsub;
`;
