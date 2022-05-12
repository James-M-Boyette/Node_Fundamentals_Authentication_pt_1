import bcrypt from 'bcryptjs';
const { genSalt, hash } = bcrypt;


export async function registerUser(email, password) {
    // generate salt
    const salt = await genSalt(10); // Specifies how long the salt should be
    console.log("salt:", salt)

    // hash with salt
    const hashedPassword = await hash(password, salt)
    console.log("hashedPassword:", hashedPassword)

    // store in DB

    // return user from DB
    console.log("email:", email)

}