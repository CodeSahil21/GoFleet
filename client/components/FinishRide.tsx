import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FinishRideProps {
  setFinishRidePanel: (value: boolean) => void;
}

const FinishRide: React.FC<FinishRideProps> = (props: any) => {
  return (
    <div className="h-screen w-screen fixed bottom-0 left-0 flex items-end bg-black bg-opacity-30">
      <div className="w-full bg-white shadow-2xl rounded-t-3xl p-6 transition-all duration-300">
      <div>
        <h5 onClick={() => props.setFinishRidePanel(false)}
            className='p-1 text-center absolute top-0 w-[93%] '><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
        </div>
        {/* Ride Completed Message */}
        <div className="text-center mt-2">
          <h4 className="text-xl font-semibold text-gray-800">Ride Completed!</h4>
        </div>

        {/* Rider Info */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <Image
              className="h-14 w-14 rounded-full border-2 border-gray-300 shadow-sm"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Rider Profile"
              width={56}
              height={56}
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Harshi Patel</h4>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-xl font-bold text-gray-900">₹193.20</h4>
            <p className="text-gray-500 text-sm">📍 2.2 KM</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-200" />

        {/* Ride Details */}
        <div className="space-y-4 px-2">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Pick Up</p>
            <p className="text-lg font-medium text-gray-900">7958 Swift Village</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Drop Off</p>
            <p className="text-lg font-medium text-gray-900">562/11-A, Kankariya Talab, Bhopal</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Fare</p>
            <p className="text-lg font-medium text-gray-900">₹193.20</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {/* <button
            onClick={() => props.setFinishRidePanel(false)}
            className="bg-gray-600 text-white text-lg font-semibold py-3 px-4 rounded-lg w-1/2 mr-2 shadow-md transition hover:bg-gray-700"
          >
            Close
          </button> */}
          <Link 
            href="/captainDashboard"
            className="bg-green-600 w-full text-white text-lg flex justify-center font-semibold py-3 px-4 rounded-lg  ml-2 shadow-md transition hover:bg-green-700"
          >
            Done
          </Link>
        </div>   
        <p className="text-sm text-gray-500 text-center mt-2">Click on finish button when ride is completed</p>
      </div>
    </div>
  );
};

export default FinishRide;
