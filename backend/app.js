// importation des package app et espress
const {app, express} = require("./server")
//importation de saucesRouter
const  { saucesRouter } = require("./routers/sauces.router")
//importation de authRouter
const  { authRouter } = require("./routers/auth.router")
// importation du package bodyParser
const bodyParser = require("body-parser")
// utilisation du port 3000
const port = 3000
// importation de 'Path' afin de definir les schemins
const path = require("path")

//Connexion a la base de donnee
require("./mongo")

// Middleware
app.use(bodyParser.json())
//Gestion des principaux routes
app.use( "/images", express.static(path.join(__dirname, "images")))
app.use("/api/sauces", saucesRouter)
app.use("/api/auth/", authRouter)

app.get("/", (req, res)=> res.send("bonjour!"))
// Listen to port
//app.use( "/images", express.static(path.join(__dirname, "images")))
app.listen(port, () => console.log("listening on port " + port))