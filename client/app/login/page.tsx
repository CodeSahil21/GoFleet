'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
const UserLoginPage:React.FC = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userDatas,setUserDatas] = useState<{ email: string; password: string }>({ email: '', password: '' });  


    const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setUserDatas({
            email:email,
            password:password
        })
        setEmail('');
        setPassword('');
    }
    useEffect(() => {
            console.log(userDatas);
        }, [userDatas]);
    return (
        <div>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                <Image
                        className="w-16 mb-10 "
                        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                        alt="Uber Logo"
                        width={800}
                        height={800}
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
                <p className='text-center mb-2'>New here?<Link className='text-blue-500' href='/signup'> Create new Account</Link></p>
                </form>
                </div>
                <div>
                <Link href='/captain-Login' className='flex items-center justify-center bg-[#10b461] text-white font-semibold mb-5 px-4 py-2 rounded  w-full text-lg placeholder:base'>
                    Sign in as Captain</Link>
                </div>
            </div>
        </div>
    );
};

export default UserLoginPage;
