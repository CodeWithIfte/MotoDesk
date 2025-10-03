"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, Search, Filter } from "lucide-react";
import { Category } from "../categories/types";
import { ProductWithCategory } from "./types";
import {
    createProduct,
    getProductsWithCategory,
    updateProduct,
} from "@/actions/products";
import { ProductForm } from "./product-form";
import { ProductDetails } from "./product-details";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCard } from "./product-card";
import { productSchema, ProductSchema } from "./schema";
import { useRouter } from "next/navigation";
import { ProductCardSkeleton } from "./product-card-skeleton";
export const Products = ({ categories }: { categories: Category[] }) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductWithCategory[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] =
        useState<ProductWithCategory | null>(null);
    const [editingProduct, setEditingProduct] = useState<ProductSchema | null>(
        null
    );
    const [categoryFilter, setCategoryFilter] = useState("all");
    const router = useRouter();

    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            product_code: "",
            brand: "",
            model: "",
            unit: "pcs",
            purchase_price: 0,
            selling_price: 0,
            taxable: true,
            min_stock: 0,
            status: "active",
            category_id: "",
            weight: "",
            warranty: "",
            manufacture_year: undefined,
            maker_country: "",
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    const fetchProducts = async () => {
        setLoading(true);
        const data = await getProductsWithCategory();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, []);

    const handleProductSubmit = async (data: ProductSchema) => {
        try {
            setLoading(true);
            if (editingProduct) {
                await updateProduct({ ...data, id: editingProduct.id! });
            } else {
                await createProduct(data);
            }
            form.reset();
            setEditingProduct(null);
            setIsAddProductOpen(false);
            fetchProducts();
        } catch (error) {
            console.error("Error submitting category:", error);
        } finally {
            setLoading(false);
        }
    };

    const subCategories = useMemo(() => {
        return categories.flatMap((category) => category.subCategories);
    }, [categories]);
    return (
        <>
            <TabsContent value="products" className="space-y-4">
                {/* Filters */}
                <div className="flex items-center space-x-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                    >
                        <SelectTrigger className="w-48">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="discontinued">
                                Discontinued
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Dialog
                        open={isAddProductOpen}
                        onOpenChange={setIsAddProductOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Product
                            </Button>
                        </DialogTrigger>
                    </Dialog>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {!loading && products.length > 0 ? (
                        <>
                            {products.map((product) => {
                                // const stockStatus = getStockStatus(product);
                                return (
                                    <ProductCard
                                        product={product}
                                        key={product.id}
                                        handleEditClick={() => {
                                            setEditingProduct({
                                                id: product.id,
                                                category_id:
                                                    product.category.id,
                                                purchase_price:
                                                    product.purchase_price,
                                                min_stock: product.min_stock,
                                                name: product.name,
                                                selling_price:
                                                    product.selling_price,
                                                status: product.status,
                                                taxable: product.taxable,
                                                unit: product.unit,
                                                brand: product.brand,
                                                model: product.model,
                                                product_code:
                                                    product.product_code,
                                            });
                                            setIsAddProductOpen(true);
                                        }}
                                        handleProductView={() => {
                                            setSelectedProduct(product);
                                            setIsProductDetailsOpen(true);
                                        }}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        [...Array(6)].map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                    )}
                </div>
            </TabsContent>

            <ProductForm
                isOpen={isAddProductOpen}
                form={form}
                isSubmitting={isSubmitting}
                subCategories={subCategories}
                loading={isSubmitting}
                onCancel={() => {
                    setIsAddProductOpen(false);
                    form.reset();
                }}
                onSubmit={handleProductSubmit}
                defaultValues={editingProduct}
            />
            <ProductDetails
                isOpen={isProductDetailsOpen}
                onCancel={() => {
                    setIsProductDetailsOpen(false);
                    setSelectedProduct(null);
                }}
                product={selectedProduct as ProductWithCategory}
            />
        </>
    );
};
