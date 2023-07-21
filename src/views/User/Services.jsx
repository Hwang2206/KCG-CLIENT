import { Grid3x3 } from '@mui/icons-material'
import { Box, Container } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'
import CustomCard from '../../components/CustomCard'
import { ServiceService } from '../../services/services'

const Services = () => {
  const [listService, setListService] = useState([])

  useEffect(() => {
    ServiceService.getAll().then((res) => {
      const data = res.data.data
      setListService(data)
    })
  }, [])

  console.log(listService)

  return (
    <Container className='mt-5'>
      <Grid2 container spacing={5}>
        {listService.map((service, index) => (
          <Grid2 key={`service_${index}`} xs={12/listService.length}>
            <CustomCard
              title={service.service_name}
              url={service.service_url}
              description={service.service_description}
              price={service.service_price}
            />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  )
}

export default Services
