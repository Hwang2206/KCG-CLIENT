import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import pic1 from '../assets/carousel-1.jpg'
import pic2 from '../assets/carousel-2.jpg'
import pic3 from '../assets/carousel-3.jpg'

const Home = () => {
  return (
    <div>
      <Carousel
      showIndicators={false}
        autoPlay
        interval={2000}
        emulateTouch
        infiniteLoop
        showArrows
        showThumbs={false}
        stopOnHover
        showStatus={false}
      >
        <div>
          <img src={pic1} />
        </div>
        <div>
          <img src={pic2} />
        </div>
        <div>
          <img src={pic3} />
        </div>
      </Carousel>
    </div>
  )
}

export default Home
