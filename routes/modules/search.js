const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const userId = req.user._id

  Restaurant.findOne({userId})
    .lean()
    .then((restaurants) => {
      return restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(keyword) || 
        restaurant.category.toLowerCase().includes(keyword) || 
        restaurant.location.toLowerCase().includes(keyword)
      )
    })
    .then(restaurants => res.render('index', {restaurants, keyword}))
    .catch(error => console.log(error))
})


module.exports = router