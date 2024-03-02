export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    refreshSecret: process.env.REFRESH_TOKEN_KEY,
    expireLimit: process.env.JWT_EXPIRE_LIMIT || '1d',
    refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_LIMIT || '2d',
  },
});
