'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
const CaptainLoginPage :React.FC = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [captainDatas,setCaptainDatas] = useState<{ email: string; password: string }>({ email: '', password: '' });  


    const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setCaptainDatas({
            email:email,
            password:password
        })
        setEmail('');
        setPassword('');
    }
    return (
        <div>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                <Image
                        className="w-20 mb-2 "
                        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
                        alt="Uber Logo"
                        width={900}
                        height={900}
                      />
                <form onSubmit={(e)=>{
                    submitHandler(e);
                }}>
                <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                <input 
                className='bg-[#eeeeee] mb-7 px-4 py-2 rounded border w-full text-lg placeholder:base'
                required
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }} 
                type="email" 
                placeholder="youremail@example.com"
                 />
                <h3 className='text-lg font-medium mb-2'>Enter your Password </h3>
                <input 
                className='bg-[#eeeeee]  mb-7 px-4 py-2 rounded border w-full text-lg placeholder:base'
                required 
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value);
                }} 
                type="Password"
                placeholder="password" 
                />
                <button  className='bg-[#111] text-white font-semibold mb-3 px-4 py-2 rounded  w-full text-lg placeholder:base'
                >Login</button>
                <p className='text-center mb-2'> wanna join Fleet?<Link className='text-blue-500' href='/captain-Signup'> Register as a Captain</Link></p>
                </form>
                </div>
                <div>
                <Link href='/login' className='flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-5 px-4 py-2 rounded  w-full text-lg placeholder:base'>
                    Sign in as User</Link>
                </div>
            </div>
        </div>
    );
};

export default CaptainLoginPage ;
