"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SubCategory } from "./types";
import { Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { deleteCategory } from "@/actions/categories";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const EditCategory = ({
    title = "Categories",
    onCancel,
    isOpen: isAddCategoryOpen,
    categories,
    handleEditClick,
}: {
    title: string;
    onCancel: () => void;
    isOpen: boolean;
    categories: SubCategory[];
    handleEditClick: (category: SubCategory) => void;
}) => {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        try {
            setLoadingId(id);
            setErrorMessage(null); // reset previous error

            const res = await deleteCategory(id);
            if (!res.success) {
                // show error message in UI
                setErrorMessage(res.error || "Unable to delete category");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Error deleting category");
        } finally {
            setLoadingId(null);
        }
    };
    const handleCancel = () => {
        setErrorMessage(null); // reset previous error
        onCancel();
    };

    return (
        <Dialog open={isAddCategoryOpen} onOpenChange={handleCancel}>
            <DialogContent className="md:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="capitalize">
                        {title} Sub Categories
                    </DialogTitle>
                    <DialogDescription>
                        Manage all subcategories under <b>{title}</b>
                    </DialogDescription>
                </DialogHeader>

                {errorMessage && (
                    <p className="text-red-600 text-sm my-2">{errorMessage}</p>
                )}

                {categories.length === 0 ? (
                    <p className="text-muted-foreground text-sm mt-4">
                        No subcategories found.
                    </p>
                ) : (
                    <div className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((subCategory) => (
                                    <TableRow key={subCategory.id}>
                                        <TableCell className="font-medium">
                                            {subCategory.name}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                subCategory.created_at
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {subCategory.productCount}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2 flex flex-wrap gap-1.5 justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    console.log(
                                                        "View products of",
                                                        subCategory.id
                                                    )
                                                }
                                                disabled={
                                                    loadingId === subCategory.id
                                                }
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                View Products
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleEditClick(subCategory)
                                                }
                                                disabled={
                                                    loadingId === subCategory.id
                                                }
                                            >
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        disabled={
                                                            loadingId ===
                                                            subCategory.id
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete Category
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you
                                                            want to delete{" "}
                                                            <b>
                                                                {
                                                                    subCategory.name
                                                                }
                                                            </b>
                                                            ? This action cannot
                                                            be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleDelete(
                                                                    subCategory.id
                                                                )
                                                            }
                                                        >
                                                            Confirm Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
