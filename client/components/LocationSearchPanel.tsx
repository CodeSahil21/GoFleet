import React from 'react';

interface Suggestion {
    description: string;
}

interface LocationSearchPanelProps {
    suggestions: Suggestion[];
    setVehiclePanelOpen: (value: boolean) => void;
    setPanelOpen: (value: boolean) => void;
    setPickup: (location: string) => void;
    setDestination: (location: string) => void;
    activeField: 'pickup' | 'destination';
}

const LocationSearchPanel: React.FC<LocationSearchPanelProps> = ({ 
    suggestions = [], // Add default value
    setVehiclePanelOpen, 
    setPanelOpen, 
    setPickup, 
    setDestination, 
    activeField 
}) => {
    const handleSuggestionClick = (suggestion: Suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.description);
        } else if (activeField === 'destination') {
            setDestination(suggestion.description);
        }
        // setVehiclePanelOpen(true);
        // setPanelOpen(false);
    };

    return (
        <div>
            {Array.isArray(suggestions) && suggestions.map((suggestion, idx) => (
                <div 
                    key={idx} 
                    onClick={() => handleSuggestionClick(suggestion)} 
                    className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer'
                >
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                        <i className='ri-map-pin-fill'></i>
                    </h2>
                    <h4 className='font-medium'>{suggestion.description}</h4>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;