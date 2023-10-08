// The GraphQL schema
const userTypeDefs = `#graphql
    type User {
        id: ID!
        name: String
        email: String!
        password: String!
    }

    type RegisterResponse {
        success: Boolean!
        message: String!
        access_token: String!
    }


    # query type
    type Query {
        getUser(id: ID!): User,
        getUsers: [User],
    }


    # mutation type
    type Mutation {
        registerUser (name: String, email: String!, password: String!, confirm_password: String!): RegisterResponse!, 
        loginUser (email: String!, password: String!): RegisterResponse!,
    }
`;

export default userTypeDefs;