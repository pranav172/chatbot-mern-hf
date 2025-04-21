// Basic error handler - enhance as needed
const errorHandler = (err, req, res, next) => {
    console.error("ERROR => ", err.stack); // Log error stack trace to console

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Use existing status code or default to 500
    res.status(statusCode);

    res.json({
        message: err.message,
        // Provide stack trace only in development mode for security
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;