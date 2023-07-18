import { Box, Button, Card, CardContent, Modal, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import JWTContext from '../contexts/JWTContext'
import moment from 'moment'
import { CustomerServices } from '../services/customers'
import { useFormik } from 'formik'
import { handleAlertConfirm } from '../hooks/useAlertConfirm'
import Swal from 'sweetalert2'

const Profile = () => {
  const { user } = useContext(JWTContext)
  const [showLoader, setShowLoader] = useState(false)
  const [showModalUpdateInfo, setShowModalUpdateInfo] = useState(false)
  const [showModalUpdatePassword, setShowModalUpdatePassword] = useState(false)
  const dataCustomer = {
    id: user.user_id || null,
    name: user.user_name || '',
    phone: user.user_phone || '',
    email: user.user_email || '',
    password: user.user_password || '',
    type: user.user_type || false,
    active: user.user_active || false
  }

  const dataPassword = {
    id: user.user_id || null,
    old_password: user.user_password || '',
    password: '',
    rePassword: ''
  }

  const formik1 = useFormik({
    initialValues: dataCustomer,
    enableReinitialize: true,
    onSubmit: (values, helpers) => {
      const { id, ...rest } = values
      const data = { ...rest }

      console.log(id)
      console.log(data)

      // handleAlertConfirm({
      //   text: 'Bạn có chắc chắn muốn lưu ?',
      //   icon: 'question',
      //   showCancelButton: true,
      //   cancelText: 'Huỷ',
      //   confirmText: 'Lưu',
      //   handleConfirmed: () => {
      //     setShowLoader(true)
      //     CustomerServices.updateByID(id, data)
      //       .then(() => {
      //         setTimeout(() => {
      //           handleAlertConfirm({
      //             html: `Cập nhật thông tin tài khoản <b>${values.phone}</b> thành công`,
      //             icon: 'success'
      //           })
      //         }, 1000)
      //       })
      //       .catch(() => {
      //         setTimeout(() => {
      //           setShowLoader(false)
      //           Swal.fire('', 'Đã xảy ra lỗi khi cập nhật thông tin', 'error')
      //         }, 1000)
      //       })
      //   }
      // })
    }
  })

  const formik2 = useFormik({
    initialValues: dataPassword,
    onSubmit: (values, helpers) => {
      const { id, password, ...rest } = values
      handleAlertConfirm({
        text: 'Xác nhận đổi mật khẩu ?',
        icon: 'question',
        showCancelButton: true,
        cancelText: 'Huỷ',
        confirmText: 'Xác nhận',
        handleConfirmed: () => {
          setShowLoader(true)
          CustomerServices.updatePWByID(id, password)
            .then(() => {
              setTimeout(() => {
                handleAlertConfirm({
                  html: `Cập nhật mật khẩu tài khoản <b>${values.phone}</b> thành công<br/>.Vui lòng sử dụng mật khẩu mới ở phiên đăng nhập tiếp theo`,
                  icon: 'success'
                })
              }, 1000)
            })
            .catch(() => {
              setShowLoader(false)
              Swal.fire('', 'Đã xảy ra lỗi khi cập nhật mật khẩu', 'error')
            })
        }
      })
    }
  })

  const style = {
    position: 'absolute',
    top: '18%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }

  const handleShowModalUpdateInfo = () => {
    setShowModalUpdateInfo(!showModalUpdateInfo)
  }
  const handleShowModalUpdatePassword = () => {
    setShowModalUpdatePassword(!showModalUpdatePassword)
  }

  return (
    <>
      <div style={{ height: '690px' }} className='flex items-center justify-center'>
        <Card sx={{ borderRadius: '0.5rem' }} className='py-10 px-20'>
          <CardContent>
            <Typography variant='h5' fontWeight={800} fontSize={30} textAlign='center'>
              THÔNG TIN CÁ NHÂN
            </Typography>
            <img src={logo} width={400} />
            <div className='mt-10 mb-10'>
              <Typography fontSize={18} className=''>
                <Grid2 spacing={4} r container>
                  <Grid2 xs={6}>
                    Họ và tên :
                    <br />
                    Số điện thoại :
                    <br />
                    Địa chỉ email :
                    <br />
                    Trạng thái tài khoản :
                    <br />
                    Ngày tham gia :
                  </Grid2>
                  {user && (
                    <Grid2 xs={6}>
                      {user.user_name}
                      <br />
                      {user.user_phone}
                      <br />
                      {user.user_email}
                      <br />
                      <span className={user.user_type ? 'text-green-600' : 'text-red-500'}>
                        {user.user_type ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                      </span>
                      <br />
                      {moment(user.createdAt).utcOffset(7).format('DD-MM-YYYY')}
                    </Grid2>
                  )}
                </Grid2>
              </Typography>
            </div>

            <div className='w-full text-center mt-6'>
              <Button sx={{ mr: 2 }} onClick={handleShowModalUpdateInfo} variant='contained'>
                Cập nhật thông tin
              </Button>
              <Button color='success' onClick={handleShowModalUpdatePassword} variant='contained'>
                Đổi mật khẩu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Modal open={showModalUpdateInfo} onClose={handleShowModalUpdateInfo}>
        <Box sx={style}>
          <Typography className='pb-6' id='modal-modal-title' variant='h6' component='h2'>
            Cập nhật thông tin
          </Typography>
          <form noValidate onSubmit={formik1.handleSubmit}>
            <Grid2 spacing={3} container>
              <Grid2 xs={6}>
                <TextField
                  label='Họ và tên'
                  onChange={formik1.handleChange}
                  name='name'
                  size='small'
                  disabled
                  value={formik1.values.name}
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  label='Số điện thoại'
                  onChange={formik1.handleChange}
                  name='phone'
                  size='small'
                  disabled
                  value={formik1.values.phone}
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  label='Email'
                  onChange={formik1.handleChange}
                  name='email'
                  size='small'
                  value={formik1.values.email}
                  fullWidth
                />
              </Grid2>
            </Grid2>
            <div className='flex mt-4 justify-end'>
              <Button disabled={showLoader || !formik1.dirty} variant='contained' type='submit'>
                {showLoader ? 'Đang lưu...' : 'Lưu'}
              </Button>
              <Button disabled={showLoader} onClick={handleShowModalUpdateInfo} variant='outlined' sx={{ ml: 1 }}>
                Thoát
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      <Modal open={showModalUpdatePassword} onClose={handleShowModalUpdatePassword}>
        <Box sx={style}>
          <Typography className='pb-6' id='modal-modal-title' variant='h6' component='h2'>
            Đổi mật khẩu
          </Typography>
          <form noValidate onSubmit={formik2.handleSubmit}>
            <Grid2 spacing={3} container>
              <Grid2 xs={12}>
                <TextField
                  label='Mật khẩu hiện tại'
                  onChange={formik2.handleChange}
                  name='name'
                  size='small'
                  value={formik2.values.name}
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={12}>
                <TextField
                  label='Mật khẩu mới'
                  onChange={formik2.handleChange}
                  name='name'
                  size='small'
                  value={formik2.values.name}
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={12}>
                <TextField
                  label='Xác nhận mật khẩu mới'
                  onChange={formik2.handleChange}
                  name='name'
                  size='small'
                  value={formik2.values.name}
                  fullWidth
                />
              </Grid2>
            </Grid2>
            <div className='flex mt-6 justify-end'>
              <Button disabled={showLoader || !formik2.dirty} variant='contained' type='submit'>
                {showLoader ? 'Đang lưu...' : 'Lưu'}
              </Button>
              <Button disabled={showLoader} onClick={handleShowModalUpdatePassword} variant='outlined' sx={{ ml: 1 }}>
                Thoát
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default Profile
