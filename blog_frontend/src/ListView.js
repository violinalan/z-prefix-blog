import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ListView = (props) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [view, setView] = useState('myPosts')

  const allPosts = props.posts
  const myPosts = allPosts.filter((post) => post.userid === props.currentUser)
  const userLoggedIn = props.currentUser > 0

  useEffect(() => {
    userLoggedIn && view === 'myPosts' ? setPosts(myPosts) : setPosts(allPosts)
  }, [view, userLoggedIn, allPosts])

  useEffect(() => {
    if(!userLoggedIn) setView('allPosts')
  }, [userLoggedIn])

  return (
    <>
      <Typography variant="h5" component="div" sx={{ marginLeft: 1, marginTop: 1 }}>
        {view === 'allPosts' ? `All Blog Posts` : `My Blog Posts`}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1000 }} aria-label="blog table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" component="div">Title</Typography>
              </TableCell>
              <TableCell align="left"><Typography variant="h6" component="div">Author</Typography></TableCell>
              <TableCell align="left"><Typography variant="h6" component="div">Text</Typography></TableCell>
              <TableCell align="left"><Typography variant="h6" component="div">Date</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => {
              const isoDate = new Date(post.created_date)
              const date = isoDate.toLocaleDateString()
              const author = props.users.find((user) => user.id === post.userid)
            
              return <TableRow key={post.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                  onClick={() => {
                    props.setDetail(post)
                    navigate('/detail')
                  }}
              >
                <TableCell key={post.title} component="th" scope="row">{post.title}</TableCell>
                <TableCell key={post.userid} align="left">{author.first} {author.last}</TableCell>
                <TableCell key={post.text} align="left">
                  {post.text.length > 100 ? `${post.text.substring(0,100)}...` : post.text}
                </TableCell>
                <TableCell key={post.created_date} align="left">{date}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <br/><br/>

      {userLoggedIn && view === 'myPosts' && 
        <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => setView('allPosts')}>Show All Posts</Button>}
      {userLoggedIn && view === 'allPosts' && 
        <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => setView('myPosts')}>Show Only My Posts</Button>}
    </>
  )
}

export default ListView