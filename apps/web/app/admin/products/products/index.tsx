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
import { Plus, Search, Filter, Eye, Edit, Package } from "lucide-react";
const products = [
    // Motorcycles
    {
        id: "PROD-001",
        name: "Hero Splendor Plus",
        sku: "HSP-2024-001",
        categoryId: "CAT-002",
        category: "Commuter Bikes",
        description: "Reliable and fuel-efficient commuter motorcycle",
        specifications: {
            engine: "97.2cc, Single Cylinder, 4-Stroke",
            power: "8.02 PS @ 8000 rpm",
            mileage: "80-85 kmpl",
            fuelTank: "9.8 liters",
            weight: "112 kg",
        },
        pricing: {
            basePrice: 75000,
            dealerPrice: 70000,
            mrp: 78000,
            gst: 18,
        },
        inventory: {
            minStock: 5,
            maxStock: 20,
            reorderLevel: 8,
            currentStock: 12,
        },
        status: "active",
        brand: "Hero",
        model: "Splendor Plus",
        variant: "Standard",
        colors: ["Black", "Red", "Blue", "Silver"],
        images: ["/hero-splendor-plus.png"],
        createdDate: "2024-01-01",
        updatedDate: "2024-01-15",
    },
    {
        id: "PROD-002",
        name: "Hero Passion Pro",
        sku: "HPP-2024-001",
        categoryId: "CAT-002",
        category: "Commuter Bikes",
        description: "Stylish commuter with advanced features",
        specifications: {
            engine: "113.2cc, Single Cylinder, 4-Stroke",
            power: "9.15 PS @ 7500 rpm",
            mileage: "75-80 kmpl",
            fuelTank: "10 liters",
            weight: "118 kg",
        },
        pricing: {
            basePrice: 68000,
            dealerPrice: 64000,
            mrp: 71000,
            gst: 18,
        },
        inventory: {
            minStock: 5,
            maxStock: 15,
            reorderLevel: 7,
            currentStock: 9,
        },
        status: "active",
        brand: "Hero",
        model: "Passion Pro",
        variant: "Standard",
        colors: ["Black", "Red", "Blue"],
        images: ["/hero-passion-pro-motorcycle.jpg"],
        createdDate: "2024-01-01",
        updatedDate: "2024-01-15",
    },
    {
        id: "PROD-003",
        name: "Hero Xtreme 160R",
        sku: "HX160R-2024-001",
        categoryId: "CAT-003",
        category: "Sports Bikes",
        description: "Premium sports motorcycle with advanced features",
        specifications: {
            engine: "163cc, Single Cylinder, 4-Stroke",
            power: "15.2 PS @ 8500 rpm",
            mileage: "45-50 kmpl",
            fuelTank: "12 liters",
            weight: "138.5 kg",
        },
        pricing: {
            basePrice: 115000,
            dealerPrice: 110000,
            mrp: 120000,
            gst: 18,
        },
        inventory: {
            minStock: 3,
            maxStock: 10,
            reorderLevel: 5,
            currentStock: 6,
        },
        status: "active",
        brand: "Hero",
        model: "Xtreme 160R",
        variant: "Standard",
        colors: ["Red", "Black", "White"],
        images: ["/hero-xtreme-160r-sports-motorcycle.jpg"],
        createdDate: "2024-01-01",
        updatedDate: "2024-01-15",
    },
    {
        id: "PROD-004",
        name: "Hero Destini 125",
        sku: "HD125-2024-001",
        categoryId: "CAT-004",
        category: "Scooters",
        description: "Premium automatic scooter",
        specifications: {
            engine: "124.6cc, Single Cylinder, 4-Stroke",
            power: "9 PS @ 7000 rpm",
            mileage: "55-60 kmpl",
            fuelTank: "5.5 liters",
            weight: "111 kg",
        },
        pricing: {
            basePrice: 85000,
            dealerPrice: 80000,
            mrp: 88000,
            gst: 18,
        },
        inventory: {
            minStock: 3,
            maxStock: 12,
            reorderLevel: 5,
            currentStock: 7,
        },
        status: "active",
        brand: "Hero",
        model: "Destini 125",
        variant: "Standard",
        colors: ["White", "Black", "Blue"],
        images: ["/hero-destini-125-scooter.jpg"],
        createdDate: "2024-01-01",
        updatedDate: "2024-01-15",
    },
    // Spare Parts
    {
        id: "PROD-005",
        name: "Brake Pads Set",
        sku: "BP-HERO-001",
        categoryId: "CAT-007",
        category: "Body Parts",
        description: "High-quality brake pads for Hero motorcycles",
        specifications: {
            material: "Semi-metallic",
            compatibility: "Hero Splendor, Passion, Glamour",
            warranty: "6 months",
            brand: "Genuine Hero",
        },
        pricing: {
            basePrice: 800,
            dealerPrice: 720,
            mrp: 850,
            gst: 18,
        },
        inventory: {
            minStock: 20,
            maxStock: 100,
            reorderLevel: 30,
            currentStock: 45,
        },
        status: "active",
        brand: "Hero",
        model: "Universal",
        variant: "Standard",
        colors: ["Black"],
        images: ["/motorcycle-brake-pads.jpg"],
        createdDate: "2024-01-01",
        updatedDate: "2024-01-15",
    },
    {
        id: "PROD-006",
        name: "Air Filter",
        sku: "AF-HERO-001",
        categoryId: "CAT-006",
        category: "Engine Parts",
        description: "High-flow air filter for better engine performance",
        specifications: {
            material: "Paper element",
            compatibility: "Hero Splendor Plus, Passion Pro",
            warranty: "3 months",
            brand: "Genuine Hero",
        },
        pricing: {
            basePrice: 350,
            dealerPrice: 315,
            mrp: 380,
            gst: 18,
        },
        inventory: {
            minStock: 50,
            maxStock: 200,
            reorderLevel: 75,
            currentStock: 120,
        },
        status: "active",
        brand: "Hero",
        model: "Universal",
        variant: "Standard",
        colors: ["White"],
        images: ["/motorcycle-air-filter.jpg"],
        createdDate: "2024-01-01",
        updatedDate: "2024-01-15",
    },
];
export const Products = ({ productCategories }: any) => {
    const getStockStatus = (product: any) => {
        const { currentStock, minStock, reorderLevel } = product.inventory;
        if (currentStock <= minStock)
            return { status: "critical", color: "destructive" };
        if (currentStock <= reorderLevel)
            return { status: "low", color: "secondary" };
        return { status: "good", color: "default" };
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" || product.categoryId === categoryFilter;
        const matchesStatus =
            statusFilter === "all" || product.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });
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
                            {productCategories.map((category) => (
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
                    {filteredProducts.map((product) => {
                        const stockStatus = getStockStatus(product);
                        return (
                            <Card
                                key={product.id}
                                className="cursor-pointer hover:shadow-md transition-shadow"
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <CardTitle className="text-lg">
                                                {product.name}
                                            </CardTitle>
                                            <Badge
                                                variant={getStatusColor(
                                                    product.status
                                                )}
                                            >
                                                {product.status}
                                            </Badge>
                                        </div>
                                        <Badge variant={stockStatus.color}>
                                            {stockStatus.status}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        {product.category} • {product.sku}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Brand:
                                            </span>
                                            <span className="text-sm font-medium">
                                                {product.brand}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                MRP:
                                            </span>
                                            <span className="text-sm font-bold">
                                                ₹
                                                {product.pricing.mrp.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Stock:
                                            </span>
                                            <span className="text-sm font-medium">
                                                {product.inventory.currentStock}{" "}
                                                / {product.inventory.maxStock}
                                            </span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    stockStatus.status ===
                                                    "critical"
                                                        ? "bg-red-500"
                                                        : stockStatus.status ===
                                                            "low"
                                                          ? "bg-yellow-500"
                                                          : "bg-green-500"
                                                }`}
                                                style={{
                                                    width: `${(product.inventory.currentStock / product.inventory.maxStock) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setIsProductDetailsOpen(true);
                                            }}
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            View
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </TabsContent>
            {/* Add Product Dialog */}
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                            Create a new product in your catalog
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="product-name">
                                        Product Name
                                    </Label>
                                    <Input
                                        id="product-name"
                                        placeholder="Hero Splendor Plus"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="product-sku">SKU</Label>
                                    <Input
                                        id="product-sku"
                                        placeholder="HSP-2024-001"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="product-category">
                                        Category
                                    </Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productCategories.map(
                                                (category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="product-brand">Brand</Label>
                                    <Input
                                        id="product-brand"
                                        placeholder="Hero"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="product-description">
                                    Description
                                </Label>
                                <Textarea
                                    id="product-description"
                                    placeholder="Product description..."
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Pricing */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Pricing</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="base-price">
                                        Base Price (₹)
                                    </Label>
                                    <Input
                                        id="base-price"
                                        type="number"
                                        placeholder="75000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dealer-price">
                                        Dealer Price (₹)
                                    </Label>
                                    <Input
                                        id="dealer-price"
                                        type="number"
                                        placeholder="70000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mrp">MRP (₹)</Label>
                                    <Input
                                        id="mrp"
                                        type="number"
                                        placeholder="78000"
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Inventory Settings */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Inventory Settings
                            </h3>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="min-stock">Min Stock</Label>
                                    <Input
                                        id="min-stock"
                                        type="number"
                                        placeholder="5"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="max-stock">Max Stock</Label>
                                    <Input
                                        id="max-stock"
                                        type="number"
                                        placeholder="20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reorder-level">
                                        Reorder Level
                                    </Label>
                                    <Input
                                        id="reorder-level"
                                        type="number"
                                        placeholder="8"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="current-stock">
                                        Current Stock
                                    </Label>
                                    <Input
                                        id="current-stock"
                                        type="number"
                                        placeholder="12"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddProductOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button variant="outline">Save Draft</Button>
                            <Button onClick={() => setIsAddProductOpen(false)}>
                                Add Product
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* Product Details Dialog */}
            <Dialog
                open={isProductDetailsOpen}
                onOpenChange={setIsProductDetailsOpen}
            >
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedProduct && (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedProduct.name}
                                </DialogTitle>
                                <DialogDescription>
                                    {selectedProduct.sku} •{" "}
                                    {selectedProduct.category}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                Product Information
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Brand:
                                                    </span>
                                                    <span>
                                                        {selectedProduct.brand}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Model:
                                                    </span>
                                                    <span>
                                                        {selectedProduct.model}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Variant:
                                                    </span>
                                                    <span>
                                                        {
                                                            selectedProduct.variant
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Status:
                                                    </span>
                                                    <Badge
                                                        variant={getStatusColor(
                                                            selectedProduct.status
                                                        )}
                                                    >
                                                        {selectedProduct.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                Pricing
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Base Price:
                                                    </span>
                                                    <span>
                                                        ₹
                                                        {selectedProduct.pricing.basePrice.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Dealer Price:
                                                    </span>
                                                    <span>
                                                        ₹
                                                        {selectedProduct.pricing.dealerPrice.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        MRP:
                                                    </span>
                                                    <span className="font-bold">
                                                        ₹
                                                        {selectedProduct.pricing.mrp.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        GST:
                                                    </span>
                                                    <span>
                                                        {
                                                            selectedProduct
                                                                .pricing.gst
                                                        }
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                Inventory
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Current Stock:
                                                    </span>
                                                    <span className="font-bold">
                                                        {
                                                            selectedProduct
                                                                .inventory
                                                                .currentStock
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Min Stock:
                                                    </span>
                                                    <span>
                                                        {
                                                            selectedProduct
                                                                .inventory
                                                                .minStock
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Max Stock:
                                                    </span>
                                                    <span>
                                                        {
                                                            selectedProduct
                                                                .inventory
                                                                .maxStock
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Reorder Level:
                                                    </span>
                                                    <span>
                                                        {
                                                            selectedProduct
                                                                .inventory
                                                                .reorderLevel
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full"
                                                        style={{
                                                            width: `${(selectedProduct.inventory.currentStock / selectedProduct.inventory.maxStock) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                Available Colors
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProduct.colors.map(
                                                    (color: string) => (
                                                        <Badge
                                                            key={color}
                                                            variant="outline"
                                                        >
                                                            {color}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {selectedProduct.specifications && (
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Specifications
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            {Object.entries(
                                                selectedProduct.specifications
                                            ).map(([key, value]) => (
                                                <div
                                                    key={key}
                                                    className="flex justify-between"
                                                >
                                                    <span className="text-muted-foreground capitalize">
                                                        {key.replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                        )}
                                                        :
                                                    </span>
                                                    <span>
                                                        {value as string}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Product
                                    </Button>
                                    <Button variant="outline">
                                        <Package className="h-4 w-4 mr-2" />
                                        Update Stock
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};
