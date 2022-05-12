import bcrypt from 'bcryptjs';
const { genSalt, hash } = bcrypt;

// import { user } from "../user/user.js"; 
// The above threw an ?order of execution? error for Scott, so he dynamically imported it within the 'registerUser' function

export async function registerUser(email, password) {
    const { user } = await import("../user/user.js") // Dynamically-importing rather than at the beginning of the file

    // generate salt
    const salt = await genSalt(10); // Specifies how long the salt should be

    // hash with salt
    const hashedPassword = await hash(password, salt)

    // store in DB
    const result = await user.insertOne({
        email: {
            address: email,
            verified: false, // Future-proofing by anticipating company's future need to add "verify email" step in user sign-up
        },
        password: hashedPassword,
    })

    // return user from DB
    return result.insertedId

}