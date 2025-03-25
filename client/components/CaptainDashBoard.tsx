import React from 'react'
import Image from 'next/image'
import 'remixicon/fonts/remixicon.css';

const CaptainDashBoard:React.FC = () => {
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
                   <h4 className="text-xl font-semibold">Ryan Gosling</h4>
                   <p className="text-gray-500 text-base -mt-1">Basic level</p>
                 </div>
               </div>
               <div>
                 <h4 className="text-xl font-bold">₹295.20</h4>
                 <p className="text-gray-500 text-base -mt-1">Earned</p>
               </div>
             </div>
             {/* Stats Section */}
             <div className="mt-8 bg-gray-600 py-6 px-7 rounded-lg flex justify-between text-center text-white ">
               <div>
                 <h4 className="text-xl">10.2</h4>
                 <p className="text-sm">HOURS ONLINE</p>
               </div>
               <div>
                 <h4 className="text-xl">30 KM</h4>
                 <p className="text-sm">TOTAL DISTANCE</p>
               </div>
               <div>
                 <h4 className="text-xl">20</h4>
                 <p className="text-sm">TOTAL JOBS</p>
               </div>
             </div>
           </div>
        </div>
    )
}

export default CaptainDashBoard;