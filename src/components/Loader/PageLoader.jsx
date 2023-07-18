import React from 'react'
import { PacmanLoader } from 'react-spinners'

const PageLoader = () => {
  return <div style={{height: '690px'}} className='flex justify-center items-center'>
    <PacmanLoader color='#1976d2' />
  </div>
}

export default PageLoader
