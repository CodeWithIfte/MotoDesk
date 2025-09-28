import { Category, SubCategory } from "@/app/admin/inventory/categories/types";
import { createClient } from "@/supabase/server";

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

    // static parent categories
    const parentCategories: Omit<Category, "subCategories">[] = [
        {
            id: "motorcycles",
            name: "Motorcycles",
            description: "Complete motorcycle units",
            productCount: 0
        },
        {
            id: "parts",
            name: "Spare Parts",
            description: "Motorcycle spare parts and components",
            productCount: 0
        },
        {
            id: "accessories",
            name: "Accessories",
            description: "Motorcycle accessories and add-ons",
            productCount: 0
        }
    ];

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
