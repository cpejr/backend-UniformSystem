const jwt = require("jsonwebtoken");

module.exports = {
  async authenticateToken(request, response, next) {
    const authHeader = request.headers.authorization;
    const [scheme, token] = authHeader
    ? authHeader.split(" ")
    : [undefined, undefined];
    
    const tokenVerified = token.includes(',') ?  token.split(',')[0] : token;
    
    if (!tokenVerified || tokenVerified === null)
      return response.status(401).json({ error: "No token provided" });

    if (!/^Bearer$/i.test(scheme))
    return response.status(401).json({ error: "Token badformatted" });

    const validToken = await new Promise((res) => {
      jwt.verify(tokenVerified, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res(false);
        request.session = user.user[0];
        
        return res(true);
      });
    });

    if (validToken) return next();
    return response.status(403).json({ error: "Invalid authorization token" });
  },

  async isAdmin(request, response, next) {
    if (request.session.user_type !== "adm")
      return response.status(403).json({ error: "Access denied!" });

    return next();
  },

  async isAdminOrEmployee(request, response, next) {
    if (
      request.session.user_type !== "adm" &&
      request.session.user_type !== "employee"
    )
      return response.status(403).json({ error: "Access denied!" });

    return next();
  },

  async authenticateOptionalToken(request, response, next) {
    const authHeader = request.headers.authorization;
    const [scheme, token] = authHeader
      ? authHeader.split(" ")
      : [undefined, undefined];

    if (!token && !scheme) return next();

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
};
