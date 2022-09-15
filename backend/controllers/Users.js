const {User} = require("../mongo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async  function createUser(req, res) {
   try{
const {email, password } = req.body
const hashedPassword = await hashPassword(password)
const user = new User({email, password: hashedPassword })
       
await user.save()
     res.status(201).send({message: "Utilisateur enregistre !" })
}catch (err){
 res.status(409).send({message: "User non enregistre : " + err })
}
//.then(() => res.status(201).send({message: "Utilisateur enregistre !" }))
 //.catch((err) => res.status(409).send({message: "User non enregistre : " + err }))
}

   function hashPassword(password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
 }

   async function logUser(req, res) {
    try {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email: email })

    const isPasswordOK =  bcrypt.compare(password, user.password)
    if (!isPasswordOK){
        res.status(403).send({ message: "pas enregistre" })
    }
    const token = createTokent(email)
    res.status(200).send({ userId: user?._id, token: token })
   
}catch (err) {
    console.error(err)
    res.status(500).send({message: "erreur interne"})
}}

   function createTokent(email){
    const jwtPassword = process.env.JWT_PASSWORD
    return jwt.sign({email: email}, jwtPassword, {expiresIn: "100h"})
   }

   module.exports = {createUser, logUser }
   