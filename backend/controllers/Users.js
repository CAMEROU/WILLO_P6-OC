const {User} = require("../mongo")
//Importation du package de bcrypt
const bcrypt = require("bcrypt")
// Importation du package de jsonwebtoken
const jwt = require("jsonwebtoken")

async  function createUser(req, res) {
    try{
    const {email, password } = req.body
// crée un hash crypté des mots de passe de vos utilisateurs pour les 
//enregistrer de manière sécurisée dans la base de données
    const hashedPassword = await hashPassword(password)
    const user = new User({email, password: hashedPassword })
    await user.save()
    res.status(201).send({message: "Utilisateur enregistre !" })
    }catch (err){
    res.status(409).send({message: "User non enregistre : " + err })}
}

//nous appelons la fonction de hashPassword de bcrypt dans notre mot de passe 
function hashPassword(password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
 }

//  fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré ;
async function logUser(req, res) {
    try {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email: email })
//utilisons isPasswordOK  pour comparer le mot de 
//passe entré par l'utilisateur avec le hash enregistré dans la base de données
    const isPasswordOK = await bcrypt.compare(password, user.password)
    if (!isPasswordOK){
    res.status(403).send({ message: "pas enregistré" })
}

//Créons un utilisateur et l'enregistrons dans la base de données, en renvoyant une réponse
//de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec. 
    const token = createTokent(email)
    res.status(200).send({ userId: user?._id, token: token })
    }
    catch (err) {
    console.error(err)
    res.status(500).send({message: "erreur interne"})
}
}

function createTokent(email){
    const jwtPassword = process.env.JWT_PASSWORD
    return jwt.sign({email: email}, jwtPassword, {expiresIn: "48h"})
}

module.exports = {createUser, logUser }