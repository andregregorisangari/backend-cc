const dbPool = require('../config/connection.js');

// Register
const registrationAuthModel = (body, user_id, dates, hashedPassword) => {
    const SQLQuery = "INSERT INTO user (user_id, username, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [user_id, body.username, body.email, hashedPassword, dates, dates];

    return dbPool.execute(SQLQuery, values);
};

// Login
const loginAuthModel = (body) => {
    const SQLQuery = "SELECT * FROM user WHERE email=?";
    const values = [body.email];

    return dbPool.execute(SQLQuery, values);
};

// Logout
const logoutAuthModel = (token) => {
    const SQLQuery = "INSERT INTO blacklist (token) VALUES (?)";
    const values = [token];

    return dbPool.execute(SQLQuery, values);
};

// Check Token
const logoutCheck = async (token) => {
    const SQLQuery = "SELECT * FROM blacklist WHERE token=?";
    const values = [token];

    return dbPool.execute(SQLQuery, values);
};

module.exports = {
    registrationAuthModel,
    loginAuthModel,
    logoutAuthModel,
    logoutCheck
};

// path: src/controller/authController.js