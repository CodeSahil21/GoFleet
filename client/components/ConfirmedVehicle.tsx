import React from 'react'
import  Image from 'next/image'
import 'remixicon/fonts/remixicon.css'
interface ConfirmedRideProps {
    setLookingForDriverPanel: (value: boolean) => void
    setConfirmedRidePanel: (value: boolean) => void
}

const ConfirmedRide: React.FC<ConfirmedRideProps> = (props:any) => {
    return (
        <div>
            <h5 onClick={()=>{
                    props.setConfirmedRidePanel(false);
                }
                 }
                className='p-1 text-center absolute top-0 w-[93%] '><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3> 
            <div className='flex gap-2 justify-between flex-col items-center'>
                <Image
                 className="h-20  rounded-lg"
                 src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
                 alt="Uber Car Logo"
                 width={150}
                 height={800}
                />
                <div className='w-full mt-5'>
                    <div className='flex  items-center gap-3 p-3  border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='tex-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>kankariya talav ,Bhopal</p>
                    </div>
                    </div>
                    <div className='flex  items-center gap-3 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-5-fill"></i>
                    <div>
                        <h3 className='tex-lg font-medium'>576/29-C</h3>
                        <p className='text-sm -mt-1 text-gray-600'>charasta road,jalalpur</p>
                    </div>
                    </div>
                    <div className='flex  items-center gap-3 p-3 '>
                    <i className="text-lg ri-money-rupee-circle-fill"></i>
                    <div>
                        <h3 className='tex-lg font-medium'>₹192.63</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                    </div>
                    
                </div>
                <button  onClick={()=>{
                    props.setLookingForDriverPanel(true);
                    props.setConfirmedRidePanel(false);
                }
            }
                className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
                   Confirm 
                </button>
            </div>   
        </div>
    )
}

export default ConfirmedRide;