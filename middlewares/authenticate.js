const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('.')[1];
        console.log(token);
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authenticate };