const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/:type/:method', (req, res) => {
  const type = req.params.type
  const method = req.params.method
  const typeObj = {name:'店名', category:'類別', rating:'評分'}
  const methodObj = {asc:'正排序', desc:'反排序', descending: '由高至低', ascending: '由低至高'} 
  const currentSelected = `${typeObj[type]}:${methodObj[method]}`
  const userId = req.user._id

  Restaurant.findOne({userId})
    .lean()
    .sort({ [type]: [method] })
    .then(restaurants => res.render('index', {restaurants, currentSelected}))
    .catch(error => console.log(error))
})



module.exports = router