import "reflect-metadata";

import * as http from 'http';
import 'reflect-metadata';
import { app } from './app';
import {Application} from "express";
import {ApolloServer, gql} from "apollo-server-express";

const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

let server:Application;

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

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// @ts-ignore
server = http.createServer(app);

apolloServer.applyMiddleware({ app });

server.listen(port, '0.0.0.0', () => {
  console.log(`PetQL Server Started :) 
    Listening on localhost:3000 
    GraphQL: ${apolloServer.graphqlPath}`);
});

export {server};
