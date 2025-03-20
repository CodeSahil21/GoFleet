import React from "react";

const LocationSearchPanel = (props: { setVehiclePanelOpen: (arg0: boolean) => void; setPanelOpen: (arg0: boolean) => void; }) => {
    const locations = [
        "18B, Park Street, Howrah Bridge, Kolkata",
        "19C  Salt Lake Sector V, Kolkata",
        "16D  New Town Action Area II, Kolkata",
        "25D  Gariahat Road, South Kolkata",
        "12K  Eco Park, New Town, Kolkata",
    ];
    return (
        <div>
            {/* This is just a sample data */}
            {locations.map((element, index) => {
                return (
                    <div onClick={()=>{
                        props.setVehiclePanelOpen(true);
                        props.setPanelOpen(false)
                    }}
                        key={index} // Add a unique key prop here
                        className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
                    >
                        <h2 className="bg-[#eeee] h-8 flex items-center justify-center w-12 rounded-full">
                            <i className="ri-map-pin-line"></i>
                        </h2>
                        <h4 className="font-medium">{element}</h4>
                    </div>
                );
            })}
        </div>
    );
};

export default LocationSearchPanel;