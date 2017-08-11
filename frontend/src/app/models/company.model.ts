import { Review } from "./review.model";
import { Vendor } from "./vendor";

export interface Company {
    avatar:string;
    name: string;
    description: string;
    foundationDate: Date;    
    location: string;
    reviews: Review[];
    rating: number;
    vendors: Vendor[];
    director: string;
    features: string[];
}