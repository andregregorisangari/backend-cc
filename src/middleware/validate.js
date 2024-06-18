const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        // Create an empty variable to store error messages
        const errorMessages = {};
        // Iterate to extract error paths
        error.details.forEach((detail) => {
            const path = detail.path[0];
            const message = detail.message.replace(/['"]/g, '');
            // Check if the path is already available
            if (errorMessages[path]) {
                errorMessages[path].push(message);
            } else {
                errorMessages[path] = [message];
            }
        });
        res.status(400).json({
            code: 400,
            status: 'BAD REQUEST',
            message: errorMessages,
        });
    } else {
        next();
    }
};

module.exports = { validate };
