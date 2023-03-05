export const config = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
};
