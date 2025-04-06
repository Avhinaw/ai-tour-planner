import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import TripsItem from './components/TripsItem';

interface Trip {
  id: string;
  tripData: {
    trip_details: {
      location: string;
      duration: string;
      budget: string;
    };
  };
}

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState<Trip[]>([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.email) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'AiTour'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);

    const trips: Trip[] = [];
    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() } as Trip);
    });
    setUserTrips(trips);
  };

  return (
    <div className="lg:px-56 py-10 px-5">
      <h2 className="text-3xl font-bold">My Trips</h2>
      <div className="grid lg:grid-cols-3 lg:gap-4 gap-10 py-8 px-2">
        {userTrips.map((trip) => (
          <TripsItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
