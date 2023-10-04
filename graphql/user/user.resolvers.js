import users from '../../data/users.js';

let users_list = users;

const userResolvers = {
    Query: {
        getUser (parent, {id}, context, info) {
            const user = users_list.find(user => user.id === id);
            return user;
        },
        getUsers () {
            return users;
        },
    },

    Mutation: {
        deleteUser (parent, {id}, context, info) {
            users_list = users_list.filter(user => user.id !== id);
            return users_list;
        }
    }
};

export default userResolvers;