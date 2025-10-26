const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function authMiddleware(req, res, next){
    // Bearer <token>
    const token = req.headers['authorization'].split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'Token bulunamadı'});
    }
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error){
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token süresi dolmuş.', code: 'TOKEN_EXPRIRED' });
        }
        return res.status(401).json({ message: 'Geçersiz token'});
    }
};
module.exports = authMiddleware;