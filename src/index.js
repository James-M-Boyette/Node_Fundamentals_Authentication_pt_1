// "Initial Setup Tests"
// console.log('Node Auth is running')
// import "./db.js";

// "Enivronment Variables"
import "./env.js" // "Loads & runs file immediately"; clarify later

// "Server Library"
import { fastify } from "fastify";

// "Static File Directory Plugin"
// import fastifyStatic from "fastify-static"; // Depricated ...
import fastifyStatic from "@fastify/static";

// "ESM Work-Arounds for __dirname"
import path from "path";
import { fileURLToPath } from "url";

// "Database connection"
import { connectDB } from "./db.js"

import { registerUser } from "./accounts/register.js"; 

// "ESM-specific syntax requirements for accessing static files"
const __filename = fileURLToPath(import.meta.url) // get metadata about files
const __dirname = path.dirname(__filename)

// "Constants / Middleware"
const app = fastify();
const port = 3000;

// "ENV structuring"
// console.log(process.env.MONGO_URL)

async function startApp(){
    try {
        // "Root Directory"
        app.register(fastifyStatic, {
            root: path.join(__dirname, "public"),
        })

        // "Routes"
        // Note: these override any native routing behavior, so, we've commented-out the basic GET in order to serve the index.html automatically ...
        // app.get('/', {}, (request, reply) => {
        //     reply.send({
        //         data: "Hello World!"
        //     })
        // })

        app.post('/api/register', {}, async (request, reply) => {
            // console.log('request:', 'email:', request.body.email, 'password:', request.body.password);
            try {
                await registerUser(request.body.email, request.body.password);
            } catch (e) {
                console.error(e)
            }
            
            reply.send({
                data: "Hello World!"
            })
        })
        
        // "Start Server"
        await app.listen(port)

        console.log(`🚀 Server Listening at port: ${port}`)
        
    } catch (e) {
        console.error(e)
    }
}

connectDB().then(() => startApp())

