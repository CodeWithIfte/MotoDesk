export type UserRole = "admin" | "salesman" | "mechanic" | "customer";

export type Bike = {
    id: string;
    model: string;
    vin: string;
    price: number;
    stock: number;
};
