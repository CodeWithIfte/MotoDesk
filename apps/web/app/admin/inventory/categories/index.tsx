"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, Search, Eye, Edit } from "lucide-react";
import { Category, SubCategory } from "./types";
import { useForm } from "react-hook-form";
import { categorySchema } from "./create.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { createCategory, updateCategory } from "@/actions/categories";
import { AddCategoryForm } from "./add-category";
import { EditCategory } from "./edit-category";

export const Categories = ({ categories }: { categories: Category[] }) => {
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editCatDialog, setEditCatDialog] = useState<string | null>(null);
    const [editingCategory, setEditingCategory] = useState<SubCategory | null>(
        null
    );

    const form = useForm<categorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
            parent_category: "motorcycles",
        },
    });
    const isSubmitting = form.formState.isSubmitting;
    const handleCategorySubmit = async (data: categorySchema) => {
        try {
            setLoading(true);
            if (editingCategory) {
                // Update existing category
                await updateCategory({ ...data, id: editingCategory.id });
            } else {
                // Create new category
                await createCategory(data);
            }
            form.reset();
            setEditingCategory(null);
            setIsAddCategoryOpen(false);
        } catch (error) {
            console.error("Error submitting category:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (category: SubCategory) => {
        setEditingCategory(category);
        setIsAddCategoryOpen(true);
    };
    return (
        <>
            <TabsContent value="categories" className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search categories..."
                            className="pl-10"
                        />
                    </div>
                    <Dialog
                        open={isAddCategoryOpen}
                        onOpenChange={setIsAddCategoryOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Category
                            </Button>
                        </DialogTrigger>
                    </Dialog>
                </div>

                {/* Categories Tree */}
                <div className="space-y-4">
                    {categories.map((category) => (
                        <Card key={category.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        {/* <category.icon className="h-6 w-6 text-primary" /> */}
                                        <div>
                                            <CardTitle className="text-lg">
                                                {category.name}
                                            </CardTitle>
                                            <CardDescription>
                                                {category.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="outline">
                                            {category.productCount} products
                                        </Badge>
                                        {/* <Badge
                                            variant={getStatusColor(
                                                category.status
                                            )}
                                        >
                                            {category.status}
                                        </Badge> */}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Subcategories */}
                                {category.subCategories.length > 0 && (
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-sm">
                                            Subcategories:
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {category.subCategories.map(
                                                (subCategory) => {
                                                    return (
                                                        <div
                                                            key={subCategory.id}
                                                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                {/* <subCategory.icon className="h-4 w-4" /> */}
                                                                <span className="text-sm font-medium">
                                                                    {
                                                                        subCategory.name
                                                                    }
                                                                </span>
                                                            </div>
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {
                                                                    subCategory.productCount
                                                                }
                                                            </Badge>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-end mt-4 space-x-2">
                                    <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4 mr-1" />
                                        View Products
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setEditCatDialog(category.id)
                                        }
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <AddCategoryForm
                form={form}
                onSubmit={handleCategorySubmit}
                isSubmitting={isSubmitting}
                loading={loading}
                onCancel={() => setIsAddCategoryOpen(false)}
                isOpen={isAddCategoryOpen}
                defaultValues={editingCategory ?? null}
            />
            <EditCategory
                isOpen={!!editCatDialog}
                onCancel={() => setEditCatDialog(null)}
                title={editCatDialog || ""}
                categories={
                    categories.find((c) => c.id === editCatDialog)
                        ?.subCategories || []
                }
                handleEditClick={handleEditClick}
            />
        </>
    );
};
