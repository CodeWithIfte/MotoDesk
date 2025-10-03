import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import { ProductWithCategory } from "./types";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "../utils";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";

export const ProductCard = ({
    product,
    handleProductView,
    handleEditClick,
}: {
    product: ProductWithCategory;
    handleProductView: () => void;
    handleEditClick: () => void;
}) => {
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
                        <Badge variant={getStatusColor(product.status)}>
                            {product.status}
                        </Badge>
                    </div>
                    {/* <Badge variant={stockStatus.color}>
                                            {stockStatus.status}
                                        </Badge> */}
                </div>
                <CardDescription>
                    {product.category.name} • {product.product_code}
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
                            ₹{product.selling_price.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                            Stock:
                        </span>
                        <span className="text-sm font-medium">0 / 0</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        {/* <div
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
                                                    width: `${(0 / 0) * 100}%`,
                                                }}
                                            /> */}
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleProductView}
                    >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditClick}
                    >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
