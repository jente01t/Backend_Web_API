import mongoose from "mongoose";
import bycrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
        },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bycrypt.compare(password, this.password);
};


export default mongoose.model('User', userSchema);



