import { Avatar, Container, IconButton, Typography } from '@mui/material'
import React from 'react'
import logo from '../../assets/logo.png'
import imgFB from '../../assets/logo-fb.jpg'
import imgINS from '../../assets/logo-ins.jpg'

const Footer = () => {
  return (
    <div className='bg-emerald-50 flex justify-between items-center flex-row pb-7  px-56'>
      <div>
        <img src={logo} width={400} />
        <div variant='subTitle' className='pl-7'>
          <Typography>Điện thoại: 0934.949.345</Typography>
          <Typography>Địa chỉ: 51 Hiệp Bình, Hiệp Bình Phước, Thủ Đức, TPHCM</Typography>
        </div>
      </div>

      <div>
        <Typography sx={{fontWeight: 700}} className='pt-5 pb-3'>KẾT NỐI VỚI CHÚNG TÔI</Typography>
        <IconButton sx={{ p: 1}}>
          <Avatar  sx={{ width: 56, height: 56 }} className='border-2 border-slate-100 border-solid rounded-full' alt='logo-fb' src={imgFB} />
        </IconButton>
        <IconButton sx={{ p: 1, marginLeft: 2 }}>
          <Avatar  sx={{ width: 56, height: 56 }} className='border-2 border-slate-100 border-solid rounded-full' alt='logo-ins' src={imgINS} />
        </IconButton>
      </div>
    </div>
  )
}

export default Footer
