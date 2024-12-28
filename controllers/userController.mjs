import User from "../models/UserModel.mjs";

export const registerUser = async (req, res) => {
    const {firstName, lastName, email, phoneNumber, birthDate, password} = req.body;

    try {
        const user = new User({
            firstName,
            lastName, 
            email,
            phoneNumber,
            birthDate,
            password
        });
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (user && await user.matchPassword(password)) {
            res.status(200).json({message: 'User logged in successfully'});
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }   
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const usersname = await User.find({}).select('firstName lastName email phoneNumber birthDate'); 
        res.status(200).json(usersname);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getUserById = async (req, res) => {
    try {
        const userID = await User.findById(req.params.id);
        if (userID) {
            res.status(200).json(userID);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.birthDate = req.body.birthDate || user.birthDate;
            if (req.body.password) {
                user.password = req.body.password;
            }
            await user.save();
            res.status(200).json({message: 'User updated successfully'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.status(200).json({message: 'User deleted successfully'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
