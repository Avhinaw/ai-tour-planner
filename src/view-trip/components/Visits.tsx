import { Link } from "react-router-dom";

function Visits({trip}) {
  if (!trip || !trip.tripData.itinerary) {
    return <p>No Visits recommendations available.</p>;
  }

  const itineraryEntries = Object.entries(trip.tripData.itinerary).sort(
    ([keyA], [keyB]) => {
      const dayA = parseInt(keyA.replace('day', ''), 10);
      const dayB = parseInt(keyB.replace('day', ''), 10);
      return dayA - dayB;
    }
  );
  

  return (
    <div className="my-5">
      <h2 className="text-xl font-bold my-5" >Places to Visit</h2>
      <div>
      {itineraryEntries.map(([dayKey, dayDetails], idx) => (
          <div>
             <h3 className="text-lg font-semibold my-1">
              {dayKey.replace(/day(\d+)/, 'Day $1')}
            </h3>
            <h4 className="text-orange-600 font-semibold">{dayDetails.best_time_to_visit}</h4>

            

            <div className="flex flex-wrap gap-5 my-2">
              
            {dayDetails.places.map((place, placeIdx) => (
              <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName + "," + place.geoCoordinates} target='_blank'>
                <div key={placeIdx} className="border w-[250px] rounded-lg p-4 hover:scale-105 transition-all ease-in-out">
                  <img
                    className="object-cover rounded-lg w-[200px]"
                    src={'/placeholder.jpg'}
                    alt={place.placeName}
                  />
                  <h4 className="text-md font-medium mt-2">{place.placeName}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                  {place.placeDetails.length > 80 ? `${place.placeDetails.slice(0, 80)}...` : place.placeDetails}
                    </p>
                  <p className="text-sm mt-1">⭐ Rating: {place.rating}</p>
                  <p className="text-sm mt-1">💰 Ticket Pricing: {place.ticketPricing}</p>
                  <p className="text-sm mt-1">🕒 Time Travel: {place.timeTravel}</p>
</div>
            </Link>
            ))}
            </div>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default Visits










