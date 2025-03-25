import React from "react";
import Image from "next/image";

// Sample ride data
const rideHistory = [
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
];

const HistoryPage = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">History</h2>
      <div className="flex justify-between mb-4">
        <div className="bg-yellow-400 p-2 rounded-lg flex-1 text-center mr-2">
          <p className="text-sm">Total Jobs</p>
          <p className="text-lg font-bold">10</p>
        </div>
        <div className="bg-orange-400 p-2 rounded-lg flex-1 text-center ml-2">
          <p className="text-sm">Earned</p>
          <p className="text-lg font-bold">$325.00</p>
        </div>
      </div>
      {rideHistory.map((ride) => (
        <RideCard key={ride.id} ride={ride} />
      ))}
    </div>
  );
};

const RideCard = ({ ride }: { ride: any }) => {
  return (
    <div className="mb-4 p-4 shadow-md bg-white rounded-lg">
      <div className="flex items-center mb-2">
        <Image
          src={ride.driverImage}
          alt={ride.driver}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3 flex-1">
          <p className="font-bold">{ride.driver}</p>
          <p className="text-gray-600">{ride.amount}</p>
        </div>
        <p className="text-sm text-gray-500">{ride.distance}</p>
      </div>
      {ride.paymentMethod && (
        <span className="bg-yellow-300 text-xs px-2 py-1 rounded-md mr-2">
          {ride.paymentMethod}
        </span>
      )}
      {ride.discount && (
        <span className="bg-yellow-300 text-xs px-2 py-1 rounded-md">Discount</span>
      )}
      <div className="mt-2 text-gray-700 text-sm">
        <p className="font-semibold">PICK UP</p>
        <p>{ride.pickup}</p>
        <p className="font-semibold mt-1">DROP OFF</p>
        <p>{ride.dropoff}</p>
      </div>
    </div>
  );
};

export default HistoryPage;
