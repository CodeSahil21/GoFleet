'use client';
import React, { useState } from "react";
import Image from "next/image";

interface RideRequest {
  id: number;
  name: string;
  fare: string;
  distance: string;
  pickup: string;
  dropoff: string;
  image: string;
  applePay: boolean;
  discount: boolean;
}

const rideRequests: RideRequest[] = [
  {
    id: 1,
    name: "Esther Berry",
    fare: "$25.00",
    distance: "2.2 km",
    pickup: "7958 Swift Village",
    dropoff: "105 William St, Chicago, US",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    applePay: true,
    discount: true,
  },
  {
    id: 2,
    name: "Callie Greer",
    fare: "$20.00",
    distance: "1.5 km",
    pickup: "62 Kobe Trafficway",
    dropoff: "280 Icie Park Suite 496",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    applePay: true,
    discount: true,
  },
  {
    id: 3,
    name: "Earl Guerrero",
    fare: "$10.00",
    distance: "0.5 km",
    pickup: "9965 Soledad Ports",
    dropoff: "",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    applePay: true,
    discount: false,
  },
];

const RideCard: React.FC<{ ride: RideRequest; selectedRide: number | null; setSelectedRide: (id: number) => void; }> = ({ ride, selectedRide, setSelectedRide }) => {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg" onClick={() => setSelectedRide(ride.id)}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={ride.image} alt={ride.name} width={50} height={50} className="rounded-full" />
            <div>
              <h4 className="font-semibold text-lg">{ride.name}</h4>
              <div className="flex gap-1 mt-1">
                {ride.applePay && <span className="bg-yellow-300 text-xs px-2 py-1 rounded-md">ApplePay</span>}
                {ride.discount && <span className="bg-yellow-300 text-xs px-2 py-1 rounded-md">Discount</span>}
              </div>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-xl font-bold">{ride.fare}</h4>
            <p className="text-gray-500 text-sm">{ride.distance}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Pick Up</p>
          <p className="text-lg font-medium text-gray-900">{ride.pickup}</p>
          {ride.dropoff && (
            <>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-2">Drop Off</p>
              <p className="text-lg font-medium text-gray-900">{ride.dropoff}</p>
            </>
          )}
        </div>
        {selectedRide === ride.id && (
          <button className="w-full mt-3 bg-yellow-400 text-lg font-semibold py-2 rounded-lg">Accept</button>
        )}
      </div>
    );
  };
  
  const CaptainRequestPage: React.FC = () => {
    const [selectedRide, setSelectedRide] = useState<number | null>(null);
  
    return (
      <div className="bg-gray-100 min-h-screen px-0 pb-4">
        <div className="bg-orange-500 w-full text-white py-3 text-center font-medium mt-2 rounded-lg">You have 10 new requests.</div>
        <div className="w-full space-y-4 mt-4">
          {rideRequests.map((ride) => (
            <RideCard key={ride.id} ride={ride} selectedRide={selectedRide} setSelectedRide={setSelectedRide} />
          ))}
        </div>
      </div>
    );
  };
  
  export default CaptainRequestPage;
