import React from "react";
import Image from "next/image";
import 'remixicon/fonts/remixicon.css';
interface User {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
}

interface Ride {
    id: number;
    userId: number;
    captainId?: number | null;
    pickup: string;
    destination: string;
    fare: number;
    status: 'PENDING' | 'ACCEPTED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
    duration?: number | null;
    distance?: number | null;
    paymentID?: string | null;
    orderId?: string | null;
    signature?: string | null;
    otp: string;
    user?: User; // Include user details as per the Prisma query
}
interface RidePopUpProps {
   setRidePopupPanel: (value: boolean) => void;
   setConfirmedRidePopupPanel: (value: boolean) => void;
    ride?: Ride | null; // Optional ride prop; 
    confirmRide?: () => void; // Optional function to confirm the ride
}
const RidePopUp: React.FC<RidePopUpProps> = ({ setRidePopupPanel, setConfirmedRidePopupPanel, ride,confirmRide }) => {
  if (!ride) {
    return null; // If no ride data is passed, do not render the component
  }

  return (
    <div>
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-3xl p-5">
        {/* Close Button */}
        <h5
          onClick={() => setRidePopupPanel(false)}
          className="p-1 text-center absolute top-0 w-[93%]"
        >
          <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>

        {/* Ride Notification */}
        <div className="text-center mt-4 mb-4">
          <h4 className="text-lg font-semibold">New Ride Available</h4>
        </div>

        {/* Rider Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              className="h-12 w-12 rounded-full"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Rider Profile"
              width={48}
              height={48}
            />
            <div>
              <h4 className="text-lg font-semibold">
                {ride.user?.firstname} {ride.user?.lastname || ''}
              </h4>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-lg font-bold">₹{ride.fare}</h4>
            <p className="text-gray-500 text-sm">{ride.distance} km</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Ride Details */}
        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-xs uppercase">Pick Up</p>
            <p className="text-lg font-medium">{ride.pickup}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase">Drop Off</p>
            <p className="text-lg font-medium">{ride.destination}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-5">
          <button
            onClick={() => setRidePopupPanel(false)}
            className="text-gray-500 text-lg font-semibold"
          >
            Ignore
          </button>
          <button
            onClick={async() => {
              setRidePopupPanel(false);
              setConfirmedRidePopupPanel(true);
              await confirmRide?.(); // Call the confirmRide function if provided
            }}
            className="bg-gray-900 text-white text-lg font-semibold py-2 px-6 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
