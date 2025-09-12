import mongoose, { Document, Schema, Model } from "mongoose";

// 1. Define the TypeScript interface
export interface IHostel extends Document {
    // Old fields
    name: string;
    location: string;
    locationLink?: string;
    totalRemainingBeds?: number;
    hostelPrice?: number;
    nearby1?: string;
    nearby1distance?: string;
    nearby2?: string;
    nearby2distance?: string;
    nearby3?: string;
    nearby3distance?: string;

    // New fields
    state?: string;
    price?: number;
    minPrice?: number;
    maxPrice?: number;
    features?: string[];
    rating?: number;
    popular?: boolean;
    occupancy?: number;
    established?: number;
    capacity?: number;
    gender?: string;
    hostelType?: string;
    distance?: number;
    description?: string;
    roomTypes?: {
        type: string;
        price: string;
        icon?: string;
    }[];
    facilities?: {
        name: string;
        icon?: string;
    }[];
    gallery?: string[];
    usps?: string[];
    comming_soon?:true;
}

// 2. Define the schema
const hostelSchema: Schema<IHostel> = new Schema<IHostel>({
    // Old fields
    name: { type: String, required: true, index: true },
    location: { type: String, required: true },
    locationLink: { type: String },
    totalRemainingBeds: { type: Number, index: true },
    hostelPrice: { type: Number },
    nearby1: { type: String },
    nearby1distance: { type: String },
    nearby2: { type: String },
    nearby2distance: { type: String },
    nearby3: { type: String },
    nearby3distance: { type: String },
    // New fields
    state: { type: String },
    price: { type: Number },
    minPrice: { type: Number },
    maxPrice: { type: Number },
    features: [{ type: String }],
    rating: { type: Number },
    popular: { type: Boolean, default: false },
    occupancy: { type: Number },
    established: { type: Number },
    capacity: { type: Number },
    gender: { type: String },
    hostelType: { type: String },
    distance: { type: Number },
    description: { type: String },
    roomTypes: [{
        type: { type: String },
        price: { type: String },
        icon: { type: String }
    }],
    facilities: [{
        name: { type: String },
        icon: { type: String }
    }],
    gallery: [{ type: String }],
    usps: [{ type: String }],
    comming_soon: { type: Boolean, default: false },
});

// 3. Define and export the model
const Hostel: Model<IHostel> = mongoose.model<IHostel>("Hostel", hostelSchema);
export default Hostel;
