import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    TrendingDown,
    Bike,
    Wrench,
    Users,
    DollarSign,
    Calendar,
    AlertTriangle,
    CheckCircle,
} from "lucide-react";

// Demo data
const stats = [
    {
        title: "Total Sales Today",
        value: "₹2,45,000",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
        description: "8 bikes + parts sold",
    },
    {
        title: "Bikes in Stock",
        value: "47",
        change: "-3",
        trend: "down",
        icon: Bike,
        description: "12 models available",
    },
    {
        title: "Service Bookings",
        value: "23",
        change: "+5",
        trend: "up",
        icon: Wrench,
        description: "Today's appointments",
    },
    {
        title: "Active Customers",
        value: "1,247",
        change: "+18",
        trend: "up",
        icon: Users,
        description: "This month",
    },
];

const recentSales = [
    {
        id: "INV-001",
        customer: "Rajesh Kumar",
        bike: "Hero Splendor Plus",
        amount: "₹75,000",
        status: "completed",
        time: "2 hours ago",
    },
    {
        id: "INV-002",
        customer: "Priya Sharma",
        bike: "Hero Xtreme 160R",
        amount: "₹1,15,000",
        status: "pending",
        time: "4 hours ago",
    },
    {
        id: "INV-003",
        customer: "Amit Singh",
        bike: "Hero Passion Pro",
        amount: "₹68,000",
        status: "completed",
        time: "6 hours ago",
    },
];

const lowStockItems = [
    { name: "Engine Oil (10W-30)", stock: 5, minStock: 20 },
    { name: "Brake Pads - Front", stock: 8, minStock: 15 },
    { name: "Air Filter", stock: 12, minStock: 25 },
    { name: "Spark Plug", stock: 18, minStock: 30 },
];

const upcomingServices = [
    {
        id: "SRV-001",
        customer: "Vikash Gupta",
        bike: "Hero Glamour",
        service: "General Service",
        time: "10:00 AM",
        mechanic: "Ravi Kumar",
    },
    {
        id: "SRV-002",
        customer: "Sunita Devi",
        bike: "Hero Destini 125",
        service: "Oil Change",
        time: "11:30 AM",
        mechanic: "Suresh Yadav",
    },
    {
        id: "SRV-003",
        customer: "Manoj Tiwari",
        bike: "Hero Xpulse 200",
        service: "Brake Repair",
        time: "2:00 PM",
        mechanic: "Ravi Kumar",
    },
];

export default function DashboardOverview() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-balance">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome back! Heres whats happening at your dealership
                        today.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Today
                    </Button>
                    <Button size="sm">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Reports
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stat.value}
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <span
                                    className={`flex items-center ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                                >
                                    {stat.trend === "up" ? (
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                    ) : (
                                        <TrendingDown className="h-3 w-3 mr-1" />
                                    )}
                                    {stat.change}
                                </span>
                                <span>{stat.description}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Sales */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            Latest bike sales and transactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentSales.map((sale) => (
                                <div
                                    key={sale.id}
                                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium">
                                                {sale.customer}
                                            </span>
                                            <Badge
                                                variant={
                                                    sale.status === "completed"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {sale.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {sale.bike}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {sale.time}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            {sale.amount}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {sale.id}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Services */}
                <Card>
                    <CardHeader>
                        <CardTitle>Todays Service Schedule</CardTitle>
                        <CardDescription>
                            Upcoming service appointments
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium">
                                                {service.customer}
                                            </span>
                                            <Badge variant="outline">
                                                {service.time}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {service.bike} - {service.service}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Mechanic: {service.mechanic}
                                        </p>
                                    </div>
                                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Low Stock Alert */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <span>Low Stock Alerts</span>
                    </CardTitle>
                    <CardDescription>
                        Parts and accessories running low
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {lowStockItems.map((item) => (
                            <div
                                key={item.name}
                                className="p-3 rounded-lg border border-border"
                            >
                                <h4 className="font-medium text-sm">
                                    {item.name}
                                </h4>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-muted-foreground">
                                        Stock: {item.stock}
                                    </span>
                                    <Badge
                                        variant="destructive"
                                        className="text-xs"
                                    >
                                        Low
                                    </Badge>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2 mt-2">
                                    <div
                                        className="bg-red-500 h-2 rounded-full"
                                        style={{
                                            width: `${(item.stock / item.minStock) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
