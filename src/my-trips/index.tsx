import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import TripsItem from './components/TripsItem';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);
    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate('/');
            return;
        }
        const q = query(collection(db, 'AiTour'), where('userEmail','==',user.email));

        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prev=>[...prev,doc.data()]);
    });

    }


  return (
    <div className='px-56 py-10'>
        <h2 className='text-3xl font-bold'>My Trips</h2>
        <div className='grid grid-cols-3 gap-4 py-8 px-2'>
            {
                userTrips.map((trip, idx) => (
                    <TripsItem trip={trip} />
                ))
            }
        </div>
    </div>
  )
}

export default MyTrips