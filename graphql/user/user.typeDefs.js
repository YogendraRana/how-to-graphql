// The GraphQL schema
const userTypeDefs = `#graphql
    type User {
        id: ID!
        name: String
        email: String!
        password: String!
    }

    type Query {
        getUser(id: ID!): User,
        getUsers: [User],
    }

    type Mutation {
        deleteUser(id: ID!): [User],
    }
`;

export default userTypeDefs;