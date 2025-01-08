
function InfoSec({ trip }: any) {
  const { location, duration, budget, travelers } = trip.tripData.trip_details;

  return (
    <div>
      <img 
        src="/placeholder.jpg" 
        alt="placeholder" 
        className="object-cover h-[300px] w-full rounded-2xl" 
      />
      <div className="my-5 flex flex-col gap-4">
        <h2 className="font-bold text-2xl">{location}</h2>
        <div className="flex items-center gap-5">
          <h3 className="bg-gray-200 py-1 px-5 rounded-full text-gray-500 hover:animate-pulse">
            📆 {duration}
          </h3>
          <h3 className="bg-gray-200 py-1 px-5 rounded-full text-gray-500 hover:animate-pulse">
            💸 {budget}
          </h3>
          <h3 className="bg-gray-200 py-1 px-5 rounded-full text-gray-500 hover:animate-pulse">
            🧳 {travelers}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoSec;
