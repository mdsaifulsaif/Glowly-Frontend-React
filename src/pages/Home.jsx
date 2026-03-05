import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import BestSellers from '../components/BestSellers';
import CategorySection from '../components/CategorySection';
import NewArrivals from '../components/NewArrivals';
import SkincarePhilosophy from '../components/SkincarePhilosophy';

function Home() {
    const { setUser } = useAuth();
  return (
    <div className='min-h-screen'>
        
        <Hero />
        <BestSellers />
        <CategorySection />
        <NewArrivals />
        <SkincarePhilosophy />
        <Newsletter />
    </div>
  )
}

export default Home