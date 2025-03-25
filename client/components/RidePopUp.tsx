import React from "react";
import Image from "next/image";
import 'remixicon/fonts/remixicon.css';

interface RidePopUpProps {
   setRidePopupPanel: (value: boolean) => void;
   setConfirmedRidePopupPanel: (value: boolean) => void;
}

const RidePopUp: React.FC<RidePopUpProps> = (props:any) => {
  return (
    <div  >
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-3xl p-5">
      {/* Close Button */}
      <h5 onClick={() => props.setRidePopupPanel(false)} 
        className='p-1 text-center absolute top-0 w-[93%]'
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
            <h4 className="text-lg font-semibold">Esther Berry</h4>
          </div>
        </div>
        <div className="text-right">
          <h4 className="text-lg font-bold">₹295.20</h4>
          <p className="text-gray-500 text-sm">2.2km</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Ride Details */}
      <div className="space-y-3">
        <div>
          <p className="text-gray-400 text-xs uppercase">Pick Up</p>
          <p className="text-lg font-medium">7958 Swift Village</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase">Drop Off</p>
          <p className="text-lg font-medium">105 William St, Chicago, US</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-5">
        <button 
          onClick={() => props.setRidePopupPanel(false)}
          className="text-gray-500 text-lg font-semibold"
        >
          Ignore
        </button>
        <button  
         onClick={() =>{
          props.setRidePopupPanel(false)
           props.setConfirmedRidePopupPanel(true)}
          } 
        className="bg-gray-900 text-white text-lg font-semibold py-2 px-6 rounded-lg">
          Accept
        </button>
      </div>
    </div>
    </div>
  );
};

export default RidePopUp;
