const dbPool = require("../config/connection.js");

// Get Data by token
const getByTokenUserModel = (user_id) => {
    const SQLQuery = "SELECT username, email FROM user WHERE user_id=?";
    const values = [user_id];

    return dbPool.execute(SQLQuery, values);
};

// Check email
const checkEmailUser = (body, user_id) => {
    const SQLQuery = "SELECT email FROM user WHERE email=? AND user_id!=?";
    const values = [body.email, user_id];

    return dbPool.execute(SQLQuery, values);
};

// Get password
const getPasswordFromDatabase = (user_id) => {
    const SQLQuery = "SELECT password FROM user WHERE user_id=?";
    const values = [user_id];

    return dbPool.execute(SQLQuery, values);
};

// UPDATE DATA
const updateUserModel = (body, user_id, dates) => {
    const SQLQuery = "UPDATE user SET username=?, email=?, updated_at=? WHERE user_id=?";
    const values = [body.username, body.email, dates, user_id];

    return dbPool.execute(SQLQuery, values);
};

// Change password
const changePasswordModel = (user_id, hashedPassword, dates) => {
    const SQLQuery = "UPDATE user SET password=?, updated_at=? WHERE user_id=?";
    const values = [hashedPassword, dates, user_id];

    return dbPool.execute(SQLQuery, values);
};

// Delete user
const deleteUserModel = (user_id) => {
    const SQLQuery = "DELETE FROM user WHERE user_id=?";
    const values = [user_id];

    return dbPool.execute(SQLQuery, values);
};

module.exports = {
    getByTokenUserModel,
    checkEmailUser,
    getPasswordFromDatabase,
    changePasswordModel,
    updateUserModel,
    deleteUserModel
};
// Compare this snippet from src/controller/userController.js: