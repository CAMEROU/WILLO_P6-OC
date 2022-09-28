 //Base de donnee
 const mongoose = require("mongoose")
// This makes error handing much easier, since you will get a Mongoose validator error when you 
// attempt to violate a unique constraint,
const uniquevalidator = require("mongoose-unique-validator")
// Password in mongo
const password = process.env.MDB_PASSWORD
// name in mongo
const username = process.env.MDB_USER
// mongo url
//const uri= `mongodb+srv://${username}:${password}@cluster0.8zj42gk.mongodb.net/?retryWrites=true&w=majority`
const uri= `mongodb+srv://${username}:${password}@cluster0.yzlmjpv.mongodb.net/?retryWrites=true&w=majority`
mongoose
.connect(uri)
// use then with console.log to show that mongoose is connect
.then(()=> console.log("Connexion a mongodb!"))
// use catch with console.log to show that mongoose isn't connect
.catch((err) => console.log("Erreur de connexion a mongodb ",err))
// ShemaType.prototype.Unique()
const userSchema = new mongoose.Schema({
// email de validation d'une personne ayant un email identique    
email: {type:String, require:true,unique:true},
// mot de pass valide 
password: {type:String, require:true}
})
// apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniquevalidator)
const User = mongoose.model("User", userSchema)
module.exports = {mongoose, User}