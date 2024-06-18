const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { logoutCheck } = require('../models/authModel.js');

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const authHeaders = req.headers['authorization'];
        const token = authHeaders.split(' ')[1];
        if (!authHeaders) {
            return res.status(401).json({ message: 'Please Authentication' });
        } else {
            const [check] = await logoutCheck(token);
            // Check if the token is blocked
            if (check.length !== 0) {
                return res.status(400).json({
                    code: 400,
                    status: 'BAD REQUEST',
                    message: 'Your token is blocked, please login again',
                });
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user_id = decoded.id;
            next();
        }
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token', err });
    }
};
module.exports = auth;
