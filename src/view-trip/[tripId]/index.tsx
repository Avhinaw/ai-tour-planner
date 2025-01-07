import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "../../hooks/use-toast";
import { useEffect, useState } from "react";
import InfoSec from "../components/infoSec";
import Hotels from "../components/Hotels";
import Visits from "../components/Visits";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Record<string, any> | null>(null); // Adjusted type for trip data

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
        const tripData = docSnap.data();
        setTrip(tripData);
        console.log("Trip Data:", tripData);
        toast({ title: "Trip loaded successfully!", description: "Trip data fetched from Firestore.", status: "success" });
      } else {
        console.warn("No such document!");
        setTrip(null); // Ensure trip state is cleared
        toast({ title: "Trip not found", description: "No data available for the provided trip ID.", status: "error" });
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast({ title: "Error", description: "Failed to fetch trip data. Please try again.", status: "error" });
    }
  };

  return (
    <div className="lg:px-56 px-5 py-10">
      {trip ? <InfoSec trip={trip} /> : <p>No trip data available.</p>}
      <Hotels trip={trip}/>
      <Visits trip={trip}/>
    </div>
  );
}

export default ViewTrip;
