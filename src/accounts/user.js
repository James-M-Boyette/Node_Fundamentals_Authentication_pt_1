// "" ...

import jwt from "jsonwebtoken";
// Import JWT signature
const JWTSignature = process.env.JWT_SIGNATURE

import mongo from 'mongodb';
const { ObjectId } = mongo;

export async function getUserFromCookies(request) {
    try {
        // "Check to make sure access token exists"
        if (request?.cookies?.accessToken) { // "Optional Chaining" - doesn't trigger errors
            // "Get 'user' collection (from database)"
            const { user } = await import("../user/user.js")
            // "If access token exists"
            const { accessToken } = request.cookies;
            // "Decode access token"
            const decodedAccessToken = jwt.verify(accessToken, JWTSignature);
            // "Return user from record"
            return user.findOne({
                _id: ObjectId(decodedAccessToken.userId),
            })
        }
        // "Get access & refresh tokens"

            // "De-code JWTs"

            // "Check whether session is valid"

        // "Else decode refresh token"

        // "Look up session"

        // "If session is valid"

            // "Look up current user"

            // "Refresh tokens"

            // "Return current user"

    } catch (e) {
        console.error(e)
    }
}

export async function refreshTokens() {
    try {
        
    } catch (e) {
        console.error(e)
    }
}