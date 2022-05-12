import bcrypt from 'bcryptjs';
const { compare } = bcrypt;

export async function authorizeUser( email, password ) {
    // "Import user collection"
    const { user } = await import("../user/user.js");
    // "Look-up user"
    const userData = await user.findOne({
        'email.address': email,
    });
    console.log('userData', userData)
    // "Get user PW"
    const savedPassword = userData.password
    // "Compare PW with database's"
    const isAuthorized = await compare(password, savedPassword)
    console.log("isAuthorized", isAuthorized)
    // "Return boolean of 'if' PW"
    return isAuthorized
}