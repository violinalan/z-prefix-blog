import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

const NavBar = (props) => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
            {(props.currentUser > 0) && <Button color="inherit" sx={{ marginLeft: 1 }} onClick={() => navigate('/new')}>New Post</Button>}
            <Button color="inherit" sx={{ marginLeft: 1 }} onClick={() => navigate('/register')}>Register</Button>
          </Box>
          
          <Typography variant="h6" component="div" >
            {props.currentUser ? `Welcome ${props.users.find((user) => user.id === props.currentUser).first}!` : ``}
          </Typography>

          {(props.currentUser === 0) && <Button color="inherit" sx={{ marginLeft: 1 }} onClick={() => navigate('/login')}>Login</Button>}
          {(props.currentUser > 0) && <Button color="inherit" sx={{ marginLeft: 1 }} onClick={() => {
              props.setCurrentUser(0)
              navigate('/login')
            }}>Logout
          </Button>}
          
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar