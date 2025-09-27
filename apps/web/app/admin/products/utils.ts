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