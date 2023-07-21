import { Box, Button, Card, CardContent, Modal, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import JWTContext from '../../contexts/JWTContext'
import LoginFirst from '../../components/Errors/LoginFirst'
import { MembershipServices } from '../../services/memberships'
import moment from 'moment/moment'
import { handleAlertConfirm } from '../../hooks/useAlertConfirm'
import Swal from 'sweetalert2'

const CardMembership = () => {
  const { user, isLoggedIn } = useContext(JWTContext)
  const [showModal, setShowModal] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [dataMembership, setDataMembership] = useState({})
  const [remainingDay, setRemainingDay] = useState(0)

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

  useEffect(() => {
    if (user) {
      MembershipServices.getByID(user.user_id).then((res) => {
        const data = res.data.data
        setDataMembership(res.data.data)
        const registerMoment = moment(data.register_date, 'YYYY-MM-DD')
        const expirationMoment = moment(data.expiration_date, 'YYYY-MM-DD')
        const remainingDays = expirationMoment.diff(registerMoment, 'days')
        setRemainingDay(remainingDays)
      })
    }
  }, [user])

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const handleExtendBtn = () => {
    setShowLoader(true)
    try {
      handleAlertConfirm({
        title: 'Xác nhận thanh toán',
        icon: 'question',
        showCancelButton: true,
        cancelText: 'Huỷ',
        confirmText: 'Tôi đã thanh toán',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        handleConfirmed: () => {
          MembershipServices.extendRegister(user.user_id)
            .then(() => {
              setTimeout(() => {
                handleAlertConfirm({
                  text: 'Gia hạn dịch vụ thành công',
                  icon: 'success'
                })
              }, 1000)
            })
            .catch(() => {
              setTimeout(() => {
                showLoader(false)
                Swal.fire('', 'Gia hạn dịch vụ thất bại', 'error')
              }, 1000)
            })
        }
      })
    } catch (error) {
      setTimeout(() => {
        showLoader(false)
        Swal.fire('', 'Lỗi kết nối máy chủ', 'error')
      }, 1000)
    }
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
                    {dataMembership.user_name}
                    <br />
                    {dataMembership.service_name ? dataMembership.service_name : 'Chưa có dịch vụ'}
                    <br />
                    {moment(dataMembership.register_date).utcOffset(7).format('DD-MM-YYYY')}
                    <br />
                    {moment(dataMembership.expiration_date).utcOffset(7).format('DD-MM-YYYY')}
                    <br />
                    {remainingDay}
                  </Grid2>
                </Grid2>
              </Typography>
            </div>

            <div className='w-full text-center mt-6'>
              <Button
                sx={{ mr: 2 }}
                disabled={showLoader}
                onClick={handleShowModal}
                color='success'
                variant='contained'
              >
                CHỌN GÓI DỊCH VỤ
              </Button>
              <Button disabled={showLoader} variant='contained' onClick={handleExtendBtn}>
                GIA HẠN ĐĂNG KÝ
              </Button>
            </div>

            <div className='mt-6 text-center'>
              <Typography variant='subTitle2' fontStyle='italic'>
                Khi thẻ hết hạn, ngày đăng ký sẽ được đặt lại = ngày hết hạn
                <br />
                Quý khách có thể gia hạn thẻ trực tuyến khi số ngày còn lại &lt;10 <br />
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
            Tiêu đề
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Nội dung
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default CardMembership
