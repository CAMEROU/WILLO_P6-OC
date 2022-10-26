const {app, express} = require("./server")
const  { saucesRouter } = require("./routers/saucesrouter")
const  { authRouter } = require("./routers/authrouter")
const bodyParser = require("body-parser")
const path = require("path")
const helmet = require("helmet")
const port = 3000
//Connexion a la base de donnee
require("./mongo")

// Middleware
/*app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://www.googletagmanager.com",
          "'self'",
          "https://www.google-analytics.com",
          "'unsafe-inline'",
          "mydomain.com",
        ],
        imgSrc: ["'self'", "assets.mydomain.com"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);*/


app.use(bodyParser.json())
//Gestion des principaux routes
app.use( "/images", express.static(path.join(__dirname, "images")))
app.use("/api/sauces", saucesRouter)
app.use("/api/auth/", authRouter)

//app.get("/", (req, res)=> res.send("bonjour!"))
// Listen to port
app.listen(port, () => console.log("listening on port " + port))