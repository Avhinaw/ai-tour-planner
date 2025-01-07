import React from 'react'
import { Link } from 'react-router-dom'

function TripsItem({trip}) {
  return (
    <Link to={'/view-trip/'+trip.id}>
    <div className='hover:scale-105 transition-all ease-in-out'>
        <img src="/placeholder.jpg" alt="" className='w-[300px] h-[300px] object-cover rounded-lg' />
        <h2 className='px-2 py-1'>{trip.tripData.trip_details.location}</h2>
        <h2 className="text-sm text-gray-600 px-2" >{trip.tripData.trip_details.duration} trip with {trip.tripData.trip_details.budget} budget </h2>
    </div>
    </Link>
  )
}

export default TripsItem