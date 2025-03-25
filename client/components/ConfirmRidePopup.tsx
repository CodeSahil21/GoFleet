"use client";
import React from 'react';
import Image from 'next/image';
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';
import { useState } from 'react';
interface ConfirmRidePopupProps {
    setConfirmedRidePopupPanel: (value: boolean) => void;
}

const ConfirmRidePopup: React.FC<ConfirmRidePopupProps> = (props:any) => {
  const [otp,setOtp] = useState<string>("");
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
      <div className="h-screen w-screen fixed bottom-0 left-0 flex items-end bg-black bg-opacity-30">
      <div className="w-full bg-white shadow-2xl rounded-t-3xl p-6 transition-all duration-300">
        
          {/* Ride Notification */}
          <div className="text-center mt-2">
              <h4 className="text-xl font-semibold text-gray-800">Confirm your Ride!</h4>
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

          {/* Ride Description */}
          <div className="mb-4 px-2">
              <h5 className="text-gray-500 text-xs uppercase tracking-wider">📝 Description</h5>
              <p className="text-sm text-gray-700 leading-relaxed">
                  This ride is scheduled for immediate pickup. Please confirm the ride to proceed or cancel if unavailable.
              </p>
          </div>

          {/* Ride Details */}
          <div className="space-y-4 px-2">
              <div className="flex items-start">
                  <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Pick Up</p>
                      <p className="text-lg font-medium text-gray-900">562/11-A, Kankariya Talab, Bhopal</p>
                  </div>
              </div>
              <div className="flex items-start">
                  <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Drop Off</p>
                      <p className="text-lg font-medium text-gray-900">562/11-A, Kankariya Talab, Bhopal</p>
                  </div>
              </div>
          </div>
        {/* OTP Section */}
             <form onSubmit={(e)=>{
                submitHandler(e);
             }}
              className="mt-4">
                  <label className="text-gray-500 text-sm">Enter OTP</label>
                  <input 
                  onChange={(e)=>{
                    setOtp(e.target.value);}
                  }
                    type="required"
                    value={otp} 
                    className="border rounded-lg w-full p-2 text-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-500" 
                    placeholder="Enter OTP" 
                    />
                  {/* Buttons */}
          <div className="flex justify-between mt-6">
              <button 
                  onClick={() => props.setConfirmedRidePopupPanel(false)}
                  className="bg-red-600 text-white text-lg font-semibold py-3 px-4 rounded-lg w-1/2 mr-2 shadow-md transition hover:bg-gray-300"
              >
                   Cancel
              </button>
              <Link href="/captainRiding"  
                  className="bg-green-600 text-white text-lg  flex justify-center font-semibold py-3 px-4 rounded-lg w-1/2 ml-2 shadow-md transition hover:bg-green-700"
              >
                   Confirm
              </Link>
          </div>   
            </form>
      </div>
  </div>
    );
};

export default ConfirmRidePopup;