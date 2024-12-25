import jwt from 'jsonwebtoken';
import User from '../models/UserModel.mjs';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                message: 'Not authorized, no token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); //https://stackoverflow.com/questions/63804747/how-to-generate-and-set-jwt-secret-and-jwt-expiration-time-in-express
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({
                message: 'Not authorized, user not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Not authorized, token failed'
        });
    }
};