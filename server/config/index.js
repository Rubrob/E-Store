const {
    NODE_ENV,
    DB_NAME = 'e-store',
    DB_PW = 'Qwerty-123',
    JWT_SECRET = 'R5xIORSlCGAK3hPxq4aKF0X8E7n9JApIBwI9M2NPOQ26CvTkovdNCeEjER4Qw1E',

    G_CLIENT_ID = 'None',
    G_CLIENT_SECRET = 'None',
    FB_CLIENT_ID = 'None',
    FB_CLIENT_SECRET = 'None',
} = process.env;

module.exports = {
    DB_URI: `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0-3qsgw.mongodb.net/${DB_NAME}?retryWrites=true`,
    JWT_SECRET,
    oauth: {
        google: {
            G_CLIENT_ID,
            G_CLIENT_SECRET,
        },
        facebook: {
            FB_CLIENT_ID,
            FB_CLIENT_SECRET,
        },
    },
};
