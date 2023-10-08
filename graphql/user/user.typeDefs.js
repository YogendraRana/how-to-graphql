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
        user: User
    }


    # query type
    type Query {
        getUser(id: ID!): User,
        getUsers: [User],
    }


    # mutation type
    type Mutation {
        registerUser (name: String, email: String!, password: String!, confirm_password: String!): RegisterResponse!, 
        
        
        deleteUser(id: ID!): [User],
    }
`;

export default userTypeDefs;