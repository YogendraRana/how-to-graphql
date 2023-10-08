import users from '../../data/users.js';

let users_list = users;

import { User } from '../../models/userModel.js';

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
        registerUser: async (parent, { name, email, password, confirm_password }, context, info) => {
            // check if passwords match
            if (password !== confirm_password) throw new Error('Passwords do not match');

            // check if user exists in mongodb
            const user =  await User.findOne({email: email});
            if (user) {
                throw new Error('User already exists');
            }

            // create new user
            const newUser = new User({name, email, password});
            await newUser.save();

            // return user
            return {
                success: true,
                message: 'User created successfully',
                user: newUser,
            };
        },

        deleteUser (parent, {id}, context, info) {
            users_list = users_list.filter(user => user.id !== id);
            return users_list;
        }
    }
};

export default userResolvers;