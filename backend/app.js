const {app, express} = require("./server")
const  { saucesRouter } = require("./routers/saucesrouter")
const  { authRouter } = require("./routers/authrouter")
const bodyParser = require("body-parser")
const path = require("path")
const port = 3000
//Connexion a la base de donnee
require("./mongo")

app.use(bodyParser.json())
//Gestion des principaux routes
app.use( "/images", express.static(path.join(__dirname, "images")))
app.use("/api/sauces", saucesRouter)
app.use("/api/auth/", authRouter)

//app.get("/", (req, res)=> res.send("bonjour!"))
// Listen to port
app.listen(port, () => console.log("listening on port " + port))