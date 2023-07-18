import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import NoPermission from '../../assets/NoPermission.svg'
import { useNavigate } from 'react-router-dom'

const NoPermission = () => {
    const navigate = useNavigate()
  return (
    <Container sx={{ display: 'flex', height: '690px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <img width={350} src={NoPermission} />
      <Typography fontSize={22} variant='subTitle' style={{padding: '20px 0px'}}>Bạn không có quyền truy cập trang này !</Typography>
      <Button variant='contained' size='large' onClick={() => navigate('/login')}>Đăng nhập ngay</Button>
    </Container>
  )
}

export default NoPermission
