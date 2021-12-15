import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

const DetailView = (props) => {
  const navigate = useNavigate()
  const isoDate = new Date(props.detail.created_date)
  const date = isoDate.toLocaleDateString()
  const author = props.users.find((user) => user.id === props.detail.userid)

  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState({title: props.detail.title, text: props.detail.text})

  const canEdit = props.detail.userid === props.currentUser

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  return (
    <>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: 1, marginTop: 1}}>
          Post Details
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1000 }} aria-label="blog table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="left">Text</TableCell>
              <TableCell align="left">Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow key={props.detail.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell key={props.detail.title} component="th" scope="row">{editing ? 
                  <TextField
                    id='title-input'
                    name='title'
                    label='Title'
                    type='text'
                    value={values.title}
                    onChange={handleFieldChange}
                  /> : props.detail.title}
                </TableCell>
                <TableCell key={props.detail.userid} align="left">{author.first} {author.last}</TableCell>
                <TableCell key={props.detail.text} align="left">{editing ? 
                  <TextField
                    id='text-input'
                    name='text'
                    label='Text'
                    type='text'
                    value={values.text}
                    onChange={handleFieldChange}
                    multiline
                  /> : props.detail.text}</TableCell>
                <TableCell key={props.detail.created_date} align="left">{date}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <br/>

      {!editing && canEdit &&
        <div>
          <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => setEditing(true)}>Edit Post</Button>
          <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => {
              props.deletePost()
              navigate('/')
            }}>Delete Post
          </Button>
        </div>}

      {editing && canEdit &&
        <div>
          <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => {
              props.editPost(values)
              navigate('/')
            }}>Save
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => navigate('/')}>Cancel</Button>
        </div>}

      <br/><br/><br/><br/>

      <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => navigate('/')}>Back to List View</Button>
    </>
  )
}

export default DetailView