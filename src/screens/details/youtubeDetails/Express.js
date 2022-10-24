export const Express =
  `require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import schema from "./schema";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import client from "./client";
import { loggedinUser, protectedUser } from "./users/users.utils";

async function startServer() {
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    context: async ({ req }) => {
      return {
        client,
        protectedUser,
        loggedinUser: await loggedinUser(req.headers.token),
      };
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  await server.start();

  const app = express();
  // express 다운로드

  app.use(graphqlUploadExpress());
  // graphqlUploadExpress를 미들웨어로 가동

  server.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  console.log(` +
  "`🚀 Server ready at http://localhost:4000${server.graphqlPath}`" +
  `);
}

startServer();
`;

export const typeDefs =
  `import { gql } from "apollo-server-express";

export default gql` +
  "`" +
  `
  scalar Upload
  // Graphql 파일 업로드를 위한 scalar추가
  
  type Mutation {
    createVideo(
      video: Upload!
      videoName: String!
      description: String!
      chennelId: Int!
    ): MutationResult
  }
` +
  "`";
