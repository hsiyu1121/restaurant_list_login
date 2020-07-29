const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Restaurant = require("./models/restaurant");
const port = 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

// index 位置
app.get("/", (req, res) => {
  Restaurant.find()
            .lean()
            .then(restaurants => res.render("index", { restaurants }))
            .catch( error => console.log(error))
});

app.get("/restaurant/new", (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => { 
  console.log(req.body)
  return Restaurant.create( req.body )
          .then( () => res.redirect('/'))
          .catch(error => console.log(error))
})



// app.get('/restaurants/:restaurant_id', (req, res)=>{
//   const restaurant = restaurantList.results.find(restaurant =>
//   restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', {restaurant:restaurant})
// })

// app.get('/search', (req, res)=>{
//   console.log(req.query)
//   const keyword = req.query.keyword
//   const restaurant_name = restaurantList.results.filter((restaurant) => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//   })
//   const restaurant_location = restaurantList.results.filter(restaurant => {
//     return restaurant.location.toLowerCase().includes(keyword.toLowerCase())
//   })

//   const result = restaurant_name.concat(
//     restaurant_location.filter((e)=>{
//     return restaurant_name.indexOf(e) === -1
//   })
//   )
//   res.render('index', {restaurant:result})
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
