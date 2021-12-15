import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

const LoginPage = (props) => {
  const navigate = useNavigate()
  const [values, setValues] = useState({})

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const loginUser = () => {
    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.status === 200) {
        props.setCurrentUser(res.id)
        navigate('/')
      }
      else if(res.status === 400) {
        alert('User Not Found')
      }
      else if(res.status === 401) {
        alert('Authentication Failed')
      }
    })
  }

  return (
    <>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: 1, marginTop: 1 }}>
          Login
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
      </Box>

      <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => {
          (loginUser(values) === true) ? navigate('/') : navigate('/login')
        }}>Login
      </Button>
    </>
  )
}

export default LoginPage