import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SubCategory } from "../categories/types";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { ProductSchema } from "./schema";
import { useEffect } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export const ProductForm = ({
    isOpen,
    onCancel,
    subCategories,
    onSubmit,
    defaultValues,
    form,
    loading,
    isSubmitting,
}: {
    form: UseFormReturn<ProductSchema>;
    onSubmit: SubmitHandler<ProductSchema>;
    loading: boolean;
    isSubmitting: boolean;
    onCancel: () => void;
    isOpen: boolean;
    defaultValues?: ProductSchema | null;
    subCategories: SubCategory[];
}) => {
    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
        } else {
            form.reset({
                name: "",
                product_code: "",
                brand: "",
                model: "",
                unit: "pcs",
                purchase_price: 0,
                selling_price: 0,
                taxable: true,
                min_stock: 0,
                status: "active",
                category_id: "",
                weight: "",
                warranty: "",
                manufacture_year: undefined,
                maker_country: "",
            });
        }
    }, [defaultValues, form]);

    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent className="md:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {defaultValues ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                    <DialogDescription>
                        {defaultValues
                            ? "Update product details"
                            : "Create a new product in your catalog"}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Name"
                                                    {...field}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="product_code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SKU</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="HSP-2024-001"
                                                    {...field}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="category_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {subCategories.map(
                                                            (category) => (
                                                                <SelectItem
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    value={
                                                                        category.id
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="brand"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Brand</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Hero"
                                                    {...field}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="XPulse 200"
                                                {...field}
                                                disabled={
                                                    loading || isSubmitting
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Product description..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        {/* Pricing */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Pricing</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="purchase_price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Purchase Price
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="75000"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="selling_price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Selling Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="78000"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Inventory Settings */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Inventory Settings
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unit</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="pcs"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="min_stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Min Stock</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="5"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">
                                                            Active
                                                        </SelectItem>
                                                        <SelectItem value="inactive">
                                                            Inactive
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Additional Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Additional Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Weight</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="120kg"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="warranty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Warranty</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="2 Years"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="manufacture_year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Manufacture Year
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="2024"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="maker_country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Country of Origin
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="India"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button variant="outline" type="button">
                                Save Draft
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading || isSubmitting}
                            >
                                {defaultValues
                                    ? "Update Product"
                                    : "Add Product"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
