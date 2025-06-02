const session = require('express-session');

console.log('DISABLE_REDIS:', process.env.DISABLE_REDIS);
if (process.env.DISABLE_REDIS === 'true') {
  console.log('Redis connection disabled. Using default session store.');
  module.exports = session({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Defina true se for HTTPS
      maxAge: 3600000,
      httpOnly: true
    }
  });
  return;
}

const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = session({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    secure: false, // Defina true se for HTTPS
    maxAge: 3600000,
    httpOnly: true
  }
});
