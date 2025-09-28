import { getCategories } from "@/actions/categories";
import { ProductsManagement } from "./products-management";

export default async function ProductsPage() {
    const categories = await getCategories();
    console.log(categories, "categories");
    return <ProductsManagement categories={categories} />;
}
