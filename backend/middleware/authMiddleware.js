const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log('Request Headers:', req.headers);  // Log all headers to debug
    const authHeader = req.headers.authorization; 
    console.log('Authorization Header:', authHeader); 

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];  // Expecting format "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token
        req.user = decoded.userId;  // Attach the userId to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = authMiddleware;
