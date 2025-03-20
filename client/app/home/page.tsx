'use client';
import UserProtectWrapper from '@/components/UserProtectWrapper';
import LocationSearchPanel from '@/components/LocationSearchPanel';
import React, { useRef } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';
import VehiclePanel from '@/components/VehiclePanel';
import ConfirmedRide from '@/components/ConfirmedVehicle';
import LookingForDriver from '@/components/LookingForDriver';
import WaitingForDriver from '@/components/WaitingForDriver';


const HomePage: React.FC = () => {
    const [pickup, setPickup] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [panelOpen, setPanelOpen] = useState<boolean>(false);
    const vehiclePanelRef = useRef<HTMLDivElement>(null);
    const confirmedRidePanelRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const panelCloseRef = useRef<HTMLHeadingElement>(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState<boolean>(false);
    const [ConfirmedRidePanel,setConfirmedRidePanel] = useState<boolean>(false);
    const [LookingForDriverPanel,setLookingForDriverPanel] = useState<boolean>(false);
    const LookingForDriverRef = useRef<HTMLDivElement>(null);
    const [WaitingForDriverPanel,setWaitingForDriverPanel] = useState<boolean>(false);
    const WaitingForDriverRef = useRef<HTMLDivElement>(null);
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: '24',
                 opacity: 1,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 1,
            });
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            });
        }
    }, [panelOpen]);

    useGSAP(() => {
        if(vehiclePanelOpen){
            gsap.to(vehiclePanelRef.current, {
                transform:'translateY(0)',
             });
        }else{
            gsap.to(vehiclePanelRef.current, {
                transform:'translateY(100%)',
             });
        }
       
    },[vehiclePanelOpen]);

    useGSAP(() => {
        if(ConfirmedRidePanel){
            gsap.to(confirmedRidePanelRef.current, {
                transform:'translateY(0)',
             });
        }else{
            gsap.to(confirmedRidePanelRef.current, {
                transform:'translateY(100%)',
             });
        }
       
    },[ConfirmedRidePanel]);

    useGSAP(() => {
        if(LookingForDriverPanel){
            gsap.to(LookingForDriverRef.current, {
                transform:'translateY(0)',
             });
        }else{
            gsap.to(LookingForDriverRef.current, {
                transform:'translateY(100%)',
             });
        }
       
    },[LookingForDriverPanel]);

    useGSAP(() => {
        if(WaitingForDriverPanel){
            gsap.to(WaitingForDriverRef.current, {
                transform:'translateY(0)',
             });
        }else{
            gsap.to(WaitingForDriverRef.current, {
                transform:'translateY(100%)',
             });
        }
       
    },[WaitingForDriverPanel]);

    return (
        <UserProtectWrapper>
            <div className='h-screen relative overflow-hidden'>
                <Image
                    className="w-16 absolute left-5 top-5"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber Logo"
                    width={800}
                    height={800}
                />
                <div 
                className="h-screen w-screen">
                    <Image
                        className="h-full w-full object-cover"
                        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                        alt="Uber Map Image"
                        width={800}
                        height={800}
                    />
                </div>
                <div className="flex flex-col justify-end h-screen absolute top-0 w-full overflow-hidden">
                    <div className="h-[30%] p-6 bg-white rounded-lg relative">
                        <h5
                            ref={panelCloseRef}
                            onClick={() => {
                                setPanelOpen(false);
                            }}
                            className='absolute opacity-0 right-6 top-6 text-2xl'
                        >
                            <i className="ri-arrow-down-wide-line"></i>
                        </h5>
                        <h4 className="text-2xl font-semibold">
                            Find a trip
                        </h4>
                        <form onSubmit={submitHandler}>
                            <div className="line absolute h-16 w-1 top-[45%] left-8 bg-gray-700 rounded-full"></div>
                            <input
                                className="bg-[#eeeeee] text-base mt-4 px-12 py-2 rounded-lg w-full"
                                required
                                onClick={() => {
                                    setPanelOpen(true);
                                }}
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                type="text"
                                placeholder="Add a pickup location"
                            />
                            <input
                                className="bg-[#eeeeee] w-full text-base mt-3 px-12 py-2 rounded-lg"
                                required
                                onClick={() => {
                                    setPanelOpen(true);
                                }}
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                type="text"
                                placeholder="Enter your destination"
                            />
                        </form>
                    </div>
                    <div ref={panelRef} className="bg-white h-0 opacity-0 overflow-hidden">
                        <LocationSearchPanel  setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
                    </div>
                </div>
                 <div ref={vehiclePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
                 <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
                </div>
                <div ref={confirmedRidePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12'>
                   <ConfirmedRide  setConfirmedRidePanel={setConfirmedRidePanel} setLookingForDriverPanel={setLookingForDriverPanel}/>
                </div>
                <div ref={LookingForDriverRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12'>
                   <LookingForDriver setLookingForDriverPanel={setLookingForDriverPanel}/>
                </div>
                <div ref={WaitingForDriverRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12'>
                   <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel}/>
                </div>
            </div>
        </UserProtectWrapper>
    );
};
//
export default HomePage;