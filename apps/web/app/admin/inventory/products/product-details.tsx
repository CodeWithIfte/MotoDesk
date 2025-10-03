import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ProductWithCategory } from "./types";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "../utils";
import { Button } from "@/components/ui/button";
import { Edit, Package } from "lucide-react";
export const ProductDetails = ({
    product,
    isOpen,
    onCancel,
}: {
    product: ProductWithCategory;
    isOpen: boolean;
    onCancel: () => void;
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                {product && (
                    <>
                        <DialogHeader>
                            <DialogTitle>{product.name}</DialogTitle>
                            <DialogDescription>
                                {product.product_code} • {product.category.name}
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
                                                <span>{product.brand}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Model:
                                                </span>
                                                <span>{product.model}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Variant:
                                                </span>
                                                {/* <span>
                                                        {
                                                            product.variant
                                                        }
                                                    </span> */}
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Status:
                                                </span>
                                                <Badge
                                                    variant={getStatusColor(
                                                        product.status
                                                    )}
                                                >
                                                    {product.status}
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
                                                    {product.purchase_price.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Dealer Price:
                                                </span>
                                                <span>
                                                    ₹
                                                    {product.purchase_price.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    MRP:
                                                </span>
                                                <span className="font-bold">
                                                    ₹
                                                    {product.selling_price.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    GST:
                                                </span>
                                                {/* <span>
                                                        {
                                                            product
                                                                .pricing.gst
                                                        }
                                                        %
                                                    </span> */}
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
                                                {/* <span className="font-bold">
                                                        {
                                                            product
                                                                .inventory
                                                                .currentStock
                                                        }
                                                    </span> */}
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Min Stock:
                                                </span>
                                                {/* <span>
                                                        {
                                                            product
                                                                .inventory
                                                                .minStock
                                                        }
                                                    </span> */}
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Max Stock:
                                                </span>
                                                {/* <span>
                                                    {product.maxQuantity}
                                                </span> */}
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Reorder Level:
                                                </span>
                                                <span>
                                                    {/* {
                                                            product
                                                                .
                                                        } */}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full"
                                                    // style={{
                                                    //     width: `${(product.inventory.currentStock / product.inventory.maxStock) * 100}%`,
                                                    // }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Available Colors
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {/* {product.colors.map(
                                                    (color: string) => (
                                                        <Badge
                                                            key={color}
                                                            variant="outline"
                                                        >
                                                            {color}
                                                        </Badge>
                                                    )
                                                )} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {product.specifications && (
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Specifications
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            {Object.entries(
                                                product.specifications
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
                                )} */}
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
    );
};
