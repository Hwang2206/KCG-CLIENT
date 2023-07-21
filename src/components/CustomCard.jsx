import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils/common'

const CustomCard = ({title, description, price, url}) => {
  const navigate = useNavigate()

  return (
    <Card className='text-center' style={{height: '690px'}}>
      <CardHeader title={title} />
      <CardContent>
        <img src={url}/>
        <Typography variant='h4' className='pb-5 pt-3' fontWeight={300}>{formatCurrency(price)}</Typography>
        <Typography className='pb-5'>{description}</Typography>
        <Button onClick={() => navigate('/card-membership')} variant='contained'>ĐĂNG KÝ GÓI</Button>
      </CardContent>
    </Card>
  )
}

export default CustomCard
