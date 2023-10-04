import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';

 const userQuery = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'UserQuery',
        fields: {
            getUsers: {
                type: new GraphQLList(new GraphQLObjectType({
                    name: 'User',
                    fields: {
                        name: { type: GraphQLString },
                    },
                })),
                resolve: () => [{name: "Alex"}, {name: "Apex"}],
            },
        },
    }),
});

export default userQuery;