'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCaptain } from '@/context/CaptainContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const CaptainSignup: React.FC = () => {
    const router = useRouter();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [firstname, setFirstname] = useState('');
     const [lastname, setLastname] = useState('');
     const [vehicleColor,setVehicleColor] = useState('');
     const [vehiclePlate,setVehiclePlate] = useState('');
     const [vehicleCapacity,setVehicleCapacity] = useState('');
     const [vehicleType  ,setVehicleType] = useState('');
     const {captain ,setCaptain} = useCaptain();
     
         const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
             e.preventDefault();    
         const captainData = {
            firstname: firstname.trim(),
            lastname: lastname.trim() || undefined,
            email: email.trim(),
            password: password.trim(),
            vehicle: {
                color: vehicleColor.trim(),
                plate: vehiclePlate.trim(),
                capacity: parseInt(vehicleCapacity),
                vehicleType: vehicleType as "CAR" | "MOTORCYCLE" | "AUTO",
            },
         };

           try{  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/captains/signup`, captainData);
             if(response.status == 201){
              setCaptain(response.data.captain);
              localStorage.setItem('captain', response.data.token);
                router.push('/captain-Home');
            }
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                console.error('Signup failed:', error.response.data);
            } else {
                console.error('Error signing up:', error);
            }
        }
             
    setEmail('');
    setFirstname('');
    setLastname('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
         };
    
    return (
        <div>
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
                <div className='mb-2'>
                   <Image
                    className="w-20 mb-2 "
                    src="https://www.svgrepo.com/show/505031/uber-driver.svg"
                    alt="Uber Logo"
                    width={900}
                    height={900}
                    />
                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2'>What's our Captain name</h3>
                    <div className='flex gap-2 mb-6'>
                        <input
                            className='bg-[#eeeeee] w-1/2 px-4 py-2 rounded border text-lg placeholder:base'
                            required
                            type="text"
                            placeholder="First name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input
                            className='bg-[#eeeeee] w-1/2 px-4 py-2 rounded border text-lg placeholder:base'
                            type="text"
                            placeholder="Last name (optional)"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>What's our Captain email</h3>
                    <input
                        className='bg-[#eeeeee] mb-6 px-4 py-2 rounded border w-full text-lg placeholder:base'
                        required
                        type="email"
                        placeholder="youremail@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter your Password Captain</h3>
                    <input
                        className='bg-[#eeeeee] mb-6 px-4 py-2 rounded border w-full text-lg placeholder:base'
                        required
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
                    <div className='flex gap-2 mb-6'>
                        <input
                            className='bg-[#eeeeee] w-1/2 px-4 py-2 rounded border text-lg placeholder:base'
                            required
                            type="text"
                            placeholder="Vehicle Color"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                        />
                        <input
                            className='bg-[#eeeeee] w-1/2 px-4 py-2 rounded border text-lg placeholder:base'
                            required
                            type="text"
                            placeholder="Vehicle Plate"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-2 mb-6'>
                        <input
                            className='bg-[#eeeeee] w-1/2 px-4 py-2 rounded border text-lg placeholder:base'
                            required
                            type="number"
                            placeholder="Vehicle Capacity"
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                        />
                        <select
                            className='bg-[#eeeeee] w-1/2 px-4 py-2 rounded border text-lg'
                            required
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="CAR">Car</option>
                            <option value="MOTORCYCLE">Motorcycle</option>
                            <option value="AUTO">Auto</option>
                        </select>
                    </div>
                    <button className='bg-[#111] text-white font-semibold mb-3 px-4 py-2 rounded w-full text-lg placeholder:base'>
                        Sign Up
                    </button>
                    <p className='text-center mb-2'>
                        Already have an account? <Link className='text-blue-500' href='/captain-Login'>Log in</Link>
                    </p>
                </form>
            </div>
            <div>
                <p className='text-center text-xs leading-tight'>
                    By signing up, you agree to our Privacy Policy and Terms of Service.
                </p>
            </div>
        </div>
    </div>
    );
};

export default CaptainSignup;