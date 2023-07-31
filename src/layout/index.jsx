import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Layout = ({ children }) => {
  return (
    <div className='relative'>
      <Header />
      <div style={{maxHeight: '690px'}}>{children}</div>
      <div className='hide-on-mobile fixed bottom-0 left-0 right-0'>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
