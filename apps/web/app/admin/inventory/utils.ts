import { Category } from "./categories/types";


export const getStatusColor = (status: string) => {
    switch (status) {
        case "active":
            return "default";
        case "inactive":
            return "secondary";
        case "discontinued":
            return "destructive";
        default:
            return "default";
    }
};


// const getStockStatus = (product: ProductWithCategory) => {
//     const { currentStock, minStock, reorderLevel } = product.inventory;
//     if (currentStock <= minStock)
//         return { status: "critical", color: "destructive" };
//     if (currentStock <= reorderLevel)
//         return { status: "low", color: "secondary" };
//     return { status: "good", color: "default" };
// };

export const parentCategories: Omit<Category, "subCategories">[] = [
    {
        id: "motorcycles",
        name: "Motorcycles",
        description: "Complete motorcycle units",
        productCount: 0
    },
    {
        id: "parts",
        name: "Spare Parts",
        description: "Motorcycle spare parts and components",
        productCount: 0
    },
    {
        id: "accessories",
        name: "Accessories",
        description: "Motorcycle accessories and add-ons",
        productCount: 0
    }
];