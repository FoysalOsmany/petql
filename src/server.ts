import "reflect-metadata";

import * as http from 'http';
import 'reflect-metadata';
import {app} from './app';
import {Application} from "express";
import {ApolloServer, gql} from "apollo-server-express";
import {graphSchema} from "./components/graphql.schema";

const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

let server: Application;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// @ts-ignore
server = http.createServer(app);

graphSchema()
  .then(schema => {
    const apolloServer = new ApolloServer({
      schema,
      playground: true
    });

    apolloServer.applyMiddleware({app});

    console.log(`GraphQL Server Listening on localhost:3000${apolloServer.graphqlPath}`);
  })
  .catch(e => {
    console.error('GraphQL exception: ', e);
    throw new Error(e);
  });

server.listen(port, '0.0.0.0', () => {
  console.log(`PetQL Server Started :) 
    APIs Listening on localhost:3000`);
});

export {server};
