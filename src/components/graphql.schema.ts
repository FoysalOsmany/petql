import { buildSchema } from "type-graphql";

export async function graphSchema() {
  return await buildSchema({
    resolvers: [__dirname + "/**/*.resolver.ts"],
  });
}
