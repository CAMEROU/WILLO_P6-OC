const jwt = require("jsonwebtoken")

function tiketUser(req, res, next){
    console.log("tiketUser")
    const header = req.header("Authorization")
    if (header == null) return res.status(403).send({message: "Pas valide"})
    
    const token = header.split(" ")[1]
    if (token == null) return res.status(403).send({message: "le token ne pourrai pas etre nul"})
    
    jwt.verify(token, process.env.JWT_PASSWORD,(err, decoded) => {
        if(err) return res.status(403).send({message: "invalidation du token" + err }) 
        console.log("le token est bien valide")
    next()
    
     })
    }
    module.exports = {tiketUser}