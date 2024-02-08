const { validateToken } = require('../utils/authUtils');

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    const userData = await validateToken(token);

    if (userData.role !== 'ADMIN') return res.status(403).send('Access Denied');
    req.user = userData;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
}
