const router = require('express').Router()
const axios = require('axios')
const { Book } = require('../models')

router.get('/googlebooks/:search', (req, res) => {
 axios.get(`http://api.giphy.com/v1/books/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.params.search}&rating=g&limit=20`)
  .then(({ data }) => {
   Book.find()
    .then(books => {
     const booksFiltered = data.data.filter(book => {
      let keep = true
      books.forEach(saved => {
       if (saved.bookId === book.id) {
        keep = false
       }
      })
      return keep
     })
     res.json(booksFiltered)
    })
  })
  .catch(err => console.error(err))
})

module.exports = router
