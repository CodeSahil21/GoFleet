import React from 'react';

const VehiclePanelSkeleton = () => {
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%]'>
                <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            {[1, 2, 3].map((_, index) => (
                <div
                    key={index}
                    className='flex border-2 mb-2 rounded-xl w-full p-3 items-center justify-between animate-pulse'
                >
                    <div className='h-12 w-20 bg-gray-300 rounded-lg'></div>
                    <div className='ml-2 w-1/2'>
                        <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
                        <div className='h-3 bg-gray-300 rounded w-1/2 mb-1'></div>
                        <div className='h-3 bg-gray-300 rounded w-2/3'></div>
                    </div>
                    <div className='h-6 bg-gray-300 rounded w-12'></div>
                </div>
            ))}
        </div>
    );
};

export default VehiclePanelSkeleton;