'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
interface User {
    email: string;
    password: string;
}
const UserLoginPage:React.FC = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {user,setUser} = useUser();
    const router = useRouter();
   

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const signinuser: User = {
            email:email,
            password:password
        };
        try{
              const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/signin`,signinuser);
              if(response.status == 200){
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('user', data.token);
                router.push('/home');
              }
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                console.error('Login failed:', error.response.data);
            } else {
                console.error('Error logging in:', error);
            }
        }
        setEmail('');
        setPassword('');
    }
 
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
