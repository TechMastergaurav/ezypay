module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "Gauravssecret",  // Fallback for local development
    PORT: process.env.PORT || 3000 // Default port 3000 if not set in environment
};
