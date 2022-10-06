//IMPORTATION DU JWT
const jwt = require("jsonwebtoken")
function tiketUser(req, res, next){  
//Nous extrayons le token du header Authorization de la requête entrante.
    const header = req.header("Authorization")
//Les tokens d'authentification permettent aux utilisateurs de se
// connecter une seule fois à leur compte.  
    if (header == null) return res.status(403).send({message: "Pas valide"})
// utilisons donc split pour tout récupérer après l'espace dans le header    
    const token = header.split(" ")[1]
//  Les erreurs générées ici s'afficheront dans le status.    
    if (token == null) return res.status(403).send({message: "le token ne pourrai pas etre nul"})
// La méthode verify() du package jsonwebtoken permet de vérifier 
//la validité d'un token (sur une requête entrante, par exemple).   
    jwt.verify(token, process.env.JWT_PASSWORD,(err, decoded) => {
//  Les erreurs générées ici s'afficheront dans le status(403).           
        if(err) return res.status(403).send({message: "invalidation du token" + err }) 
// Nous passons à l'exécution à l'aide de la fonction next()
    next()
    
     })
    }
    module.exports = {tiketUser}