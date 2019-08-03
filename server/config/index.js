module.exports = {
    db: {
        DB_NAME: process.env.DB_NAME,
        DB_NAME_TEST: process.env.DB_NAME_TEST,
        DB_PW: process.env.DB_PW
    },
    JWT_SECRET: process.env.JWT_SECRET,
    oauth: {
        google: {
            G_CLIENT_ID: process.env.G_CLIENT_ID,
            G_CLIENT_SECRET: process.env.G_CLIENT_SECRET
        },
        facebook: {
            FB_CLIENT_ID: process.env.FB_CLIENT_ID,
            FB_CLIENT_SECRET: process.env.FB_CLIENT_SECRET
        }
    }
}