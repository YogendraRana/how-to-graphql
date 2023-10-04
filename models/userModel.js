import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    statics: {
        findByCredentials: async function(email, password) {
            const user = await this.findOne({email});
            if(!user) {
                throw new Error('Invalid login credentials');
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(!isPasswordMatch) {
                throw new Error('Invalid login credentials');
            }
            return user;
        }
    }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
    next();
});


export const User = mongoose.model('User', userSchema);