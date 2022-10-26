const mongoose = require("mongoose")
const uniquevalidator = require("mongoose-unique-validator")
const password = process.env.MDB_PASSWORD
const username = process.env.MDB_USER
// mongo url
const uri= `mongodb+srv://${username}:${password}@cluster0.1kwzsh9.mongodb.net/?retryWrites=true&w=majority`
mongoose
.connect(uri)
.then(()=> console.log("Connexion à mongodb!"))
.catch((err) => console.log("Erreur de connexion à mongodb ",err))
const userSchema = new mongoose.Schema({  
email: {type:String, require:true,unique:true},
password: {type:String, require:true}
})

//userSchema.plugin(uniquevalidator)
userSchema.plugin(uniquevalidator)
const User = mongoose.model("User", userSchema)
module.exports = {mongoose, User}

