import {Origin} from  '../models/origin-model';
import {Location} from  '../models/location-model';

export interface Card {    
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: Origin,
    location: Location,
    image: string,
    episode: string
}