import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "../../hooks/use-toast";
import { useEffect, useState } from "react";
import InfoSec from "../components/InfoSec";
import Hotels from "../components/Hotels";
import Visits from "../components/Visits";


interface TripDetails {
  trip_details: {
    location: string;
    duration: string;
    budget: string;
    travelers: string;
  };
  hotel_options: Array<{
    hotelName: string;
    hotelAddress: string;
    image?: string;
    price?: string;
    rating?: string;
  }>;
  itinerary: {
    [key: string]: {
      best_time_to_visit: string;
      places: Array<{
        placeName: string;
        placeDetails: string;
        rating: string;
        ticketPricing: string;
        timeTravel: string;
        geoCoordinates: string;
      }>;
    };
  };
}

function ViewTrip() {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<TripDetails | null>(null);

  useEffect(() => {
    if (tripId) {
      getTripData();
    } else {
      console.warn("No trip ID provided");
    }
  }, [tripId]);

  const getTripData = async () => {
    try {
      console.log("Fetching trip with ID:", tripId);
      const docRef = doc(db, "AiTour", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tripData = docSnap.data() as TripDetails;
        setTrip(tripData);
        console.log("Trip Data:", tripData);
        toast({
          title: "Trip loaded successfully!",
          description: "Trip data fetched from Firestore."
        });
      } else {
        console.warn("No such document!");
        setTrip(null);
        toast({
          title: "Trip not found",
          description: "No data available for the provided trip ID.",        });
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch trip data. Please try again."
      });
    }
  };

  return (
    <div className="lg:px-56 px-5 py-10">
      {trip ? <InfoSec trip={trip} /> : <p>No trip data available.</p>}
      <Hotels trip={trip} />
      <Visits trip={trip} />
    </div>
  );
}

export default ViewTrip;
