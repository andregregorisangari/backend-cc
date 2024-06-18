const { registrationAuthModel, loginAuthModel, logoutAuthModel } = require('../models/authModel.js');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

// Hash password
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Registration
const registration = async (req, res) => {
    const { body } = req;
    const user_id = nanoid(16);
    const dates = new Date();

    try {
        const [user] = await loginAuthModel(body);

        // Check if email is already registered
        if (user.length !== 0) {
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Email is already registered',
            });
        }

        // Encrypt password
        const hashedPassword = await hashPassword(body.password);
        await registrationAuthModel(body, user_id, dates, hashedPassword);

        // Remove password from response data
        const responseData = { ...req.body };
        delete responseData.password;

        res.json({
            code: 200,
            status: 'OK',
            message: 'Registration is successful',
            data: responseData,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
        });
    }
};

// Login
const login = async (req, res) => {
    const { body } = req;

    try {
        const [user] = await loginAuthModel(body);

        // Check if email exists
        if (user.length === 0) {
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Email not correct',
            });
        }

        const isMatch = await bcrypt.compare(body.password, user[0].password);

        if (!isMatch) {
            // Incorrect password
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Password not correct',
            });
        } else {
            // Generate token
            const loguser = { id: user[0].user_id, email: user[0].email };
            const accessToken = jwt.sign(loguser, process.env.SECRET_KEY, { expiresIn: '60d' });
            const refreshToken = jwt.sign(loguser, process.env.REFRESH_TOKEN_KEY);

            res.json({
                code: 200,
                status: 'OK',
                message: 'Logged in successfully',
                data: {
                    name: user[0].name,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
        });
    }
};

// Refresh Token
const refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate refresh token' });
        }

        const user = { id: decoded.user_id, email: decoded.email };
        const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '60d' });

        res.json({
            code: 200,
            status: 'OK',
            message: 'Refresh token successfully',
            data: { accessToken },
        });
    });
};

// Logout
const logout = async (req, res) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const [data] = await logoutAuthModel(token);

            res.json({
                code: 200,
                status: 'OK',
                message: 'Logout successfully',
            });
        } else {
            res.json({
                code: 422,
                status: 'Unprocessable Entity',
                message: 'Token required',
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
        });
    }
};

module.exports = {
    registration,
    login,
    refresh,
    logout,
};

// Path: src/models/authModel.js