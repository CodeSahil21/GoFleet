import React from 'react'
import Image from 'next/image'
interface VehiclePanelProps {
    setVehiclePanelOpen: (value: boolean) => void
    setConfirmedRidePanel: (value: boolean) => void
    fare: {
        auto: number;
        car: number;
        motorcycle: number;
    };
    selectVehicle: (vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO') => void;
}

const VehiclePanel = (props: VehiclePanelProps) => {

    return (
        <div>
            <h5 onClick={()=>{
                    props.setVehiclePanelOpen(false)
                }
                 }
                 className='p-1 text-center absolute top-0 w-[93%] '><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
                    <h3 className='text-2xl font-semibold mb-5'>Choose a  Vehicle</h3>
                    <div onClick={()=>{
                        props.selectVehicle('CAR');
                       props.setConfirmedRidePanel(true);
                       props.setVehiclePanelOpen(false)
                    }
                }
                    className='flex border-2 active:border-black   mb-2 rounded-xl w-full p-3 items-center  justify-between'>
                        <Image
                             className="h-12 w-auto rounded-lg"
                            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
                            alt="Uber Car Logo"
                            width={800}
                            height={800}
                        />
                        <div className='ml-2 w-1/2'>
                        <h4 className='font-medium text-lg'>
                         GoFleetGo <span><i className="ri-user-3-fill">4</i></span>   
                        </h4>
                        <h5 className='font-medium text-xs'>2 min's away</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable,compact rides</p>
                        </div>
                        <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
                    </div>
                    <div onClick={()=>{
                        props.selectVehicle('MOTORCYCLE');
                        props.setConfirmedRidePanel(true);
                        props.setVehiclePanelOpen(false)
                    }
                }
                    className='flex border-2  active:border-black   mb-2 rounded-xl w-full p-3 items-center  justify-between'>
                        <Image
                             className="h-15 w-20 rounded-lg"
                            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
                            alt="Uber Bike Logo"
                            width={800}
                            height={800}
                        />
                        <div className='ml-2 w-1/2'>
                        <h4 className='font-medium text-lg'>
                         Moto <span><i className="ri-user-3-fill">1</i></span>   
                        </h4>
                        <h5 className='font-medium text-xs'>2 min's away</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable,motorcycle rides</p>
                        </div>
                        <h2 className='text-lg font-semibold'>₹{props.fare.motorcycle}</h2>
                    </div>
                    <div onClick={()=>{
                        props.selectVehicle('AUTO');
                        props.setConfirmedRidePanel(true);
                        props.setVehiclePanelOpen(false)
                    }
                }
                     className='flex border-2  active:border-black   mb-2 rounded-xl w-full p-3 items-center  justify-between'>
                        <Image
                             className="h-15 w-20 rounded-lg"
                            src="https://images.cnbctv18.com/uploads/2023/10/uber-auto.jpg?impolicy=website&width=400&height=225"
                            alt="Uber Auto Logo"
                            width={800}
                            height={800}
                        />
                        <div className='ml-2 w-1/2'>
                        <h4 className='font-medium text-lg'>
                         UberAuto <span><i className="ri-user-3-fill">3</i></span>   
                        </h4>
                        <h5 className='font-medium text-xs'>2 min's away</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable,Auto rides</p>
                        </div>
                        <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
                    </div>
        </div>
    )
}

export default VehiclePanel;