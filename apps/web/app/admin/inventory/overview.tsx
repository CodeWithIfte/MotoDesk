import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag } from "lucide-react";

const OverView = ({
    activeProductCount = 0,
    categoryCount = 0,
    lowStockCount = 0,
}: {
    activeProductCount: number;
    categoryCount: number;
    lowStockCount: number;
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Products
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {activeProductCount}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Active products
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Categories
                    </CardTitle>
                    <Tag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{categoryCount}</div>
                    <p className="text-xs text-muted-foreground">
                        Product categories
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Low Stock Items
                    </CardTitle>
                    <Package className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{lowStockCount}</div>
                    <p className="text-xs text-muted-foreground">
                        Need reorder
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Value
                    </CardTitle>
                    <Package className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹45.2L</div>
                    <p className="text-xs text-muted-foreground">
                        Inventory value
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default OverView;
