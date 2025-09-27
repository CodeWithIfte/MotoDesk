"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Bike, Zap, Settings, FileText, Upload } from "lucide-react";
import { Header } from "@/components/admin/header";
import OverView from "./overview";
import { Products } from "./products";
import { Categories } from "./categories";
import { Specifications } from "./specifications";
import { Pricing } from "./pricing";

// Product Categories
const productCategories = [
    {
        id: "CAT-001",
        name: "Motorcycles",
        description: "Complete motorcycle units",
        icon: Bike,
        parentId: null,
        status: "active",
        productCount: 8,
        subcategories: ["CAT-002", "CAT-003", "CAT-004"],
    },
    {
        id: "CAT-002",
        name: "Commuter Bikes",
        description: "Daily commuter motorcycles",
        icon: Bike,
        parentId: "CAT-001",
        status: "active",
        productCount: 4,
        subcategories: [],
    },
    {
        id: "CAT-003",
        name: "Sports Bikes",
        description: "Performance and sports motorcycles",
        icon: Zap,
        parentId: "CAT-001",
        status: "active",
        productCount: 2,
        subcategories: [],
    },
    {
        id: "CAT-004",
        name: "Scooters",
        description: "Automatic scooters",
        icon: Bike,
        parentId: "CAT-001",
        status: "active",
        productCount: 2,
        subcategories: [],
    },
    {
        id: "CAT-005",
        name: "Spare Parts",
        description: "Motorcycle spare parts and components",
        icon: Settings,
        parentId: null,
        status: "active",
        productCount: 25,
        subcategories: ["CAT-006", "CAT-007", "CAT-008"],
    },
    {
        id: "CAT-006",
        name: "Engine Parts",
        description: "Engine components and parts",
        icon: Settings,
        parentId: "CAT-005",
        status: "active",
        productCount: 12,
        subcategories: [],
    },
    {
        id: "CAT-007",
        name: "Body Parts",
        description: "Body panels and exterior parts",
        icon: Package,
        parentId: "CAT-005",
        status: "active",
        productCount: 8,
        subcategories: [],
    },
    {
        id: "CAT-008",
        name: "Electrical Parts",
        description: "Electrical components and wiring",
        icon: Zap,
        parentId: "CAT-005",
        status: "active",
        productCount: 5,
        subcategories: [],
    },
    {
        id: "CAT-009",
        name: "Accessories",
        description: "Motorcycle accessories and add-ons",
        icon: Package,
        parentId: null,
        status: "active",
        productCount: 15,
        subcategories: ["CAT-010", "CAT-011"],
    },
    {
        id: "CAT-010",
        name: "Safety Accessories",
        description: "Helmets, protective gear",
        icon: Package,
        parentId: "CAT-009",
        status: "active",
        productCount: 8,
        subcategories: [],
    },
    {
        id: "CAT-011",
        name: "Comfort Accessories",
        description: "Seats, grips, mirrors",
        icon: Package,
        parentId: "CAT-009",
        status: "active",
        productCount: 7,
        subcategories: [],
    },
];

// Products Database


export function ProductsManagement() {
    const [activeTab, setActiveTab] = useState("products");
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);



    return (
        <div className="p-6 space-y-6">
            <Header
                title="Products & Categories Management"
                description="Manage your product catalog, categories, and inventory
                        settings"
            >
                <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Products
                </Button>
                <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Catalog
                </Button>
            </Header>

            <OverView
                activeProductCount={0}
                categoryCount={0}
                lowStockCount={0}
            />

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="specifications">
                        Specifications
                    </TabsTrigger>
                    <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
                </TabsList>
                <Products />
                <Categories />
                <Specifications />
                <Pricing />
            </Tabs>
        </div>
    );
}
