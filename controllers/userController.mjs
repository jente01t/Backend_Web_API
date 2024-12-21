import User from "../models/UserModel.mjs";

export const registerUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = new User({username, password});
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if (user && await user.matchPassword(password)) {
            res.status(200).json({message: 'User logged in successfully'});
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }   
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}