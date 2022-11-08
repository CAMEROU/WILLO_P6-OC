const helmet = require("helmet")
app.use(
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
  );
  
  var  xss  =  requiert ( "xss" ) ; 
var  html  =  xss ( '<script>alerte("xss");</script>' ) ; 
consoler . journal ( html ) ;
