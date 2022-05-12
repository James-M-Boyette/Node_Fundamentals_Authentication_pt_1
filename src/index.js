// "Enivronment Variables"
import "./env.js" // "Loads & runs file immediately"; clarify later

// "Server Library"
import { fastify } from "fastify";

// "Static File Directory Plugin"
import fastifyStatic from "@fastify/static";

// "ESM Work-Arounds for __dirname"
import path from "path";
import { fileURLToPath } from "url";

// "Cookie "
// import fastifyCookie from 'fastify-cookie';
import fastifyCookie from '@fastify/cookie';

// "Salted user credentials"
import { registerUser } from "./accounts/register.js"; 

// "Database connection"
import { connectDB } from "./db.js"

// "Verify User Credentials"
import { authorizeUser } from "./accounts/authorize.js";

// 
import { logUserIn } from './accounts/logUserIn.js';


// "ESM-specific syntax requirements for accessing static files"
const __filename = fileURLToPath(import.meta.url) // get metadata about files
const __dirname = path.dirname(__filename)

// "Constants / Middleware"
const app = fastify();
const port = 3000;

// console.log(process.env.MONGO_URL)
// console.log(process.env.COOKIE_SIGNATURE)

async function startApp(){
    try {
        app.register(fastifyCookie, {
            // Import Cookie signature
            secret: process.env.COOKIE_SIGNATURE,
        })

        // "Root Directory"
        app.register(fastifyStatic, {
            root: path.join(__dirname, "public"),
        })

        // "Routes"
        app.get('/test', {}, async (request, reply) => {
            console.log(request.cookies.testCookie),
            reply.send({
                data: "Zis is a tEst ..."
            })
        })

        app.post('/api/register', {}, async (request, reply) => {
            try {
                const userId = await registerUser(
                    request.body.email, 
                    request.body.password
                    );
                    // Generate auth tokens

                    // Set cookies

                    // 
            } catch (e) {
                console.error(e)
            }
            reply.send({
                data: "Hello World!"
            })
        })

        app.post('/api/authorize', {}, async (request, reply) => {
            try {
                console.log('email:', request.body.email, 'password:', request.body.password)
                const { isAuthorized, userId } = await authorizeUser(
                    request.body.email, 
                    request.body.password
                    );

                if (isAuthorized) {
                    await logUserIn(userId, request, reply)
                    reply.send({
                        data: "User logged in succesfully!"
                    })
                }
                reply.send({
                    data: "Authentication failed ..."
                })
            } catch (e) {
                console.error(e)
            }
        })
        
        // "Start Server"
        await app.listen(port)
        console.log(`🚀 Server Listening at port: ${port}`)
        
    } catch (e) {
        console.error(e)
    }
}

connectDB().then(() => startApp())

