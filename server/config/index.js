const {
    DB_NAME,
    DB_NAME_TEST,
    DB_PW,
    NODE_ENV,
} = process.env;

module.exports = {
    db: {
        DB_NAME: process.env.DB_NAME,
        DB_NAME_TEST: process.env.DB_NAME_TEST,
        DB_PW: process.env.DB_PW,
        DB_URI: `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0-3qsgw.mongodb.net/${DB_NAME}?retryWrites=true`
        // NODE_ENV === 'test' ?
        //     `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0-3qsgw.mongodb.net/${DB_NAME_TEST}?retryWrites=true` :
        //     `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0-3qsgw.mongodb.net/${DB_NAME}?retryWrites=true`
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