import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
export const ProductCardSkeleton = () => {
    return (
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">
                            <Skeleton className="h-[25px] w-[250px] rounded-xl" />
                        </CardTitle>
                    </div>
                </div>
                <CardDescription>
                    <Skeleton className="h-[25px] w-[90px] rounded-xl" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                            Brand:
                        </span>
                        <span className="text-sm font-medium">
                            <Skeleton className="h-[25px] w-[250px] rounded-xl" />
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                            MRP:
                        </span>
                        <span className="text-sm font-bold">
                            <Skeleton className="h-[25px] w-[250px] rounded-xl" />
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                            Stock:
                        </span>
                        <span className="text-sm font-medium">
                            <Skeleton className="h-[25px] w-[80px] rounded-xl" />
                        </span>
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
                    <Skeleton className="h-[25px] w-[80px] rounded-xl" />
                    <Skeleton className="h-[25px] w-[80px] rounded-xl" />
                </div>
            </CardContent>
        </Card>
    );
};
