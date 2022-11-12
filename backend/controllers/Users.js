  const {User} = require("../mongo")
   //Importation du package de bcrypt
  const bcrypt = require("bcrypt")
  // Importation du package de jsonwebtoken
  const jwt = require("jsonwebtoken")
 const mailRegex = require("../mailRegex")

async  function createUser(req, res) {
    try{
      const {email, password} = req.body
      if (!email || email.length === 0) return res.status(400).send({message: "votre  e-mail doit être  défini" })
      if (!email.match(mailRegex)) return res.status(400).send({message: "votre email n'est pas au bon format" })
      if(!email || email.length === 0) return res.status(400).send({message: "votre e-mail doit être défini" })
      if (!password || password.length === 0) return res.status(400).send({message: "votre mot de passe doit être défini" })
      if (password.length < 8) return  res.status(400).send({message: "votre mot de passe doit contenir au minimum 8 caractères" })

    const hashedPassword = await hashPassword(password)
    const user = new User({email, password: hashedPassword })
    await user.save()
    res.status(201).send({message: "Utilisateur enregistre !" })
    }catch (err){
    res.status(409).send({message: "User non enregistre : " + err })}
}

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
  const isPasswordOK = await bcrypt.compare(password, user.password)
    if (!isPasswordOK ){
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
