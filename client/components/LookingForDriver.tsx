import React from 'react';
import Image from 'next/image';
import 'remixicon/fonts/remixicon.css';

interface LookingForDriverProps {
    setLookingForDriverPanel: (value: boolean) => void;
    pickup: string; // Pickup location
    destination: string; // Destination location
    fare: {
        auto: number;
        car: number;
        motorcycle: number;
    }; // Fare details
    vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO' | null;
}

const LookingForDriver: React.FC<LookingForDriverProps> = (props) => {
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
                return null; // Fallback image or empty string
        }
    };
 // Call the function to get the vehicle image
 const vehicleImage = getVehicleImage();
    return (
        <div>
            <h5
                onClick={() => {
                    props.setLookingForDriverPanel(false);
                }}
                className="p-1 text-center absolute top-0 w-[93%]"
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>
            <div className="flex gap-2 justify-between flex-col items-center">
            {vehicleImage && (
                    <Image
                        className="h-20 rounded-lg"
                        src={vehicleImage}
                        alt="Vehicle Image"
                        width={150}
                        height={800}
                    />
                )}
                <div className="w-full mt-5">
                    <div className="flex items-center gap-3 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="tex-lg font-medium">Pickup</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-5-fill"></i>
                        <div>
                            <h3 className="tex-lg font-medium">Destination</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3">
                        <i className="text-lg ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className="tex-lg font-medium">
                                Fare: ₹
                                {props.vehicleType === 'CAR'
                                    ? props.fare.car
                                    : props.vehicleType === 'MOTORCYCLE'
                                    ? props.fare.motorcycle
                                    : props.fare.auto}
                            </h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LookingForDriver;