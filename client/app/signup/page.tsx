'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {  useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import axios from 'axios';
interface NewUser {
    email: string;
    fullname: {
        firstname: string;
        lastname?: string;  
    }
}
const UserSignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const { user, setUser } = useUser();
    const router = useRouter();
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
    const newUser: NewUser = {
        email: email,
        fullname: {
            firstname: firstname,
            lastname: lastname || undefined
        }
    };
    
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/signup`, newUser);
        setUser(response.data);
        setEmail('');
        setPassword('');
        setFirstname('');
        setLastname('');
        router.push('/home'); 
      } catch (error) {
        console.error('Error signing up:', error);
      }
    };

    return (
        <div>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                    <div className='mb-10'>
                        <Image
                            className="w-16"
                            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                            alt="Uber Logo"
                            width={800}
                            height={800}
                        />
                    </div>
                    <form onSubmit={submitHandler}>
                        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
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
                        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                        <input
                            className='bg-[#eeeeee] mb-6 px-4 py-2 rounded border w-full text-lg placeholder:base'
                            required
                            type="email"
                            placeholder="youremail@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <h3 className='text-lg font-medium mb-2'>Enter your Password</h3>
                        <input
                            className='bg-[#eeeeee] mb-6 px-4 py-2 rounded border w-full text-lg placeholder:base'
                            required
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='bg-[#111] text-white font-semibold mb-3 px-4 py-2 rounded w-full text-lg placeholder:base'>
                            Sign Up
                        </button>
                        <p className='text-center mb-2'>
                            Already have an account? <Link className='text-blue-500' href='/login'>Log in</Link>
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

export default UserSignupPage;