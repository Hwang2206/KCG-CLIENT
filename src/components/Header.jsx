import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'

import logo from '../assets/logo.png'
import avatar from '../assets/avatar-logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import JWTContext from '../contexts/JWTContext'
import useAuth from '../hooks/useAuth'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import Swal from 'sweetalert2'
import { handleAlertConfirm } from '../hooks/useAlertConfirm'
import { Button } from '@mui/material'

const pagesUser = [
  {
    title: 'Trang chủ',
    path: '/home'
  },
  {
    title: 'Thẻ hội viên',
    path: '/card-membership'
  },
  {
    title: 'Dịch vụ',
    path: '/services'
  },
  {
    title: 'Dụng cụ - Thiết bị',
    path: '/equipment'
  }
]

const pagesAdmin = [
  {
    title: 'Trang chủ',
    path: '/home'
  },
  {
    title: 'Quản lý khách hàng',
    path: '/admin/customers'
  },
  {
    title: 'Quản lý dịch vụ - ưu đãi',
    path: '/admin/services'
  },
  {
    title: 'Quản lý thiết bị',
    path: '/admin/equipments'
  }
]

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [isLogged, setIsLogged] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const { user } = React.useContext(JWTContext)
  const { logout } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user) {
      if (user.user_type === true) {
        setIsAdmin(true)
      }else {
        setIsAdmin(false)
      }
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [user])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogOut = () => {
    handleAlertConfirm({
      text: 'Bạn có chắc chắn muốn đăng xuất ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmText: 'Đăng xuất',
      handleConfirmed: () => {
        logout()
        handleAlertConfirm({
          text: 'Đăng xuất thành công',
          icon: 'success',
          handleConfirmed: () => navigate('/')
        })
      }
    })
  }

  const settings = [
    {
      title: 'Thông tin cá nhân',
      icon: <PersonOutlineRoundedIcon />,
      click: () => {
        handleCloseUserMenu()
        navigate('/profile')
      }
    },
    {
      title: 'Đăng xuất',
      icon: <LoginRoundedIcon />,
      click: () => {
        handleCloseUserMenu()
        handleLogOut()
      }
    }
  ]

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <div className='flex justify-between items-center w-full'>
            <Typography
              variant='h6'
              noWrap
              component='a'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              
                <img className='hover:cursor-pointer' onClick={() => navigate('/')} src={logo} alt='logo' width={400} />
              
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '60px' }}>
              {isLogged ? (
                <span>
                  {isAdmin
                    ? pagesAdmin.map((page) => (
                        <Link className='ml-10' to={page.path} key={page.title}>
                          {page.title}
                        </Link>
                      ))
                    : pagesUser.map((page) => (
                        <Link className='ml-10' to={page.path} key={page.title}>
                          {page.title}
                        </Link>
                      ))}
                </span>
              ) : null}
            </Box>

            {isLogged ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Xin chào, {user && user.user_name}</Typography>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: 2 }}>
                  <Avatar
                    className='border-2 border-slate-100 border-solid rounded-full'
                    alt='logo-avatar'
                    src={avatar}
                  />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.title} onClick={setting.click}>
                      <Typography textAlign='center'>
                        <Link className='dropdown-item'>
                          <span className='mr-2'>{setting.icon}</span> {setting.title}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Link className='ml-10' to='/login'>
                Đăng nhập
              </Link>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
