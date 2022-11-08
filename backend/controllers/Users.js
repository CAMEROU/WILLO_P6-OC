   const {User} = require("../mongo")
//Importation du package de bcrypt
   const bcrypt = require("bcrypt")
// Importation du package de jsonwebtoken
    const jwt = require("jsonwebtoken")

async  function createUser(req, res) {
    try{
      const {email, password} = req.body
      if (!password || password.length === '') return res.status(400)
     .send({message: "votre mot de passe doit être défini" })
      if (password.length < 8) return  res.status(400)
      .send({message: "votre mot de passe doit contenir au minimum 8 caractères" })
// crée un hash crypté des mots de passe de vos utilisateurs pour les 
//enregistrer de manière sécurisée dans la base de données
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
//utilisons isPasswordOK  pour comparer le mot de 
//passe entré par l'utilisateur avec le hash enregistré dans la base de données
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



/*const validator = require("validator");

createUser = (req, res, next) => {
  const validePassword = passwordSchema.validate(req.body.password);
  if (validePassword === true) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        db.User.create({
          password: hash
          image: `${req.protocol}://${req.get(
            "host"
          )}/images/defaut/imagedefaut.png`,
          moderateur: false,
          date_deco: '1978-10-31 15:45:00'
        })
          .then(() =>
            res
              .status(201)
              .json({ message: "User created (FR)Utilisateur créé !" })
          )
          .catch((error) =>
            res
              .status(400)
              .json({ error })
          );
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(500).json({ error: "mot de passe invalide" });
  }
};*/