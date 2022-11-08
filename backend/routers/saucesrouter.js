const express = require("express")

const {getSauces, createSauces, getSauceById,  deleteSauce, modifySauce, likeSauces } = require("../controllers/sauces")
const { upload } = require("../middleware/multer")
const {authUser} = require("../middleware/auth")
const saucesRouter = express.Router()

saucesRouter.get("", authUser, getSauces)
saucesRouter.post("", authUser,upload.single("image"), createSauces)
saucesRouter.get("/:id", authUser, getSauceById)
saucesRouter.delete("/:id", authUser, deleteSauce)
saucesRouter.put("/:id", authUser, upload.single("image"), modifySauce)
saucesRouter.post("/:id/like", authUser, likeSauces)

module.exports = {saucesRouter}