import axios from 'axios';
import  prisma from '../db';

interface Coordinates{
    lat:number;
    lng:number;
}
 
interface GeocodingResponse {
    results: {
    address_components: {
    long_name: string;
    short_name: string;
    types: string[];
    }[];
    formatted_address: string;
    geometry: {
    location: {
    lat: number;
    lng: number;
    };
    location_type: string;
    viewport: {
    northeast: {
    lat: number;
    lng: number;
    };
    southwest: {
    lat: number;
    lng: number;
    };
    };
    };
    place_id: string;
    types: string[];
    }[];
    status: string;
    error_message?: string;
   }
  
   interface DistanceTimeResposne{
    distance: { text: string; value: number };
    duration: { text: string; value: number };
   }

   interface DistanceMatrixResponse {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: {
      elements: {
        distance: {
          text: string;
          value: number;
        };
        duration: {
          text: string;
          value: number;
        };
        status: string;
      }[];
    }[];
    status: string;
  }
  interface AutoCompleteResponse {
    predictions: {
        description: string; // Full description of the place
        place_id: string; // Unique identifier for the place
        terms: { value: string }[]; // Array of terms in the description
        types: string[]; // Types of the place (e.g., locality, political)
        matched_substrings: {
            length: number; // Length of the matched substring
            offset: number; // Offset of the matched substring
        }[]; // Array of matched substrings
        structured_formatting: {
            main_text: string; // Main text of the place (e.g., "New York")
            main_text_matched_substrings: {
                length: number; // Length of the matched substring in the main text
                offset: number; // Offset of the matched substring in the main text
            }[]; // Array of matched substrings in the main text
            secondary_text: string; // Secondary text of the place (e.g., "NY, USA")
        };
    }[];
    status: string; // Status of the API response (e.g., "OK", "ZERO_RESULTS")
    error_message?: string; // Error message if the API request fails
}
export const  getAddressCoordinate = async (address:string):Promise<Coordinates>=>{
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if(!apiKey){
         throw new Error('Google maps api key not found');
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try{
        const response = await axios.get<GeocodingResponse>(url);
        if (response.data.status === 'REQUEST_DENIED') {
            throw new Error(`Google Maps API error: ${response.data.error_message}`);
        }

        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('No results found for the given address');
        }

        if (response.data.status !== 'OK') {
            throw new Error(`Google Maps API error: ${response.data.status}`);
        }

        console.log('Google Maps API Response:', response.data);
        if(response.data.status ===  'OK'){
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            }   
        }else{
          throw new Error('Could not find the location');
        }
    }catch(e){
        console.error('Error during fetching location:',e);
        throw Error;
    }
}


export const getDistanceTimeService = async (origin:string,destination:string):Promise<DistanceTimeResposne>=>{
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if(!apiKey){
         throw new Error('Google maps api key not found');
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

   try{
    const response = await axios.get<DistanceMatrixResponse>(url);
    // console.log('Google Maps Distance Matrix API Response:', response.data);
    if(response.data.status === 'OK'){
        const element = response.data.rows[0].elements[0];
        if (element.status === 'ZERO_RESULTS') {
            throw new Error('No routes found');
        }
        return response.data.rows[ 0 ].elements[ 0 ];
    }else {
        throw new Error('Unable to fetch distance and time');
    }
   }catch(e){
         console.error('Error during fetching distance and time:',e);
         throw Error;
   }
}

export const getAutoComplete = async (input:string):Promise<AutoCompleteResponse['predictions']>=>{
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get<AutoCompleteResponse>(url);
        // console.log('Google Places API Response:', response.data);
        if (response.data.status === 'OK') {
            return response.data.predictions; 
        } {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.log('Error during fetching autocomplete suggestions:', err);
        console.error(err);
        throw err;
    }
}

export const getCaptainsInRadius = async (ltd: number, lng: number, radius: number) => {
    // Radius in kilometers
    try {
        const captains = await prisma.captain.findMany({
            where: {
                location: {
                    AND: [
                        {
                            ltd: {
                                gte: ltd - radius / 111, // Approximation for latitude
                                lte: ltd + radius / 111,
                            },
                        },
                        {
                            lng: {
                                gte: lng - radius / (111 * Math.cos((ltd * Math.PI) / 180)), // Approximation for longitude
                                lte: lng + radius / (111 * Math.cos((ltd * Math.PI) / 180)),
                            },
                        },
                    ],
                },
            },
            include: {
                location: true, // Include location details in the result
                vehicle: true,  // Include vehicle details if needed
            },
        });

        return captains;
    } catch (error) {
        console.error('Error fetching captains in radius:', error);
        throw new Error('Unable to fetch captains in the specified radius');
    }
};