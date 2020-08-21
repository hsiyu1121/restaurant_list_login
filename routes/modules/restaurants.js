const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const {name, category, rating, image, location, phone, google_map, description} = req.body
  
  return Restaurant.create({
    name, 
    category, 
    image, 
    rating, 
    location, 
    phone, 
    google_map, 
    description, 
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({_id, userId})
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({_id, userId})
    .lean()
    .then((restaurant) => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})


router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, category, rating, image, location, phone, google_map, description } = req.body
 
  return Restaurant.findOne({_id, userId})
    .then(restaurant => {
      Object.assign(restaurant, req.body);
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req,res) => {
  const _id = req.params.id
  const userId = req.user._id 
  return Restaurant.findOne({_id, userId})
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router