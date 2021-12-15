import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './NavBar'
import ListView from './ListView'
import DetailView from './DetailView'
import NewPostForm from './NewPostForm'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [detail, setDetail] = useState({})
  const [currentUser, setCurrentUser] = useState(0)

  const fetchBlogData = () => {
    fetch(`http://localhost:8080/users`)
    .then((res) => res.json())
    .then((res) => setUsers(res))
    .then(fetch(`http://localhost:8080/posts`)
    .then((res) => res.json())
    .then((res) => setPosts(res)))
  }

  useEffect(() => fetchBlogData(), [])

  const handleSubmitPost = (values) => {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify({
        userid: currentUser,
        title: values.title,
        text: values.text,
        created_date: new Date().toISOString(),
      }),
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => fetchBlogData())
  }

  const handleEditPost = (values) => {
    fetch(`http://localhost:8080/posts/${detail.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        // userid: currentUser,
        title: values.title,
        text: values.text,
        // created_date: new Date().toISOString(),
      }),
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => fetchBlogData())
  }

  const handleDeletePost = () => {
    fetch(`http://localhost:8080/posts/${detail.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => fetchBlogData())
  }

  const handleRegisterUser = (values) => {
    fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify({
        first: values.first,
        last: values.last,
        username: values.username,
        password: values.password,
        email: values.email,
      }),
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => fetchBlogData())
  }

  

  return (
    <Router>
      <NavBar users={users} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route 
          path='/' 
          element={<ListView users={users} currentUser={currentUser} posts={posts} setDetail={setDetail} />} 
        />
        <Route 
          path='/detail' 
          element={<DetailView editPost={handleEditPost} deletePost={handleDeletePost} users={users} currentUser={currentUser} detail={detail} />} 
        />
        <Route 
          path='/new' 
          element={<NewPostForm submitPost={handleSubmitPost} />} 
        />
        <Route 
          path='/register' 
          element={<RegisterPage registerUser={handleRegisterUser}/>} 
        />
        <Route 
          path='/login' 
          element={<LoginPage setCurrentUser={setCurrentUser}/>} 
        />
      </Routes>
    </Router>
  )
}

export default App
