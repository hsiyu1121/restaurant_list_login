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

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => { 
  return Restaurant.create( req.body )
    .then( () => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', {restaurants}))
    .catch(error => console.log(error))
})

app.post('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image  = req.body.image
  const location  = req.body.location
  const phone  = req.body.phone
  const google_map  = req.body.google_map
  const rating  = req.body.rating
  const description  = req.body.description

  return Restaurant.fineById(id)
    .then(restaurant => {
      restaurant.name = name, 
      restaurant.name_en = name_en,
      restaurant.category = category,
      restaurant.image = image,
      restaurant.location = location,
      restaurant.phone = phone,
      restaurant.google_map = google_map,
      restaurant.rating = rating,
      restaurant.description = description
      return restaurant.save()
    })
    .then( () => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req,res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res)=>{
  console.log(req.query)
  const keyword = req.query.keyword
  
  Restaurant.find()
    .or([{name:{$regex:keyword, $options:'i'}},
        {name_en:{$regex:keyword, $options:'i'}},
        {location:{$regex:keyword, $options:'i'}},
         {category:{$regex:keyword, $options:'i'}}
    ])
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
