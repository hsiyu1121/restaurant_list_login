const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Restaurant = require("./models/restaurant");
const port = 3000;
const methodOverride = require('method-override')
const routes = require('./routes')



app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(routes)

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
// app.get("/", (req, res) => {
//   Restaurant.find()
//     .lean()
//     .then(restaurants => res.render("index", { restaurants }))
//     .catch( error => console.log(error))
// });

// app.get('/restaurants/new', (req, res) => {
//   return res.render('new')
// })

// app.post('/create', (req, res) => { 
//   return Restaurant.create( req.body )
//     .then( () => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.get('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then((restaurants) => res.render('show', { restaurants }))
//     .catch(error => console.log(error))
// })

// app.get('/restaurants/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then((restaurant) => res.render('edit', {restaurant}))
//     .catch(error => console.log(error))
// })

// app.put('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .then(restaurant => {
//      Object.assign(restaurant, req.body)
//       return restaurant.save()
//     })
//    .then( () => res.redirect(`/restaurants/${id}`))
//    .catch(error => console.log(error))  
// })  

// app.delete('/restaurants/:id', (req,res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

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
