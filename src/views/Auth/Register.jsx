import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormik } from 'formik'
import { registerValidationSchema } from '../../hooks/useValidation'
import useAuth from '../../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { axiosConfig } from '../../utils/axiosConfig'

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [errMessage, setErrMessage] = React.useState('')
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      password: '',
      repassword: '',
      email: '',
      submit: null
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values, helpers) => {
      helpers.setSubmitting(true)
      const newUser = {
        name: values.name,
        phone: values.phone,
        password: values.password,
        email: values.email
      }
      try {
        axiosConfig.post('/auth/register', newUser)
          .then(() => {
            setTimeout(() => {
              navigate('/login')
              Swal.fire({
                html: 'Đăng ký tài khoản thành công<br/>Bạn đã được chuyển sang trang đăng nhập',
                icon: 'success',
                confirmButtonText: 'Xác nhận'
              })
            }, 1000)
          })
          .catch((err) => {
            if (err.message === 'Network Error' || err.response.status === 500) {
              setErrMessage('Lỗi kết nối máy chủ !')
            } else {
              setErrMessage('Lỗi: Số điện thoại hoặc email đã tồn tại')
            }
            setTimeout(() => {
              helpers.setStatus({ success: false })
              helpers.setSubmitting(false)
            }, 1000)
          })
      } catch (err) {
        helpers.setStatus({ success: false })
        helpers.setSubmitting(false)
      }
    }
  })
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowRePassword = () => setShowRePassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <div style={{ height: '690px' }} className='flex items-center justify-center'>
      <Card sx={{ borderRadius: '0.5rem' }} className='mt-6 pt-2 px-20'>
        <CardContent>
          <Typography variant='h5' fontWeight={800} fontSize={30} textAlign='center'>
            ĐĂNG KÝ TÀI KHOẢN
          </Typography>
          {/* <img src={logo} width={400} /> */}
          {!formik.isSubmitting && errMessage && (
            <Typography textAlign='center' color='error' sx={{ mt: 3 }} variant='body1'>
              {errMessage}
            </Typography>
          )}
          <form noValidate onSubmit={formik.handleSubmit}>
            <div className='mt-5 mb-5' style={{ maxWidth: '456px' }}>
              <TextField
                onChange={formik.handleChange}
                helperText={formik.touched.name && formik.errors.name}
                style={{ marginBottom: 20 }}
                error={!!(formik.touched.name && formik.errors.name)}
                label={<span>Họ và tên <span className='text-red-500'>*</span></span>}
                fullWidth
                name='name'
                value={formik.values.name}
              />
              <TextField
                onChange={formik.handleChange}
                helperText={formik.touched.phone && formik.errors.phone}
                style={{ marginBottom: 20 }}
                error={!!(formik.touched.phone && formik.errors.phone)}
                label={<span>Số điện thoại <span className='text-red-500'>*</span></span>}
                fullWidth
                name='phone'
                value={formik.values.phone}
              />
              <TextField
                onChange={formik.handleChange}
                helperText={formik.touched.email && formik.errors.email}
                style={{ marginBottom: 20 }}
                error={!!(formik.touched.email && formik.errors.email)}
                label='Địa chỉ email'
                fullWidth
                name='email'
                value={formik.values.email}
              />

              <TextField
                fullWidth
                variant='outlined'
                label={<span>Mật khẩu <span className='text-red-500'>*</span></span>}
                id='outlined-adornment-password'
                error={!!(formik.touched.password && formik.errors.password)}
                value={formik.values.password}
                onChange={formik.handleChange}
                style={{ marginBottom: 20 }}
                name='password'
                type={showPassword ? 'text' : 'password'}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                variant='outlined'
                label={<span>Nhập lại mật khẩu <span className='text-red-500'>*</span></span>}
                id='outlined-adornment-password'
                error={!!(formik.touched.repassword && formik.errors.repassword)}
                value={formik.values.repassword}
                onChange={formik.handleChange}
                name='repassword'
                type={showRePassword ? 'text' : 'password'}
                helperText={formik.touched.repassword && formik.errors.repassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowRePassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showRePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>

            <div className='text-right'>
              Đã có tài khoản ?{' '}
              <Link className='text-blue-500 hover:underline hover:text-blue-500' to='/login'>
                Đăng nhập
              </Link>
            </div>

            <div className='w-full text-center mt-7'>
              <Button disabled={formik.isSubmitting} size='large' type='submit' variant='contained'>
                {formik.isSubmitting ? (
                  <span className='flex flex-between items-center'>
                    <CircularProgress className='mr-3' size={15} />
                    Đang đăng ký...
                  </span>
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
