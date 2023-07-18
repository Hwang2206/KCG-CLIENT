import { Box, Card, CardContent, Container } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'

const Equipment = () => {
  return (
    <Container>
      <Grid2 container sx={{ display: 'flex', alignItems: 'center', my: 8, flexWrap: 'wrap' }}>
        <Grid2 sx={{flexDirection: ''}}>
          <Box>
            <Card>
              <CardContent>Hello</CardContent>
            </Card>
          </Box>
          <Box>
            <Card>
              <CardContent>Hello</CardContent>
            </Card>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default Equipment
