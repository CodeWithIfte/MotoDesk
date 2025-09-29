'use server';

import { categorySchema } from "@/app/admin/inventory/categories/create.schema";
import { Category, SubCategory } from "@/app/admin/inventory/categories/types";
import { parentCategories } from "@/app/admin/inventory/utils";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCategories(): Promise<Category[]> {
    const supabase = await createClient();

    // fetch categories with counts directly from view
    const { data: categories, error } = await supabase
        .from("categories_with_counts")
        .select("*");

    if (error) {
        console.error("Error fetching categories with counts:", error);
        return [];
    }


    // group subcategories under their parent
    const result: Category[] = parentCategories.map((parent) => {
        const subCategories: SubCategory[] = (categories || [])
            .filter((item) => item.parent_category === parent.id)
            .map((item) => ({
                id: item.id || "",
                name: item.name || "",
                description: item.description || "",
                parent_category: item.parent_category || "",
                productCount: item.product_count || 0,
                created_at: item.created_at || "",
            }));

        const total = subCategories.reduce((sum, sc) => sum + sc.productCount, 0);

        return {
            ...parent,
            subCategories,
            productCount: total
        };
    });

    return result;
}


export const createCategory = async ({
    name,
    description,
    parent_category
}: categorySchema) => {
    const supabase = await createClient();

    const { data, error } = await supabase.from('product_categories').insert({
        name,
        description,
        parent_category
    });

    if (error) throw new Error(`Error creating category: ${error.message}`);

    revalidatePath('/admin/inventory');

    return data;
};




export async function deleteCategory(categoryId: string) {
    const supabase = await createClient();

    // Step 1: Check if any products are linked to this category
    const { data: products, error: productCheckError } = await supabase
        .from("products") // replace with your actual products table name
        .select("id")
        .eq("category_id", categoryId)
        .limit(1); // we only need to know if at least one exists

    if (productCheckError) {
        console.error("Error checking linked products:", productCheckError.message);
        return { success: false, error: productCheckError.message };
    }

    if (products && products.length > 0) {
        // Prevent deletion if linked products exist
        return {
            success: false,
            error: "Cannot delete category. There are products linked to this category.",
        };
    }

    // Step 2: Safe to delete
    const { error: deleteError } = await supabase
        .from("product_categories")
        .delete()
        .eq("id", categoryId);

    if (deleteError) {
        console.error("Delete Category Error:", deleteError.message);
        return { success: false, error: deleteError.message };
    }

    // Step 3: Revalidate inventory page
    revalidatePath("/admin/inventory");

    return { success: true };
}


export const updateCategory = async ({
    id,
    name,
    description,
    parent_category,
}: categorySchema & { id: string }) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("product_categories")
        .update({
            name,
            description,
            parent_category,
        })
        .eq("id", id);

    if (error) throw new Error(`Error updating category: ${error.message}`);

    // revalidate the inventory page so updated data is visible
    revalidatePath("/admin/inventory");

    return data;
};