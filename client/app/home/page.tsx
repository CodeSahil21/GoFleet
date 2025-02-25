import UserProtectWrapper from '@/component/UserProtectWrapper';
import React from 'react';

const HomePage: React.FC = () => {
    return (
        <UserProtectWrapper>
        <div className="p-7 h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
            <p className="text-lg mt-4">You are successfully logged in!</p>
        </div>
    </UserProtectWrapper>
    );
};

export default HomePage;