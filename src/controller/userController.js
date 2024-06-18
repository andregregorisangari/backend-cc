const {
    getByTokenUserModel, updateUserModel, checkEmailUser, getPasswordFromDatabase, changePasswordModel, deleteUserModel
} = require('../models/userModel.js');
const bcrypt = require('bcrypt');

// Get by token
const getByTokenUser = async (req, res) => {
    const user_id = req.user_id;
    try {
        const [data] = await getByTokenUserModel(user_id);
        if (data.length === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
            });
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Success grab data user',
                data: data,
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

// Update data
const updateUser = async (req, res) => {
    const user_id = req.user_id;
    const { body } = req;
    const dates = new Date();
    try {
        // Check if email is already registered
        const [isRegister] = await checkEmailUser(body, user_id);
        if (isRegister.length !== 0) {
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Email is already registered',
            });
        }

        const [data] = await updateUserModel(body, user_id, dates); // Update data
        if (data.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
            });
        } else {
            const responseData = { ...req.body };
            delete responseData.password;
            res.json({
                code: 200,
                status: 'OK',
                message: 'update user is success',
                data: responseData,
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

// Change Password
const changePassword = async (req, res) => {
    const user_id = req.user_id;
    const { body } = req;
    const dates = new Date();
    const hashedPassword = await hashPassword(body.newPassword);
    try {
        const [check] = await getPasswordFromDatabase(user_id);

        // Check if old password matches
        const isMatch = await bcrypt.compare(body.oldPassword, check[0].password);
        if (!isMatch) {
            // Password tidak cocok
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Password not correct',
            });
        } else {
            const [data] = await changePasswordModel(user_id, hashedPassword, dates);
            res.json({
                code: 200,
                status: 'OK',
                message: 'change password is success',
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

// Hash password
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// DELETE USER
const deleteUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        // Perform the user deletion
        const [data] = await deleteUserModel(user_id);

        // Check if the user was successfully deleted
        if (data.affectedRows === 0) {
            return res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'User not found or could not be deleted',
            });
        }

        res.json({
            code: 200,
            status: 'OK',
            message: 'User deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
        });
    }
};

module.exports = {
    getByTokenUser,
    updateUser,
    changePassword,
    deleteUser
};