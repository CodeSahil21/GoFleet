'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCaptain } from '@/context/CaptainContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const CaptainLoginPage :React.FC = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {captain,setCaptain} = useCaptain();
    const router = useRouter();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault();
          const loginData = {
            email:email.trim(),
            password:password.trim()
          }
         try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/captains/signin`,loginData);
            if(response.status == 200){
                const {token,captain} =response.data;
                setCaptain(captain);
                localStorage.setItem('captain', token);
                router.push('/captain-Home');
            }
         }catch(e){
                if(axios.isAxiosError(e) && e.response){
                    console.error('Login failed:', e.response.data);
                }else{
                    console.error('Error logging in:', e);
                }
         }
    };

    return (
        <div>
            <div className='py-5 px-5  h-screen flex flex-col justify-between'>
                <div>
                <Image
                   className="w-16 mb-2 rounded-lg"
                   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAjVBMVEX/zQkAAAD/0wn/0Qn/1An/zwmFawQvJQFzXQOJbwW4lQb9ywldSgOfgAUjHABoUwNHOAKRdAXUqgduWAPywwjarwdhTgPZrgfFnwa9mAbjtgghGgHrvQiBZwQZEwBOPwKnhgUqIQG1kQYdFwDOpQc5LgEMCAB6YQRVRAOXeQUzKQEJBgA4LQEuJAGVdwVJ7X0BAAAEFUlEQVR4nO3a61biShCG4djdBULYIILIUQWGQefg/V/ebAhJV4dEWTOzlGbe55dUQkx9pnPomCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPyzxJXIZ+/Rh5P7US8wmv5zIdjxVcm9/ex9+mjHGdyRARlcQgZi3pb3Z/OC+1LOYOryZf7kaNUmpObXSbjipyUpt4vGWxZP2a7ZSf/gdVDOYPuaL0vydu146zehrhsy979uu6vbVV5YtD8rBLsqd1TSc/v1TPed9fZu8zZk+OCrN745M/Llx13Z+EQb5uPb37Ptd9oa7DOQ6SkRXLWKNqweMU952UxUdb47PMx1xZc/2IkZmKeTMtj4o940VH2Y1SX96murfcsRZeAeT8rgyg99Sb/5ci9rz219qZOV4slAhqdF4I/60mgY78a+vVWVeZZWPBm8u1buWfVhWr7eTSURWfrC6rBiPBm4o+thnaG6DurR0HKJe/UfR8VZ8hwyOOXaGJzLusfWfqm+yAfH/r3Rl5YiqnPIQObtycHY787NOC+2d5d83cyLM0fU2eLaqY3r0XBj1Gm1XbR7DhkkYnPuv2J3Oq6o2lIvFQ/KYp6LxQ+pujMORoOKYOC7PYsMPKMzCJZY30pTKiZM9N3DF51RMBoKX9VJI4oMRMSqkVx5Q6vvIlvm/28UPTp1BBUm+uIRQQaSpmniF4R/5oLdFCts0h0pvt48imCge40hA/v8MOt+Lxas08q5Q9P3Lc5ms/WmSMrelyN4GOpNRJHBTdDAdfV+ljvt+tVcP1wUjIQoM5hUP+NLEj5aqwxEwtFQSjHCDIY10+hmUZdB6RhZlrYQRQYb3cGobjdLk4wP6nARp2MchFfdKDKQl4aa+lnV7aakfqVma9FXGZjwbnwc31hIjD6pzaWO6xUrrcWpbmQeRFC6LMSRQSL+UH62aR1Rf+1bfeI05dmXQXTXhSCD71f11DKdQcUk3CS2e6QggxOpDGzFXGwwGi4/A5GqechBZM8Lf5aB2qTWju3Z+Q8y0CNhqU4M6uH50jMQ/dWJ6/gPvfOaR/L+egbmRXdt9Y1CMRouPAN7p2pzSZw+OeSjIboMOpN2LdVgloGIetTYv3sxqpD/hugyaKip1hI9c55lYNTrhMd9e8GBsTqfd23K+xks6vdSVH/7DIJH5mk2OoLZxWw0XHIGkvzwhZfD5iSZ+eLobN47K381A/1K4of4f09RB8J+NFxwBsGLBfX8oFrOXj2fWQb2ad3MLPUdvXSWh3K3/0YG09lhreb6ThJ5zL/U7LZ0oMNvP4sF293x0ujmH1/PIIMav/ePuKn/KdiAVK5zRopZoZPKdV+W8FPdxvIlp20dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICY/QJBtD9XALSq7AAAAABJRU5ErkJggg=="
                   alt="Drive Logo"
                   width={800}
                   height={800}
                                 />
                <form onSubmit={(e)=>{
                    submitHandler(e);
                }}>
                <h3 className=' w-full text-lg font-medium mb-2'>What's our Captain email</h3>
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
                <h3 className='text-lg font-medium mb-2'>Enter your Password Captain</h3>
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
