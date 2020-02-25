const { DB_PW, NODE_ENV } = process.env;

const DB_NAME = "e-store-tmp"; // DB_NAME=e-store
// const DB_NAME_TEST = "e-store_test";

// https://jwt.io/
module.exports = {
  JWT_SECRET: "secretauthentication",
  ADMIN_SECRET: "ADMIN_SECRET_CODE",
  SESSION_SECRET: "SESSION_SECRET",
  COOKIES_MAX_AGE: 60000 * 60 * 24 * 30, // 30 days
  PER_PAGE: 24, // 24 = production
  DB_URI: `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0-3qsgw.mongodb.net/${DB_NAME}?retryWrites=true`,
  // NODE_ENV === 'test' ?
  //     `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0-3qsgw.mongodb.net/${DB_NAME_TEST}?retryWrites=true` :
  //     `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0-3qsgw.mongodb.net/${DB_NAME}?retryWrites=true`
  G_CLIENT_ID: process.env.G_CLIENT_ID,
  G_CLIENT_SECRET: process.env.G_CLIENT_SECRET,
  FB_CLIENT_ID: process.env.FB_CLIENT_ID,
  FB_CLIENT_SECRET: process.env.FB_CLIENT_SECRET
};
