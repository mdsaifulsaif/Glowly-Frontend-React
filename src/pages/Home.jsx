import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';

function Home() {
    const { setUser } = useAuth();
  return (
    <div className='min-h-screen'>
        
        <Hero />
        <Newsletter />
    </div>
  )
}

export default Home