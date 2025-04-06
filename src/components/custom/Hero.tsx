import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center lg:mx-56 mx-4 gap-9 lg:h-[85vh]'>

        <h1 className='font-extrabold text-5xl leading-relaxed text-center mt-16'>
        <span className='text-orange-500'>Discover Your Next Adventure with AI: </span>
        Personalized Itineraries at Your Fingertips</h1>

        <h3 className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator,creating custom itineraries tailored to your interests and budget.</h3>
        <Link to={'/create-trip'}>
        <Button className='lg:px-4 lg:py-2 py-6 px-8 lg:mb-0 mb-5'>Get Started, It's Free.</Button>
        </Link>
    </div>
  )
}

export default Hero