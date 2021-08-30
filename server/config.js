const {
    NODE_ENV,
    DB_PW = 'Qwerty-123',
    DB_NAME = 'e-store', //e-store-tmp
    PORT = 5000,
} = process.env;

module.exports = {
    PORT,
    JWT_SECRET: 'secretauthentication',
    SESSION_SECRET: 'SESSION_SECRET',
    COOKIES_MAX_AGE: 60000 * 60 * 24 * 30, // 30 days
    PER_PAGE: 24,
    DB_URI: `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0-3qsgw.mongodb.net/${DB_NAME}?retryWrites=true`,
    G_CLIENT_ID: process.env.G_CLIENT_ID,
    G_CLIENT_SECRET: process.env.G_CLIENT_SECRET,
    FB_CLIENT_ID: process.env.FB_CLIENT_ID,
    FB_CLIENT_SECRET: process.env.FB_CLIENT_SECRET,
};
