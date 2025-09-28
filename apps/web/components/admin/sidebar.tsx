"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Bike,
    Wrench,
    Calendar,
    Users,
    Package,
    Settings,
    ChevronLeft,
    ChevronRight,
    ShoppingCart,
    Calculator,
    BarChart3,
    UserCheck,
    MessageSquare,
} from "lucide-react";

const navigation = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    { name: "Inventory", href: "/admin/inventory", icon: Package }, // Added Products & Categories management before other modules
    { name: "Bike Sales", href: "/admin/bikes", icon: Bike },
    { name: "Purchase & Vendors", href: "/admin/purchase", icon: ShoppingCart },
    { name: "Parts & Accessories", href: "/admin/parts", icon: Package },
    { name: "Service Booking", href: "/admin/services", icon: Wrench },
    { name: "Customers", href: "/admin/customers", icon: Users },
    {
        name: "Accounting & Finance",
        href: "/admin/accounting",
        icon: Calculator,
    }, // Added accounting navigation
    { name: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 }, // Added comprehensive reporting navigation
    { name: "HR & Payroll", href: "/admin/hr", icon: UserCheck }, // Added HR & Payroll navigation
    { name: "CRM & Communication", href: "/admin/crm", icon: MessageSquare }, // Added CRM & Communication navigation
    { name: "Calendar", href: "/admin/calendar", icon: Calendar },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <div
            className={cn(
                "flex flex-col bg-card border-r border-border transition-all duration-300",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                {!collapsed && (
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                                HH
                            </span>
                        </div>
                        <div>
                            <h2 className="font-semibold text-sm">
                                Hero Honda
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Dealer Admin
                            </p>
                        </div>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCollapsed(!collapsed)}
                    className="h-8 w-8 p-0"
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2">
                <ul className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    )}
                                >
                                    <item.icon className="h-4 w-4 flex-shrink-0" />
                                    {!collapsed && (
                                        <span className="ml-3">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div className="p-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">AD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                Admin User
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                admin@herohonda.com
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
