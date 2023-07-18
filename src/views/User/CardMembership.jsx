import { Box, Button, Card, CardContent, Modal, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import JWTContext from '../../contexts/JWTContext'
import LoginFirst from '../../components/Errors/LoginFirst'

const CardMembership = () => {
  const { isLoggedIn } = useContext(JWTContext)
  const [showModal, setShowModal] = useState(false)

  const style = {
    position: 'absolute',
    top: '15%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  if (!isLoggedIn) {
    return <LoginFirst />
  }

  return (
    <>
      <div style={{ height: '690px' }} className='flex items-center justify-center'>
        <Card sx={{ borderRadius: '0.5rem' }} className='py-10 px-20'>
          <CardContent>
            <Typography variant='h5' fontWeight={800} fontSize={30} textAlign='center'>
              THẺ HỘI VIÊN
            </Typography>
            <img src={logo} width={400} />
            <div className='mt-10 mb-10'>
              <Typography fontSize={18} className=''>
                <Grid2 container>
                  <Grid2 xs={6}>
                    Khách hàng :
                    <br />
                    Gói dịch vụ :
                    <br />
                    Ngày đăng ký :
                    <br />
                    Ngày hết hạn :
                    <br />
                    Số ngày còn lại :
                  </Grid2>
                  <Grid2 xs={6}>
                    Nguyễn Đỗ Việt Hoàng
                    <br />
                    Ngày đăng ký
                  </Grid2>
                </Grid2>
              </Typography>
            </div>

            <div className='w-full text-center mt-6'>
              <Button sx={{ mr: 2 }} onClick={handleShowModal} color='success' variant='contained'>
                CHỌN GÓI DỊCH VỤ
              </Button>
              <Button variant='contained'>GIA HẠN ĐĂNG KÝ</Button>
            </div>

            <div className='mt-6 text-center'>
              <Typography variant='subTitle2' fontStyle='italic'>
                Quý khách có thể gia hạn thẻ trực tuyến khi số ngày còn lại &lt;15 <br />
                Thẻ hội viên này có giá trị tương đương với thẻ hội viên cứng
                <br />
                Mọi thông tin chi tiết vui lòng liên hệ với nhân viên quản lý
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <Modal open={showModal} onClose={handleShowModal}>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default CardMembership
