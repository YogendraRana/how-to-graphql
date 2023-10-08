import chalk from "chalk";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';


// import typeDefs
import userTypeDefs from '../graphql/user/user.typeDefs.js';


// import resolvers
import userResolvers from '../graphql/user/user.resolvers.js';


// apollo server
const typeDefs = [userTypeDefs];
const resolvers = [userResolvers];
export const apolloServer = new ApolloServer({ typeDefs, resolvers });


// start apollo server 
export const startApolloServer = async () => {
    const { url } = await startStandaloneServer(apolloServer, { listen: { port: 4000 }});
    console.log(chalk.bgCyan(`Apollo Server ready at ${url}`));
}