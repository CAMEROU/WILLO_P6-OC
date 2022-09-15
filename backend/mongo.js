 //Base de donnee
 const mongoose = require("mongoose")
 const uniqueValidator = require("mongoose-unique-validator")
 const password = process.env.MDB_MODEPASS
 const username = process.env.MDB_USER
 const uri = 
 `mongodb+srv://${username}:${password}@cluster0.8buuxyq.mongodb.net/?retryWrites=true&w=majority`
 
 mongoose
 .connect(uri)
 .then(() => console.log("Connecter a mongoose !"))
 .catch((err ) => console.error("Erreur de connexion a mongoose: ", err))
 
 const userSchema = new mongoose.Schema({
     email: {type: String, require: true, unique: true},
     password:{type: String, require: true}
 })
 
 userSchema.plugin(uniqueValidator)
 
 const User = mongoose.model("User", userSchema)
 
 module.exports = {mongoose, User}