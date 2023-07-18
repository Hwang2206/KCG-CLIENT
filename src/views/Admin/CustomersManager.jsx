import { Box, Button, Chip, Container, Divider, Modal, Switch, TextField, Typography } from '@mui/material'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import CustomTable from '../../components/Table/CustomTable'
import { CustomerServices } from '../../services/customers'
import moment from 'moment/moment'
import JWTContext from '../../contexts/JWTContext'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useFormik } from 'formik'
import { handleAlertConfirm } from '../../hooks/useAlertConfirm'
import Swal from 'sweetalert2'
import PageLoader from '../../components/Loader/PageLoader'

const CustomersManager = () => {
  const [showLoader, setShowLoader] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetched, setIsFetched] = useState(false)
  const [listCustomers, setListCustomers] = useState([])
  const [dataCustomer, setDataCustomer] = useState({
    id: null,
    name: '',
    phone: '',
    email: '',
    password: '',
    type: false,
    active: false
  })
  const { user } = useContext(JWTContext)
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => {
    setShowModal(!showModal)
  }
  const formik = useFormik({
    initialValues: dataCustomer,
    enableReinitialize: true,
    onSubmit: (values, helpers) => {
      const { id, ...rest } = values
      const data = { ...rest }
      handleAlertConfirm({
        text: 'Bạn có chắc chắn muốn lưu ?',
        icon: 'question',
        showCancelButton: true,
        cancelText: 'Huỷ',
        confirmText: 'Lưu',
        handleConfirmed: () => {
          setShowLoader(true)
          console.log(id)
          console.log(data)
          CustomerServices.updateByID(values.id, data)
            .then(() => {
              setTimeout(() => {
                handleAlertConfirm({
                  html: `Cập nhật thông tin tài khoản <b>${values.phone}</b> thành công`,
                  icon: 'success'
                })
              }, 1000)
            })
            .catch(() => {
              setShowLoader(false)
              Swal.fire('', 'Đã xảy ra lỗi khi cập nhật thông tin', 'error')
            })
        }
      })
    }
  })

  const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }

  const handleShowModalUpdate = (row) => {
    setShowModal(true)
    setDataCustomer({
      id: row.user_id,
      name: row.user_name,
      password: row.user_password,
      email: row.user_email,
      phone: row.user_phone,
      type: row.user_type,
      active: row.user_active
    })
  }

  const handleDelete = (row) => {
    handleAlertConfirm({
      html: `Bạn có chắc chắn muốn xoá tài khoản <b>${row.user_phone}</b> ?<br/>. Thao tác này không thể khôi phục`,
      icon: 'warning',
      showCancelButton: true,
      handleConfirmed: () => {
        setShowLoader(true)
        CustomerServices.deleteByID(row.user_id)
          .then(() => {
            setTimeout(() => {
              handleAlertConfirm({
                html: `Xoá tài khoản <b>${row.user_phone}</b> thành công`,
                icon: 'success'
              })
            }, 1000)
          })
          .catch(() => {
            setTimeout(() => {
              setShowLoader(false)
              Swal.fire('', 'Đã xảy ra lỗi khi xoá tài khoản', 'error')
            }, 1000)
          })
      }
    })
  }

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'user_id'
      },
      {
        Header: 'Tên khách hàng',
        accessor: 'user_name'
      },
      {
        Header: 'Số điện thoại',
        accessor: 'user_phone'
      },
      {
        Header: 'Email',
        accessor: 'user_email'
      },
      {
        Header: 'Vai trò',
        accessor: 'user_type',
        Cell: ({ value }) => (
          <Chip
            size='small'
            label={<span style={{ fontSize: '15px', padding: 4 }}>{value ? 'Quản trị viên' : 'Người dùng'}</span>}
            color={value ? 'success' : 'primary'}
          />
        )
      },
      {
        Header: 'Trạng thái',
        accessor: 'user_active',
        Cell: ({ value }) => (
          <span className={value ? 'text-green-500' : 'text-red-500'}>
            {value ? 'Đang hoạt động' : 'Ngừng hoạt động'}
          </span>
        )
      },
      {
        Header: 'Ngày khởi tạo',
        accessor: 'createdAt',
        Cell: ({ value }) => moment(value).utcOffset(7).format('DD/MM/YYYY HH:mm:ss')
      },
      {
        Header: 'Cập nhật lần cuối',
        accessor: 'updatedAt',
        Cell: ({ value }) => moment(value).utcOffset(7).format('DD/MM/YYYY HH:mm:ss')
      }
    ],
    []
  )

  useEffect(() => {
    CustomerServices.getAll()
      .then((res) => {
        const data = res.data.data.filter((data) => data.user_id !== user.user_id)
        if (data) {
          setListCustomers(data)
        }
        setTimeout(() => {
          setIsLoading(false)
          setIsFetched(true)
        }, 1500)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <PageLoader />

  return (
    <Container style={{ overflow: 'hidden', height: '690px' }} maxWidth='100%' className='mt-6'>
      <CustomTable
        title='Danh sách khách hàng'
        handleUpdate={handleShowModalUpdate}
        handleDelete={handleDelete}
        columns={columns}
        data={listCustomers}
      />
      <Modal open={showModal} onClose={handleShowModal}>
        <Box sx={style}>
          <Typography className='pb-6' id='modal-modal-title' variant='h6' component='h2'>
            Cập nhật thông tin
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid2 spacing={3} container>
              <Grid2 xs={6}>
                <TextField
                  label='Họ và tên'
                  onChange={formik.handleChange}
                  name='name'
                  size='small'
                  value={formik.values.name}
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  label='Số điện thoại'
                  onChange={formik.handleChange}
                  name='phone'
                  size='small'
                  value={formik.values.phone}
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  label='Email'
                  onChange={formik.handleChange}
                  name='email'
                  size='small'
                  value={formik.values.email}
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  label='Mật khẩu'
                  onChange={formik.handleChange}
                  name='password'
                  size='small'
                  value={formik.values.password}
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={6}>
                Trạng thái tài khoản
                <Switch name='active' checked={formik.values.active} onChange={formik.handleChange} />
              </Grid2>
              <Grid2 xs={6}>
                Quản trị viên <Switch name='type' checked={formik.values.type} onChange={formik.handleChange} />
              </Grid2>
            </Grid2>
            <div className='flex mt-4 justify-end'>
              <Button disabled={showLoader || !formik.dirty} variant='contained' type='submit'>
                {showLoader ? 'Đang lưu...' : 'Lưu'}
              </Button>
              <Button disabled={showLoader} onClick={handleShowModal} variant='outlined' sx={{ ml: 1 }}>
                Thoát
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </Container>
  )
}

export default CustomersManager
