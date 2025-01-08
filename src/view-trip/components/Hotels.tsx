import { Link } from "react-router-dom";

function Hotels({ trip }: any) {
  if (!trip?.tripData?.hotel_options) {
    return <p>No hotel recommendations available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Hotel Recommendations</h2>
      <div className="py-4 flex flex-wrap gap-5">
        {trip.tripData.hotel_options.map((item: any, idx: number) => (
          <Link 
            key={idx}
            to={`https://www.google.com/maps/search/?api=1&query=${item.hotelName},${item.hotelAddress}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className="rounded-lg lg:w-[252px] w-[220px] hover:scale-105 transition-all ease-in-out cursor-pointer">
              <img
                className="h-[200px] w-full rounded-xl object-cover"
                src={item.image || "/placeholder.jpg"}
                alt={item.hotelName || "Hotel"}
              />
              <div className="mt-3">
                <h4 className="text-md font-semibold">{item.hotelName || "Hotel Name"}</h4>
                <h6 className="text-gray-500 text-sm mt-1">
                  📍{item.hotelAddress ? (item.hotelAddress.length > 30 ? `${item.hotelAddress.slice(0, 30)}...` : item.hotelAddress) : "Address not available"}
                </h6>
                <h5 className="text-sm mt-1">💰 {item.price || "N/A"}</h5>
                <h5 className="text-sm mt-1">⭐ {item.rating || "Not Rated"}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
