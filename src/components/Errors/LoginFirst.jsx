import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import loginSVG from '../../assets/login.svg'
import { useNavigate } from 'react-router-dom'

const LoginFirst = () => {
    const navigate = useNavigate()
  return (
    <Container sx={{ display: 'flex', height: '690px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <img width={350} src={loginSVG} />
      <Typography fontSize={22} variant='subTitle' style={{padding: '20px 0px'}}>Vui lòng đăng nhập để sử dụng chức năng này !</Typography>
      <Button variant='contained' size='large' onClick={() => navigate('/login')}>Đăng nhập ngay</Button>
    </Container>
  )
}

export default LoginFirst
