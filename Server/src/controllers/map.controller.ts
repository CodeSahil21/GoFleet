import  { getAddressCoordinate,getDistanceTimeService,getAutoComplete} from '../services/map.service';
import { Request, Response, NextFunction } from 'express';
import { getCoordinatesSchema ,distanceTimeSchema,autoCompleteSchema} from '../utils/schema';

export const getCoordinates = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
 try{
     // Validate query parameters using Zod
     const validationResult = getCoordinatesSchema.safeParse(req.query);
     if (!validationResult.success) {
         // Return validation errors
         return res.status(400).json({ errors: validationResult.error.format() });
     }
    
     // Extract validated data
     const { address } = validationResult.data;
    const coordinates = await getAddressCoordinate(address as string);
    return res.status(200).json(coordinates);
 }catch(error){
     return res.status(404).json({msg:'Coordinates not found'});
 }
}

export const  getDistanceTime = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const validationResult = distanceTimeSchema.safeParse(req.query);
        if(!validationResult.success){
            return res.status(400).json({errors:validationResult.error.format()});
        }

        const {origin,destination} = validationResult.data;
        const distanceTime = await getDistanceTimeService(origin as string,destination as string);
        return res.status(200).json(distanceTime);
    }catch(error){
        return res.status(404).json({msg:'No Distance and time'});
    }
}

export const  getAutoCompleteSuggestionHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const validationResult =autoCompleteSchema.safeParse(req.query);
        if(!validationResult.success){
            return res.status(400).json({errors:validationResult.error.format()});
        }
        const { input } = validationResult.data;
        const suggestions = await getAutoComplete(input as string);
        return res.status(200).json(suggestions);
    }catch(error){
        return res.status(404).json({msg:'No suggestions found'});
    }
}