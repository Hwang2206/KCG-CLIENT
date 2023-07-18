import * as Yup from 'yup'

const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0|3|4|5|7|8])+([0-9]{7})$/

export const loginValidationSchema = Yup.object({
  phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
  password: Yup.string().max(255).required('Mật khẩu không được để trống')
})

export const registerValidationSchema = Yup.object({
  email: Yup.string().email('Địa chỉ email không hợp lệ').max(255),
  name: Yup.string().max(255).required('Vui nhập nhập họ tên của bạn'),
  phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
  password: Yup.string().max(255).required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có độ dài ít nhất 8 kí tự'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp')
    .required('Vui lòng nhập lại mật khẩu')
})

export const changePasswordValidationSchema = Yup.object({
  old_password: Yup.string().max(255).required('Vui lòng nhập mật khẩu hiện tại'),
  password: Yup.string()
    .max(255)
    .notOneOf([Yup.ref('old_password')], 'Mật khẩu mới không được trùng với mật khẩu hiện tại')
    .required('Vui lòng nhập mật khẩu mới')
    .min(8, 'Mật khẩu phải có độ dài ít nhất 8 kí tự'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp')
    .required('Vui lòng nhập lại mật khẩu')
})
