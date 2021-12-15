import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

const RegisterPage = (props) => {
  const navigate = useNavigate()
  const [values, setValues] = useState({})

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  return (
    <>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: 1, marginTop: 1 }}>
          New User Registration
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
            id='first-input'
            name='first'
            label='First Name'
            type='text'
            value={values.first}
            onChange={handleFieldChange}
          />
          <TextField
            id='last-input'
            name='last'
            label='Last Name'
            type='text'
            value={values.last}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <TextField
            id='username-input'
            name='username'
            label='Username'
            type='text'
            value={values.username}
            onChange={handleFieldChange}
          />
          <TextField
            id='password-input'
            name='password'
            label='Password'
            type='password'
            value={values.password}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <TextField
            id='email-input'
            name='email'
            label='Email'
            type='text'
            value={values.email}
            onChange={handleFieldChange}
          />
        </div>
      </Box>

      <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => {
          props.registerUser(values)
          navigate('/')
        }}>Register User
      </Button>

      <br/><br/>

      <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => navigate('/')}>Cancel</Button>
    </>
  )
}

export default RegisterPage