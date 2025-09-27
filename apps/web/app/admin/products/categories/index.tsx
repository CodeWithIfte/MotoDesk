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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Plus,
    Search,
    Filter,
    Eye,
    Edit,
    Package,
    Tag,
    Bike,
    Zap,
    Settings,
    FileText,
    Upload,
} from "lucide-react";

export const Categories = () => {
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
                    {productCategories
                        .filter((cat) => !cat.parentId)
                        .map((category) => (
                            <Card key={category.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <category.icon className="h-6 w-6 text-primary" />
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
                                            <Badge
                                                variant={getStatusColor(
                                                    category.status
                                                )}
                                            >
                                                {category.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* Subcategories */}
                                    {category.subcategories.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-sm">
                                                Subcategories:
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {category.subcategories.map(
                                                    (subId) => {
                                                        const subCategory =
                                                            productCategories.find(
                                                                (cat) =>
                                                                    cat.id ===
                                                                    subId
                                                            );
                                                        if (!subCategory)
                                                            return null;
                                                        return (
                                                            <div
                                                                key={subId}
                                                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <subCategory.icon className="h-4 w-4" />
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
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </TabsContent>
            {/* Add Category Dialog */}
            <Dialog
                open={isAddCategoryOpen}
                onOpenChange={setIsAddCategoryOpen}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>
                            Create a new product category
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category-name">
                                    Category Name
                                </Label>
                                <Input
                                    id="category-name"
                                    placeholder="Sports Bikes"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="parent-category">
                                    Parent Category
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select parent (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            None (Root Category)
                                        </SelectItem>
                                        {productCategories
                                            .filter((cat) => !cat.parentId)
                                            .map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category-description">
                                Description
                            </Label>
                            <Textarea
                                id="category-description"
                                placeholder="Category description..."
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddCategoryOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => setIsAddCategoryOpen(false)}>
                                Add Category
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
