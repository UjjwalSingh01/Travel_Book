import React from 'react'
import HeroSection from './components/HeroSection'
import FeatureSection from './components/FeatureSection'
import TravelQuoteSection from './components/TravelQuoteSection'
import Newsletter from './components/NewsLetter'
import ConnectWithTravelers from './components/ConnectWithTraveller'

const HomePage: React.FC = () => {
  return (
    <div>
        <HeroSection />
        <FeatureSection />
        <TravelQuoteSection />
        <ConnectWithTravelers />
        <Newsletter />
    </div>
  )
}

export default HomePage