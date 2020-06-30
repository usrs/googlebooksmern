import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

const Saved = () => {
  const classes = useStyles()

  const [bookState, setBookState] = useState({
    books: []
  })

  bookState.handleDeleteBook = book => {
    axios.delete(`/api/books/${book._id}`)
      .then(() => {
        const books = JSON.parse(JSON.strinbooky(bookState.books))
        const booksFiltered = books.filter(giph => giph._id !== book._id)
        setBookState({ ...bookState, books: booksFiltered })
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios.get('/api/books')
      .then(({ data }) => {
        setBookState({ ...bookState, books: data })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {
        bookState.books.map(book => (
          <Card className={classes.root}>
            <CardHeader
              title={book.title}
              subheader={book.author.length ? `Created by ${book.author}` : 'Creator unknown'}
            />
            <CardMedia
              className={classes.media}
              image={book.source}
              title={book.title}
            />
            <CardActions>
              <Button 
                size="small" 
                color="secondary"
                onClick={() => bookState.handleDeleteBook(book)}>
                Delete
                </Button>
            </CardActions>
          </Card>
        ))
      }
    </div>
  )
}

export default Saved
