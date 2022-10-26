const { response } = require("express")
const mongoose = require("mongoose")
// (fs: file system), fontion de suppression des images du dossier
const {unlink} = require("fs/promises")
const productSchema = new mongoose.Schema({
userId : String ,
 name : String ,
 manufacturer : String ,
 description : String ,
 mainPepper : String ,
 imageUrl : String ,
 heat : Number ,
 likes : Number ,
 dislikes : Number ,
 usersLiked : [ "" ] ,
 usersDisliked : [ "" ]
})
const Product = mongoose.model("Product", productSchema)
function getSauces(req, res) {
    Product.find({})
    .then(products => res.send(products))
    .catch(error => res.status(500).send(error))
}

function getSauce(req, res){
// get SauceById va me recuperé l'id (req.params)
const {id} = req.params
return Product.findById(id) 
}

function getSauceById(req, res){
// get SauceById va me recuperé l'id (req.params)
      getSauce(req, res)
     .then((product) => sendClientResponse(product, res))
     .catch((err)=> res.status(500).send(err))
}

function deleteSauce(req,res){
     const {id} = req.params
// utilise la methode .findByIdAndDelete(id) pour supprimer les produits envoyer a mongoose 
     Product.findByIdAndDelete(id)
// Evoie du message de succes au serveur web(client
     .then((product) => sendClientResponse(product, res))
     .then((data)=> deleteImage(data))
     .then((res)=> console.log("Suprimer", res))
// en cas d'echec, envoie moi un message d'erreur
    .catch((err) => res.status(500).send({message: err}))
}

function modifySauce(req, res){
// Params de recuperation des donnees de la request
     const {
     params: {id}
     } = req 

console.log("req.file", req.file)
// regarde si il y a un req.file
const hasNewImage = req.file != null
const payload = makePayload(hasNewImage, req)

// Va update la base de donnee
Product.findByIdAndUpdate(id, payload)
// Verifie moi s'il y'a une reponse
    .then((dbResponse) => sendClientResponse(dbResponse, res))
// Supprime l'image du local
    .then((product)=> deleteImage(product))
    .then((res)=> console.log("Suprimer", res))
    .catch((err) => console.error("Problem updating", err))
}

function deleteImage(product){
     if (product == null) return 
     console.log("Suppression de l'image", product)
     const imageToDelete = product.imageUrl.split("/").at(-1)
    return unlink("images/" + imageToDelete)
}

function makePayload(hasNewImage, req){
    console.log("hasNewImage:",  hasNewImage)
// S'il y'a pas de nouvelle image retourne req.body
    if (!hasNewImage) return req.body
    const payload = JSON.parse(req.body.sauce)
    payload.imageUrl = makeImageUrl(req, req.file.filename)
    console.log("Nouvelle image a gerer")
    console.log("Voici le payload:", payload)
    return  payload
}
// function sendClientResponse() fonction qui renvoie une reponse au client en fonction du resultat obtenu de la base de donnee
function sendClientResponse(product, res){
    if(product == null) {
    console.log("Nothing to update")
    return  res.status(404).send({message: "Objet introuvable dans la base de donnee"})
}
    console.log("Toute est mise en place", product)
    return Promise.resolve(res.status(200).send(product)).then(()=> product
)}

function makeImageUrl(req, filename){  
    return req.protocol + "://"  + req.get("host")  + "/images/" + filename
}

function createSauces(req, res){
    const { body, file } = req
    //console.log({ file })
    const { filename } = file
    const sauce = JSON.parse(body.sauce)
    const { name, manufacturer, description, mainPepper, heat, userId } = sauce

// liste des différents produits 
const product = new Product({
    userId: userId,
    name: name,
    manufacturer: manufacturer,
    description: description,
    mainPepper: mainPepper,
    imageUrl: makeImageUrl(req, filename),
    heat: heat,
    likes : 0 ,
    dislikes : 0 ,
    usersLiked : [] ,
    usersDisliked : []
})
// enregistrement du produit
    product
   .save()

   .then((message) => res.status(201).send({message}))
   .catch((err) => res.status(500).send({message: err }
    ))
}

// function likeSauces
function likeSauces(req, res){
    const {like, userId} = req.body
    if(![1, -1, 0].includes(like)) return res.status(403).send({message: "Ivalide like value"})
// fonction getSauce qui recoi le produit depuis la base de donnee et va lancee le updatevote dessus
    getSauce(req, res)
//le updateVote va regader si le like = [1, -1 ou 0]
    .then((product) => updateVote( product, like, userId ))
    .then(prod => prod.save())
    .then(piquant => sendClientResponse(piquant, res))
    .catch((err) => res.status(500).send(err))
}

function updateVote(product, like, userId, res){
    if(like === 1 || like === -1) return incrementLikeVo(product, userId, like)
    return resetVote(product, userId, res)
}

function resetVote(product, userId, res){
    const {usersLiked, usersDisliked} = product
    if ([usersLiked, usersDisliked].every((arr) => arr.includes(userId))) return promises.reject("User has seems to have voted both ways")

    if (![usersLiked, usersDisliked].some((arr) => arr.includes(userId))) return promises.reject({message: "User seems don't have voted"})

    usersLiked.includes(userId) ? --product.likes : --product.dislikes 

    if(usersLiked.includes(userId)) {
    product.usersLiked = product.usersLiked.filter(id => id !== userId)
    }else{
    product.usersDisliked = product.usersDisliked.filter(id => id !== userId)
}
    console.log("RESET VOTE AFTER", product)
    return product
}

function incrementLikeVo(product, userId, like) {
    const {usersLiked, usersDisliked} = product

    const votersArray = like === 1 ? usersLiked : usersDisliked
    if (votersArray.includes(userId)) return product
    votersArray.push(userId)

    if(like === 1 ) {
    ++product.likes
    } else {
    ++product.dislikes
 }
    return product
 }

module.exports = { getSauces, createSauces, getSauceById, deleteSauce, modifySauce, likeSauces}







