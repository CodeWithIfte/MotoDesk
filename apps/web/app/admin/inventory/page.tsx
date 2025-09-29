import { getCategories } from "@/actions/categories";
import { ProductsManagement } from "./products-management";

export default async function ProductsPage() {
    const categories = await getCategories();
    return <ProductsManagement categories={categories} />;
}
