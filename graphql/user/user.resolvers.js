import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { User } from '../../models/userModel.js';

const userResolvers = {
    Query: {

    },

    Mutation: {
        registerUser: async (parent, { name, email, password, confirm_password }, context, info) => {
            // validate user data
            if (password !== confirm_password) throw new Error('Passwords do not match');
            if (!email || !password || !confirm_password) throw new Error('Please fill all required fields');

            // check if user exists in mongodb
            const user = await User.findOne({ email: email });
            if (user) {
                throw new Error('User already exists');
            }

            // create new user
            const newUser = new User({ name, email, password });

            // generate token
            const access_token = newUser.createAccessToken();
            const refresh_token = newUser.createRefreshToken();

            // save user
            newUser.refreshToken = refresh_token;
            await newUser.save();

            // set cookie
            context.res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000
            });

            context.res.status(201).json({
                success: true,
                message: 'User created successfully',
                access_token: access_token,
                user: newUser,
            });
        },


        loginUser: async (parent, { email, password }, context, info) => {
            if (!email || !password) throw new Error('Please fill all required fields');

            const user = await User.findOne({ email: email });
            if (!user) throw new Error('User does not exist');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Invalid login credentials');

            const access_token = user.createAccessToken();
            const refresh_token = user.createRefreshToken();

            user.refreshToken = refresh_token;
            await user.save();

            // set cookie
            context.res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000
            });

            context.res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                access_token: access_token,
                user: user,
            });
        },
    }
};

export default userResolvers;