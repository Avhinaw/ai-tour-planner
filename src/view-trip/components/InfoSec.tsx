function InfoSec({trip}) {
  return (
    <div className=''>
        <img src="/placeholder.jpg" alt="placeholder" className='object-cover h-[300px] w-full rounded-2xl'/>
        <div className='my-5 flex flex-col gap-4'>
            <h2 className='font-bold text-2xl'>{trip.tripData.trip_details.location}</h2>
            <div className='flex items-center gap-5'>
                <h3 className='bg-gray-200 py-1 px-5 rounded-full text-gray-500 hover:animate-pulse'>📆 {trip.tripData.trip_details.duration}</h3>
                <h3 className='bg-gray-200 py-1 px-5 rounded-full text-gray-500 hover:animate-pulse'>💸 {trip.tripData.trip_details.budget}</h3>
                <h3 className='bg-gray-200 py-1 px-5 rounded-full text-gray-500 hover:animate-pulse'>🧳 {trip.tripData.trip_details.travelers}</h3>
            </div>
        </div>
    </div>
  )
}

export default InfoSec;