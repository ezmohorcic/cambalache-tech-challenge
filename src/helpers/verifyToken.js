const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()
const KEY = process.env.JWT_KEY

const verifyToken = (req,res,next) => {
    try 
    {
        const authHeader = req.headers.token
        if(authHeader)
        {
            jwt.verify(authHeader,KEY,(err) =>
            {
                if(err) return res.status(401).json("Token is not valid")
                next();
            });
        }
        else
        {
            return res.status(401).json("You are not authenticated!");
        }
    } 
    catch (error) 
    {
        res.status(500).json("fire in token verify");
    }
}

module.exports =  verifyToken;