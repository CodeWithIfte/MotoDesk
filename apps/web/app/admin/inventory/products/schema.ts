import { z } from "zod";

export const productSchema = z.object({
    id: z.string().optional(),
    category_id: z.string().uuid({ message: "Category ID must be a valid UUID" }),
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" }),

    description: z.string().optional(),

    product_code: z
        .string()
        .min(1, { message: "Product code is required" })
        .optional(),

    brand: z.string().optional(),
    model: z.string().optional(),
    unit: z.string().default("pcs"),

    purchase_price: z
        .number()
        .nonnegative({ message: "Purchase price must be >= 0" }),

    selling_price: z
        .number()
        .nonnegative({ message: "Selling price must be >= 0" }),

    taxable: z.boolean().default(true),

    min_stock: z.number().int().nonnegative().default(0),

    status: z.string().default("active"),

    weight: z.string().optional(),
    warranty: z.string().optional(),
    manufacture_year: z.number().int().optional(),
    maker_country: z.string().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
