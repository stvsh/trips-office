export interface Trip {
    id?: string;
    name: string;
    country: string;
    startDate: Date;
    endDate: Date;
    price: number;
    capacity: number;
    availableSeats: number;
    description: string;
    imageUri: string;
    rating: number;
}
