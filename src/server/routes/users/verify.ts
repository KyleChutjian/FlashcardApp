const jwt = require("jsonwebtoken");


export function getToken(user: {email: String, name: String}): any {
    console.log("Generating token for:");
    console.log(user);
    return jwt.sign(user, process.env.SECRET, {expiresIn: 3600}); // expires in 1h
}