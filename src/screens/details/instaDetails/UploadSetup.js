export const UploadSetup =
  `const PORT = process.env.PORT;

  const startServer = async () => {
    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        return {
          loggedInUser: await getLoggedinUser(req.headers.token),
          protectResolver,
          client: client,
        };
      },
      csrfPrevention: true,
      cache: "bounded",
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });// 기존의 아폴로서버
  
    await apollo.start();
    const app = express(); // express설치후
    app.use(graphqlUploadExpress()); //graphqlUploadExpress 미들웨어가동
    app.use(logger("tiny"));
    app.use("/static", express.static("uploads")); //업로드를 위한 url endpoint 설정
    apollo.applyMiddleware({ app });
  
    await new Promise<void>((func) => app.listen({ port: PORT }, func));
    console.log(` +
  "`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`" +
  `);
  };
  startServer();`;
