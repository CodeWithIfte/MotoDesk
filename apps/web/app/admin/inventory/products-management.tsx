"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload } from "lucide-react";
import { Header } from "@/components/admin/header";
import OverView from "./overview";
import { Products } from "./products";
import { Categories } from "./categories";
import { Specifications } from "./specifications";
import { Pricing } from "./pricing";
import { Category } from "./categories/types";

export function ProductsManagement({ categories }: { categories: Category[] }) {
    const [activeTab, setActiveTab] = useState("products");

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
                <Products productCategories={categories} />
                <Categories categories={categories} />
                <Specifications />
                <Pricing />
            </Tabs>
        </div>
    );
}
