import { Grid3x3 } from '@mui/icons-material'
import { Box, Container } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import CustomCard from '../../components/CustomCard'

const Services = () => {
  return (
    <Container className='mt-5'>
      <Grid2 container spacing={5}>
        <Grid2 xs={4}>
          <CustomCard />
        </Grid2>
        <Grid2 xs={4}>
          <CustomCard />
        </Grid2>
        <Grid2 xs={4}>
          <CustomCard />
        </Grid2>
        <Grid2 xs={4}>
          <CustomCard />
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default Services
