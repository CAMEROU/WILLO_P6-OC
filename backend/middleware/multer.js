//Nous créons une constante storage ,à passer à multer comme configuration, 
 //qui contient la logique nécessaire pour
 // indiquer à multer où enregistrer les fichiers entrants
 const multer = require("multer")
 //Sa methode diskStokage() configure le schema et le nom de fichier pour les fichiers entrants
const storage = multer.diskStorage({
// La fonction destination indique à multer d'enregistrer les fichiers dans le dossier images    
destination: "images/",
filename: function(req, file, cb){
cb(null, makeFilename(req, file))
 }
})
 // la fonction makeFilename indique à multer d'utiliser le nom d'origine,
function makeFilename(req, file) {
//  remplacer les espaces par des underscores et
//d'ajouter un timestamp Date.now() comme nom de fichier.   
const filename =  `${Date.now()}-${file.originalname}`.replace(/\s/g, "-")
//la fonction filename indique à multer d'utiliser le nom d'origine
file.filename = filename
return filename
}
//Nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage
// et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.
const upload = multer({ storage })
module.exports = {upload}
        