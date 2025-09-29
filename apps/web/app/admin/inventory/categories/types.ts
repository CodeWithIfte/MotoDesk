export type Category = {
    id: "motorcycles" | "parts" | "accessories";
    name: "Motorcycles" | "Spare Parts" | "Accessories";
    description?: string;
    productCount: number;
    subCategories: SubCategory[];
}

export type SubCategory = {
    id: string;
    name: string;
    description?: string;
    parent_category: "motorcycles" | "parts" | "accessories";
    productCount: number;
    created_at: string;
};


