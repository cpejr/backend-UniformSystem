const FirebaseModel = require('../models/FirebaseModel');
const UserModel = require('../models/UsersModel');
const jwt = require('jsonwebtoken');

module.exports = {
    async signin(request, response) {
        try {
            const { email, password } = request.body;
            let firebaseUid;

            try {
                firebaseUid = await FirebaseModel.login(email, password);
            } catch (error) {
                return response.status(403).json({ message: 'Invalid Credentials' });
            }
            const user = await UserModel.getUserByUid(firebaseUid);
            if(user===null || user===undefined) {
                return response.status(403).json({ message: 'Invalid Credentials' });
            }
            const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2d" });
            return response.status(200).json({ accessToken, user });

        } catch (error) {
            console.warn(error);
            return response.status(500).json({ message: 'Error while trying to validate credentials' })
        }
    },

    async verifyToken(request, response) {
        const authHeader = request.headers.authorization;
        const [scheme, token] = authHeader
        ? authHeader.split(" ")
        : [undefined, undefined];
    
        if (!token || token === null)
        return response.status(401).json({ error: "No token provided" });
    
        if (!/^Bearer$/i.test(scheme))
        return response.status(401).json({ error: "Token badformatted" });
    
        const verify = await new Promise((res) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res({ verified: false, user: {} });
    
            return res({ verified: true, user: user.user });
        });
        });
    
        if (verify !== undefined) return response.status(200).json({ valid, user } = verify);
        return response.status(403).json({ error: "Invalid authorization token" });
    },
}