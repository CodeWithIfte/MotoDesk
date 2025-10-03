import { SubCategory } from "../categories/types";
export type ProductWithCategory = {
    id: string;
    name: string;
    product_code: string;
    unit: string;
    brand: string,
    model: string;
    purchase_price: number;
    selling_price: number;
    taxable: boolean;
    min_stock: number;
    status: string;
    weight: string;
    warranty: string;
    manufacture_year: number;
    maker_country: string;
    category: SubCategory;
    created_at: string;
    updated_at: string;
};

export type ProductsWithCategoriesResponse = ProductWithCategory[];

