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
import React from 'react'
import logo from '../../assets/logo.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormik } from 'formik'
import { loginValidationSchema } from '../../hooks/useValidation'
import useAuth from '../../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [errMessage, setErrMessage] = React.useState('')
  const navigate = useNavigate()
  const auth = useAuth()
  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
      submit: null
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values, helpers) => {
      helpers.setSubmitting(true)
      try {
        auth
          .login(values.phone, values.password)
          .then(() => {
            setTimeout(() => {
              navigate('/')
              Swal.fire({
                text: 'Đăng nhập thành công',
                icon: 'success',
                confirmButtonText: 'Xác nhận'
              })
            }, 1000)
          })
          .catch((err) => {
            if (err.message === 'Network Error' || err.response.status === 500) {
              setErrMessage('Lỗi kết nối máy chủ !')
            } else if(err.response.status === 403) {
              setErrMessage('Tài khoản của bạn đã bị vô hiệu hoá')
            }
             else {
              setErrMessage('Số điện thoại hoặc mật khẩu không chính xác')
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <div style={{ height: '690px' }} className='flex items-center justify-center'>
      <Card sx={{ borderRadius: '0.5rem' }} className='py-10 px-20'>
        <CardContent>
          <Typography variant='h5' fontWeight={800} fontSize={30} textAlign='center'>
            Đăng nhập
          </Typography>
          <img src={logo} width={400} />
          {!formik.isSubmitting && errMessage && (
            <Typography textAlign='center' color='error' sx={{ mt: 3 }} variant='body1'>
              {errMessage}
            </Typography>
          )}
          <form noValidate onSubmit={formik.handleSubmit}>
            <div className='mt-10 mb-5'>
              <TextField
                onChange={formik.handleChange}
                helperText={formik.touched.phone && formik.errors.phone}
                style={{ marginBottom: 20 }}
                error={!!(formik.touched.phone && formik.errors.phone)}
                label='Số điện thoại'
                fullWidth
                name='phone'
                value={formik.values.phone}
              />

              <TextField
                fullWidth
                variant='outlined'
                label='Mật khẩu'
                id='outlined-adornment-password'
                error={!!(formik.touched.password && formik.errors.password)}
                value={formik.values.password}
                onChange={formik.handleChange}
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
            </div>

            <div className='text-right'>
              Chưa có tài khoản ? <Link className='text-blue-500 hover:underline hover:text-blue-500' to='/register'>Đăng ký ngay</Link>
            </div>

            <div className='w-full text-center mt-7'>
              <Button disabled={formik.isSubmitting} size='large' type='submit' variant='contained'>
                {formik.isSubmitting ? (
                  <span className='flex flex-between items-center'>
                    <CircularProgress className='mr-3' size={15} />
                    Đang đăng nhập...
                  </span>
                ) : (
                  'Đăng nhập'
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
