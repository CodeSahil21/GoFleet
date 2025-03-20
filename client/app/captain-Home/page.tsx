import CaptainProtectWrapper from '@/components/CaptainProtectWrapper'
import React from 'react'




const CaptainHome = () => {
    return (
        <CaptainProtectWrapper>
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Captain Dashboard
                </h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-600">
                        Welcome to your captain dashboard. Here you can manage your rides and view your statistics.
                    </p>
                </div>
            </div>
        </div>
        </CaptainProtectWrapper>
    )
}

export default CaptainHome