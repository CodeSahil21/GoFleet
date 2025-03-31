'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {  useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
interface NewUser {
    email: string;
    password: string;
    firstname: string;
    lastname?: string;  

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
        email: email.trim(),
        password:password.trim(),
        firstname: firstname.trim(),
        lastname: lastname.trim() || undefined

    };
    
   try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/signup`, newUser);

        if(response.status == 201){
            const data = response.data;;
            setUser(data.user);
            localStorage.setItem('user', data.token);
            router.push('/home');
        }
        console.log(user);
        setEmail('');
        setPassword('');
        setFirstname('');
        setLastname('');
        router.push('/home'); 
      }catch(error){    
        if (axios.isAxiosError(error) && error.response) {
            console.error('Signup failed:', error.response.data);
        } else {
            console.error('Error signing up:', error);
        }
      }
    };

    return (
        <div>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                    <div className='mb-10'>
                    <Image
                    className="w-16 rounded-lg"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAjVBMVEX/zQkAAAD/0wn/0Qn/1An/zwmFawQvJQFzXQOJbwW4lQb9ywldSgOfgAUjHABoUwNHOAKRdAXUqgduWAPywwjarwdhTgPZrgfFnwa9mAbjtgghGgHrvQiBZwQZEwBOPwKnhgUqIQG1kQYdFwDOpQc5LgEMCAB6YQRVRAOXeQUzKQEJBgA4LQEuJAGVdwVJ7X0BAAAEFUlEQVR4nO3a61biShCG4djdBULYIILIUQWGQefg/V/ebAhJV4dEWTOzlGbe55dUQkx9pnPomCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPyzxJXIZ+/Rh5P7US8wmv5zIdjxVcm9/ex9+mjHGdyRARlcQgZi3pb3Z/OC+1LOYOryZf7kaNUmpObXSbjipyUpt4vGWxZP2a7ZSf/gdVDOYPuaL0vydu146zehrhsy979uu6vbVV5YtD8rBLsqd1TSc/v1TPed9fZu8zZk+OCrN745M/Llx13Z+EQb5uPb37Ptd9oa7DOQ6SkRXLWKNqweMU952UxUdb47PMx1xZc/2IkZmKeTMtj4o940VH2Y1SX96murfcsRZeAeT8rgyg99Sb/5ci9rz219qZOV4slAhqdF4I/60mgY78a+vVWVeZZWPBm8u1buWfVhWr7eTSURWfrC6rBiPBm4o+thnaG6DurR0HKJe/UfR8VZ8hwyOOXaGJzLusfWfqm+yAfH/r3Rl5YiqnPIQObtycHY787NOC+2d5d83cyLM0fU2eLaqY3r0XBj1Gm1XbR7DhkkYnPuv2J3Oq6o2lIvFQ/KYp6LxQ+pujMORoOKYOC7PYsMPKMzCJZY30pTKiZM9N3DF51RMBoKX9VJI4oMRMSqkVx5Q6vvIlvm/28UPTp1BBUm+uIRQQaSpmniF4R/5oLdFCts0h0pvt48imCge40hA/v8MOt+Lxas08q5Q9P3Lc5ms/WmSMrelyN4GOpNRJHBTdDAdfV+ljvt+tVcP1wUjIQoM5hUP+NLEj5aqwxEwtFQSjHCDIY10+hmUZdB6RhZlrYQRQYb3cGobjdLk4wP6nARp2MchFfdKDKQl4aa+lnV7aakfqVma9FXGZjwbnwc31hIjD6pzaWO6xUrrcWpbmQeRFC6LMSRQSL+UH62aR1Rf+1bfeI05dmXQXTXhSCD71f11DKdQcUk3CS2e6QggxOpDGzFXGwwGi4/A5GqechBZM8Lf5aB2qTWju3Z+Q8y0CNhqU4M6uH50jMQ/dWJ6/gPvfOaR/L+egbmRXdt9Y1CMRouPAN7p2pzSZw+OeSjIboMOpN2LdVgloGIetTYv3sxqpD/hugyaKip1hI9c55lYNTrhMd9e8GBsTqfd23K+xks6vdSVH/7DIJH5mk2OoLZxWw0XHIGkvzwhZfD5iSZ+eLobN47K381A/1K4of4f09RB8J+NFxwBsGLBfX8oFrOXj2fWQb2ad3MLPUdvXSWh3K3/0YG09lhreb6ThJ5zL/U7LZ0oMNvP4sF293x0ujmH1/PIIMav/ePuKn/KdiAVK5zRopZoZPKdV+W8FPdxvIlp20dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICY/QJBtD9XALSq7AAAAABJRU5ErkJggg=="
                    alt="Drive Logo"
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