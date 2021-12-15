import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

const NewPostForm = (props) => {
  const navigate = useNavigate()
  const [values, setValues] = useState({})

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  return (
    <>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: 1, marginTop: 1 }}>
          New Blog Post
      </Typography>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': {m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <TextField
            id='title-input'
            name='title'
            label='Title'
            type='text'
            value={values.title}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <TextField
            id='text-input'
            name='text'
            label='Text'
            type='text'
            value={values.text}
            onChange={handleFormChange}
            multiline
          />
        </div>
      </Box>

      <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => {
          props.submitPost(values)
          navigate('/')
        }}>Submit Post
      </Button>

      <br/><br/>

      <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => navigate('/')}>Cancel</Button>
    </>
  )
}

export default NewPostForm