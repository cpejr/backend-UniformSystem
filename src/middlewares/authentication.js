const jwt = require('jsonwebtoken');

module.exports = {

    async authenticateToken(request, response, next) {
        const authHeader = request.headers.authorization;
        const [scheme, token] = authHeader
            ? authHeader.split(" ")
            : [undefined, undefined];
    
        if (!token || token === null)
            return response.status(401).json({ error: "No token provided" });
    
        if (!/^Bearer$/i.test(scheme))
            return response.status(401).json({ error: "Token badformatted" });
    
        const validToken = await new Promise((res) => {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res(false);
        
                request.session = user.user[0];
        
                return res(true);
            });
        });
    
        if (validToken) return next();
            return response.status(403).json({ error: "Invalid authorization token" });
    },

    async isAdmin(request, response, next) {
        if (request.session.user[0].user_type !== 'admin') {
            response.status(403).json({ error: "Access denied!" });
        }
        else {
            next();
        }
    },

}