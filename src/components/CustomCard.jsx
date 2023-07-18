import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomCard = ({title, description, price, url}) => {
  const navigate = useNavigate()

  return (
    <Card className='text-center' style={{height: '690px'}}>
      <CardHeader title='TITLE' />
      <CardContent>
        <img src='https://cali.vn/storage/app/media/2021/Services/Coaching/Yoga/Section02_900x600_nguoimoibatdau.jpg'/>
        <Typography variant='h4' className='pb-5 pt-3' fontWeight={300}>4.000.000</Typography>
        <Typography className='pb-5'>Gentle Yoga là sự kết hợp của các tư thế chậm và đơn giản, nhưng có tác động sâu sắc đến hệ cơ và xương. Đây là lớp học cơ bản, nhẹ nhàng và thư giãn nên rất phù hợp với những người mới bắt đầu, đồng thời rất quan trọng cho những người đã có kinh nghiệm luyện tập trong việc bảo vệ cơ thể khỏi các chấn thương liên quan đến cơ và xương.</Typography>
        <Button onClick={() => navigate('/card-membership')} variant='contained'>ĐĂNG KÝ GÓI</Button>
      </CardContent>
    </Card>
  )
}

export default CustomCard
