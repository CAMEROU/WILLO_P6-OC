const express = require("express")
const {getSauces, createSauces, getSauceById,  deleteSauce, modifySauce, likeSauces } = require("../controllers/sauces")
const { upload } = require("../middleware/multer")
const {tiketUser} = require("../middleware/auth")
const saucesRouter = express.Router()

saucesRouter.get("", tiketUser, getSauces)
saucesRouter.post("", tiketUser,upload.single("image"), createSauces)
saucesRouter.get("/:id", tiketUser, getSauceById)
saucesRouter.delete("/:id", tiketUser, deleteSauce)
saucesRouter.put("/:id", tiketUser, upload.single("image"), modifySauce)
saucesRouter.post("/:id/like", tiketUser, likeSauces)
module.exports = {saucesRouter}