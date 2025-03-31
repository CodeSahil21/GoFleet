import React ,{useContext}from 'react'
import Image from 'next/image'
import 'remixicon/fonts/remixicon.css';
import { useCaptain } from '@/context/CaptainContext';

const CaptainDashBoard:React.FC = () => {
  const {captain} = useCaptain();
    // Calculate total jobs (completed rides)
    const totalJobs = captain?.rides.filter((ride) => ride.status === 'COMPLETED').length || 0;

    // Calculate total earnings from completed rides
  const totalEarnings = captain?.rides
  .filter((ride) => ride.status === 'COMPLETED') // Filter completed rides
  .reduce((sum, ride) => sum + (ride.fare || 0), 0) || 0; // Sum up the fares

  // Calculate total hours online from ride durations
  const totalHoursOnline = captain?.rides
    .filter((ride) => ride.duration) // Filter rides with valid durations
    .reduce((sum, ride) => sum + (ride.duration || 0), 0) / 60 || 0; // Sum durations and convert to hours

    // Calculate total distance from rides
  const totalDistance = captain?.rides
  .filter((ride) => ride.distance) // Filter rides with valid distances
  .reduce((sum, ride) => sum + (ride.distance || 0), 0) || 0; // Sum distances
    return (
       <div>
           <div className="py-6 px-4 rounded-lg">
             {/* Driver Info */}
             <div className="flex justify-between items-center  ">
               <div className="flex items-center gap-4">
                 <Image
                   className="h-16 w-16 rounded-full"
                   src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
                   alt="Driver Profile"
                   width={100}
                   height={64}
                 />
                 <div>
                   <h4 className="text-xl font-semibold">{captain?.firstname} {captain?.lastname}</h4>
                   <p className="text-gray-500 text-base -mt-1">Basic level</p>
                 </div>
               </div>
               <div>
                 <h4 className="text-xl font-bold">₹{totalEarnings.toFixed(0)}</h4>
                 <p className="text-gray-500 text-base -mt-1">Earned</p>
               </div>
             </div>
             {/* Stats Section */}
             <div className="mt-8 bg-gray-600 py-6 px-7 rounded-lg flex justify-between text-center text-white ">
               <div>
                 <h4 className="text-xl">{totalHoursOnline.toFixed(0)}</h4>
                 <p className="text-sm">Total Hours Drived</p>
               </div>
               <div>
                 <h4 className="text-xl">{totalDistance.toFixed(0)} KM</h4>
                 <p className="text-sm">TOTAL DISTANCE</p>
               </div>
               <div>
                 <h4 className="text-xl">{totalJobs}</h4>
                 <p className="text-sm">TOTAL JOBS</p>
               </div>
             </div>
           </div>
        </div>
    )
}

export default CaptainDashBoard;