const {app, express} = require("./index")
const  { saucesRouter } = require("./routers/sauces.router")
const  { authRouter } = require("./routers/auth.router")
const bodyParser = require("body-parser")
const port = 3000
const path = require("path")

//Connexion a la base de donnee
require("./mongo")

// Middleware
app.use(bodyParser.json())
app.use("/api/sauces", saucesRouter)
app.use("/api/auth/", authRouter)

app.get("/", (req, res)=> res.send("bonjour!"))

// Listen to port
app.use( "/images", express.static(path.join(__dirname, "images")))
app.listen(port, ()=>console.log("listening on port " + port))