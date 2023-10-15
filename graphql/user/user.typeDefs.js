const userTypeDefs = `#graphql
    type User {
        id: ID!
        name: String
        email: String!
        password: String!
    }

    # response type
    type LoginResponse {
        success: Boolean!
        message: String!
        access_token: String!
    }

    type RegisterResponse {
        success: Boolean!
        message: String!
        access_token: String!
        new_user: User!
    }

    type DeleteUserResponse {
        success: Boolean!
        message: String!
        deleted_user: User!
        
    }


    # query type
    type Query {
        getUser(id: ID!): User!,
        getUsers: [User!]!,
    }


    # mutation type
    type Mutation {
        # register user
        registerUser (name: String, email: String!, password: String!, confirm_password: String!): RegisterResponse!,
        
        # login user
        loginUser (email: String!, password: String!): LoginResponse!,

        # delete user
        deleteUser (email: String!): DeleteUserResponse!,
    }
`;

export default userTypeDefs;