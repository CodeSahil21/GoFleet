import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking: React.FC = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    const handleError = (error: string) => {
        // Log error silently or send to a monitoring service
        console.debug(error);
    };

    useEffect(() => {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude,
                });
            },
            (error) => {
                handleError(`Error fetching location: ${error.message}`);
            }
        );

        // Watch for position updates
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude,
                });
            },
            (error) => {
                handleError(`Error watching location: ${error.message}`);
            }
        );

        // Cleanup the watcher on component unmount
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // console.log('Position updated:', latitude, longitude);
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude,
                    });
                },
                (error) => {
                    handleError(`Error updating position: ${error.message}`);
                }
            );
        };

        updatePosition(); // Initial position update

        const intervalId = setInterval(updatePosition, 1000); // Update every second

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;