import React from 'react';
import Image from 'next/image';
interface User {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
}

interface Vehicle {
    id: number;
    color: string;
    plate: string;
    capacity: number;
    vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO';
}

interface Captain {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
    socketId?: string | null;
    status: 'ACTIVE' | 'INACTIVE';
    vehicle: Vehicle; // Include vehicle details
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
    captain?: Captain; // Include captain details
}
interface WaitingForDriverProps {
    setWaitingForDriverPanel: (value: boolean) => void;
    pickup: string; // Pickup location
    destination: string; // Destination location
    fare: {
        auto: number;
        car: number;
        motorcycle: number;
    }; // Fare details
    vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO' | null;
    ride:Ride | null
} 

const WaitingForDriver: React.FC<WaitingForDriverProps> = (props: any) => {
    // Determine the image based on vehicleType
    const getVehicleImage = () => {
        switch (props.vehicleType) {
            case 'CAR':
                return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png";
            case 'AUTO':
                return "https://images.cnbctv18.com/uploads/2023/10/uber-auto.jpg?impolicy=website&width=400&height=225";
            case 'MOTORCYCLE':
                return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png";
            default:
                return null; // Return null if no valid vehicleType
        }
    };

    // Call the function to get the vehicle image
    const vehicleImage = getVehicleImage();

    return (
        <div className="bg-white rounded-lg ">
        <h5
            onClick={() => {
                props.setWaitingForDriverPanel(false);
            }}
            className=" text-center absolute top-0 w-[93%] cursor-pointer"
        >
            <i className="text-3xl text-gray-400 hover:text-gray-600 transition-all ri-arrow-down-wide-line"></i>
        </h5>
        <div className="flex justify-between items-center border-b pb-4">
            {vehicleImage && (
                <Image
                    className="h-12 rounded-lg "
                    src={vehicleImage}
                    alt="Vehicle Image"
                    width={100}
                    height={800}
                />
            )}
            <div className="text-right">
                <h2 className="text-lg font-semibold text-gray-800">
                    {props.ride?.captain
                        ? `${props.ride.captain.firstname} ${props.ride.captain.lastname || ''}`
                        : 'Unknown Captain'}
                </h2>
                <h4 className="text-xl font-bold text-gray-900 -mt-1 -mb-1">
                    {props.ride?.captain?.vehicle?.plate || 'N/A'}
                </h4>
                <p className="text-sm text-gray-500">
                    Uber {props.ride?.captain?.vehicle?.vehicleType || 'N/A'}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                    OTP: <span className="text-gray-900 font-semibold">{props.ride?.otp || 'N/A'}</span>
                </p>
            </div>
        </div>
        <div className="flex gap-2 justify-between flex-col items-center">
            <div className="w-full mt-5">
                <div className="flex items-center gap-3 p-2 border-b">
                    <i className="text-lg text-blue-600 ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">Pickup</h3>
                        <p className="text-sm -mt-1 text-gray-500">{props.ride?.pickup || 'N/A'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-2 border-b">
                    <i className="text-lg text-red-500 ri-map-pin-5-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">Drop-off</h3>
                        <p className="text-sm -mt-1 text-gray-500">{props.ride?.destination || 'N/A'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3">
                    <i className="text-lg text-green-600 ri-money-rupee-circle-fill"></i>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Fare: ₹
                            {props.vehicleType === 'CAR'
                                ? props.fare.car
                                : props.vehicleType === 'MOTORCYCLE'
                                ? props.fare.motorcycle
                                : props.fare.auto}
                        </h3>
                        <p className="text-sm -mt-1 text-gray-500">Cash Payment</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default WaitingForDriver;