import { z } from 'zod';

export const categorySchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' }),
    description: z.string().optional(),
    parent_category: z
        .enum(['motorcycles', 'parts', 'accessories'], {
            message: 'Parent category should be one of motorcycles, parts or accessories',
        }),
});

export type categorySchema = z.infer<typeof categorySchema>;
