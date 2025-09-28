import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import React from "react";

export const Specifications = () => {
    return (
        <TabsContent value="specifications" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Product Specifications Templates</CardTitle>
                    <CardDescription>
                        Manage specification templates for different product
                        categories
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                category: "Motorcycles",
                                fields: [
                                    "Engine",
                                    "Power",
                                    "Mileage",
                                    "Fuel Tank",
                                    "Weight",
                                    "Brakes",
                                    "Suspension",
                                ],
                            },
                            {
                                category: "Spare Parts",
                                fields: [
                                    "Material",
                                    "Compatibility",
                                    "Warranty",
                                    "Brand",
                                    "Part Number",
                                ],
                            },
                            {
                                category: "Accessories",
                                fields: [
                                    "Material",
                                    "Color",
                                    "Size",
                                    "Compatibility",
                                    "Brand",
                                    "Warranty",
                                ],
                            },
                        ].map((template) => (
                            <div
                                key={template.category}
                                className="p-4 border rounded-lg"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold">
                                        {template.category}
                                    </h3>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit Template
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {template.fields.map((field) => (
                                        <Badge key={field} variant="outline">
                                            {field}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};
