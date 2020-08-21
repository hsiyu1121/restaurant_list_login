const express = require("express");
const app = express();

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Restaurant = require("./models/restaurant");
const port = 3000;
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')

require('./config/mongoose')

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(routes)
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false, 
  saveUninitialized: true
}))

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
