// "Log user in: create a session)" ...

import { createSession } from "./createSession.js";

export async function logUserIn(userId, request, reply) {
    // "Get user connection info (ip, headers)"
    const connectionInformation = {
        ip: request.ip,
        userAgent: request.headers['user-agent'],
    }
    // "Create a unique 'session' in the database (based on connection info)"
    const sessionToken = await createSession(userId, connectionInformation)
    console.log('sessionToken:', sessionToken)
    // "Create JWT"

    // "Set Cookie"
    
}