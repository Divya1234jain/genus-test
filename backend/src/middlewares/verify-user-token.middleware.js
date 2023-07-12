const statusCodes = require("../config/status-codes");
const statusMessage = require("../config/status-message");
const UserSessoins = require("../database/operation/user-sessions");
const Users = require("../database/operation/users");
const logger = require("../logger/logger");
const { TokenService } = require("../services/token.service");

function sendUnauthorizedResponse(_res, code, message) {
    _res.clearCookie("auth_token");
    _res.status(code).send({ message });
}

module.exports = async (_req, _res, _next) => {
    try {
        if (!_req.cookies?.auth_token && !_req?.headers?.authorization) {
            return sendUnauthorizedResponse(_res, statusCodes.FORBIDDEN, statusMessage.NO_AUTHORIZATION_HEADER);
        }
        // Read token from request cookies
        let token = _req.cookies?.auth_token;
        if (!token) {
            // if not found in cookie then Read Token from Request header and check for Bearer token
            const tokenInfo = _req?.headers?.authorization?.split(" ");
            token = (tokenInfo?.length && (/^Bearer$/i.test(tokenInfo[0]))) ? tokenInfo[1] : "";
            if (!token) {
                return sendUnauthorizedResponse(_res, statusCodes.FORBIDDEN, statusMessage.NO_AUTHORIZATION_HEADER);
            }
        }

        // Decode the token and check for valid data
        const tokenData = TokenService.decodeToken(token);
        if (!tokenData?.id) {
            return sendUnauthorizedResponse(_res, statusCodes.UNAUTHORIZED, statusMessage.SESSION_EXPIRED);
        }

        // Get User information from the 
        const users = new Users();
        const userSessions = new UserSessoins();
        const [userData, userSession] = await Promise.all([
            users.findOne({ id: tokenData.userId }, undefined, undefined, undefined, undefined, false),
            userSessions.findOne({ userId: tokenData.userId, id: tokenData.id })
        ]);
        if (!userData || !userData.isActive || !userSession) {
            return sendUnauthorizedResponse(_res, statusCodes.UNAUTHORIZED, statusMessage.SESSION_EXPIRED);
        }

        const tokenObj = TokenService.verifyToken(token, userData.password);
        if (!tokenObj || !tokenData?.iat) {
            return sendUnauthorizedResponse(_res, statusCodes.UNAUTHORIZED, statusMessage.SESSION_EXPIRED);
        }

        const totalSessionActiveTime = new Date().getTime() - new Date(userSession.lastActiveAt).getTime();
        const defaultSessionTimeout = 30 * 60 * 1000;
        if (totalSessionActiveTime > defaultSessionTimeout) {
            return sendUnauthorizedResponse(_res, statusCodes.UNAUTHORIZED, statusMessage.SESSION_EXPIRED);
        }
        // update last active time once in every minutes
        if (totalSessionActiveTime > 60 * 1000) {
            await userSessions.update({ lastActiveAt: Date.now() }, { id: userSession.id });
            _res.cookie("auth_token", `${token}`, { maxAge: 1800000 });
        }
        _req.token = token;
        _req.tokenData = tokenData;
        _req.user = {
            id: tokenData.id,
            userId: userData.id,
            status: userData.isActive,
            email: userData.email
        };
        return _next();
    } catch (error) {
        logger.info(error);
        sendUnauthorizedResponse(_res, statusCodes.INTERNAL_ERROR, statusMessage.INTERNAL_SERVER_ERROR);
    }
};
