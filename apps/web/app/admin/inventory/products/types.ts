import { SubCategory } from "../categories/types";

export type ProductWithCategory = {
    id: number;
    name: string;
    sku: string;
    unit: string;
    vendor: string,
    branch: string,
    brand: string;
    model: string;
    cost_price: number;
    selling_price: number;
    taxable: boolean;
    min_stock: number;
    maxQuantity: number;
    created_at: string;
    category: SubCategory;
};

export type ProductsWithCategoriesResponse = ProductWithCategory[];

export type UpdateProductSchema = {
    id: number;
    name: string;
    sku: string;
    unit: string;
    vendor: string,
    branch: string,
    brand: string;
    model: string;
    cost_price: number;
    selling_price: number;
    taxable: boolean;
    min_stock: number;
    maxQuantity: number;
    created_at: string;
    category: number;
};
