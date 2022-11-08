//IMPORTATION DU JWT
const jwt = require("jsonwebtoken")
function authUser(req, res, next){  
    const header = req.header("Authorization")
    if (header == null) return res.status(403).send({message: "Pas valide"})   
    const token = header.split(" ")[1]   
    if (token == null) return res.status(403).send({message: "le token ne pourrai pas etre null"}) 
    jwt.verify(token, process.env.JWT_PASSWORD,(err, decoded) => {           
    if(err) return res.status(403).send({message: "invalidation du token" + err }) 
    next()
     })
    }
module.exports = { authUser }