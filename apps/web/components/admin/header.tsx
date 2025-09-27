import { ReactNode } from "react";

export const Header = ({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children?: ReactNode;
}) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-balance">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center space-x-2">{children}</div>
        </div>
    );
};
