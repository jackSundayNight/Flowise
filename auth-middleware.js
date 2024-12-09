const basicAuth = require('basic-auth');

const auth = (req, res, next) => {
  const user = basicAuth(req);
  
  if (!user || 
      user.name !== process.env.RAILWAY_AUTH_USER || 
      user.pass !== process.env.RAILWAY_AUTH_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).send('Authentication required.');
  }
  
  return next();
};

// Add this line before your routes
app.use(auth);
