import React from 'react';
import Image from 'next/image';
interface WaitingForDriverProps {
    setWaitingForDriverPanel: (value: boolean) => void,
}
const WaitingForDriver: React.FC<WaitingForDriverProps> = (props:any) => {
    return (
        <div>
                            <h5 onClick={()=>{
                              props.setWaitingForDriverPanel(false);
                            }
                        }
                                className='p-1 text-center absolute top-0 w-[93%] '><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
                                <div className='flex  justify-between  items-center'>
                                <Image
                                 className="h-12  rounded-lg"
                                 src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
                                 alt="Uber Car Logo"
                                 width={100}
                                 height={800}
                                /> 
                                <div className='text-right'>
                                    <h2 className='text-lg font-medium'>Sahil</h2>
                                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04-AB03</h4>
                                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                                </div>
                                </div>
                            <div className='flex gap-2 justify-between flex-col items-center'>
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
                            </div>   
                        </div>
    );
};

export default WaitingForDriver;