const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 8080
const db = require('./queries')

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors())

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'blog_frontend/build')))
}

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.addUser)
app.post('/users/login', db.loginUser)
app.get('/posts', db.getPosts)
app.get('/posts/:id', db.getPostById)
app.post('/posts', db.addPost)
app.put('/posts/:id', db.editPost)
app.delete('/posts/:id', db.deletePost)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))