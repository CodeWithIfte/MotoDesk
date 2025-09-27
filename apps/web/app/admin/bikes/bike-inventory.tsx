"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
    Plus,
    Search,
    Filter,
    Eye,
    DollarSign,
    Package,
    Calculator,
    CreditCard,
    FileText,
    Truck,
    Printer,
    RotateCcw,
    CheckCircle,
    Tag,
    Edit,
} from "lucide-react";
import Link from "next/link";

// Demo data for bikes
const bikeModels = [
    "Hero Splendor Plus",
    "Hero Passion Pro",
    "Hero Glamour",
    "Hero Xtreme 160R",
    "Hero Xpulse 200",
    "Hero Destini 125",
    "Hero Pleasure Plus",
    "Hero Maestro Edge 125",
];

const bikeInventory = [
    {
        id: "BK001",
        model: "Hero Splendor Plus",
        vin: "ME4PC41A5JK123456",
        color: "Black",
        year: 2024,
        price: 75000,
        status: "available",
        dateAdded: "2024-01-15",
    },
    {
        id: "BK002",
        model: "Hero Xtreme 160R",
        vin: "ME4PC41A5JK123457",
        color: "Red",
        year: 2024,
        price: 115000,
        status: "sold",
        dateAdded: "2024-01-10",
        soldDate: "2024-01-20",
        customer: "Rajesh Kumar",
    },
    {
        id: "BK003",
        model: "Hero Passion Pro",
        vin: "ME4PC41A5JK123458",
        color: "Blue",
        year: 2024,
        price: 68000,
        status: "available",
        dateAdded: "2024-01-12",
    },
    {
        id: "BK004",
        model: "Hero Glamour",
        vin: "ME4PC41A5JK123459",
        color: "Silver",
        year: 2024,
        price: 82000,
        status: "reserved",
        dateAdded: "2024-01-18",
        customer: "Priya Sharma",
    },
    {
        id: "BK005",
        model: "Hero Xpulse 200",
        vin: "ME4PC41A5JK123460",
        color: "Orange",
        year: 2024,
        price: 145000,
        status: "available",
        dateAdded: "2024-01-14",
    },
];

const recentSales = [
    {
        id: "INV-001",
        bikeId: "BK002",
        customer: "Rajesh Kumar",
        phone: "+91 9876543210",
        model: "Hero Xtreme 160R",
        amount: 115000,
        paymentMethod: "Cash",
        saleDate: "2024-01-20",
        status: "completed",
    },
    {
        id: "INV-002",
        bikeId: "BK006",
        customer: "Amit Singh",
        phone: "+91 9876543211",
        model: "Hero Passion Pro",
        amount: 68000,
        paymentMethod: "Bkash",
        saleDate: "2024-01-19",
        status: "completed",
    },
    {
        id: "INV-003",
        bikeId: "BK007",
        customer: "Sunita Devi",
        phone: "+91 9876543212",
        model: "Hero Destini 125",
        amount: 85000,
        paymentMethod: "Nagad",
        saleDate: "2024-01-18",
        status: "pending",
    },
];

export function BikeInventory() {
    const [activeTab, setActiveTab] = useState("inventory");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isAddBikeOpen, setIsAddBikeOpen] = useState(false);
    const [isSellBikeOpen, setIsSellBikeOpen] = useState(false);
    const [selectedBike, setSelectedBike] = useState<any>(null);

    const [isQuotationOpen, setIsQuotationOpen] = useState(false);
    const [isChallanOpen, setIsChallanOpen] = useState(false);
    const [isGatePassOpen, setIsGatePassOpen] = useState(false);
    const [isReturnOpen, setIsReturnOpen] = useState(false);
    const [isDiscountOpen, setIsDiscountOpen] = useState(false);

    const [paymentType, setPaymentType] = useState("full");
    const [downPayment, setDownPayment] = useState("");
    const [emiMonths, setEmiMonths] = useState("12");
    const [interestRate] = useState(12); // Fixed 12% annual interest rate

    const [discountType, setDiscountType] = useState("percentage");
    const [discountValue, setDiscountValue] = useState("");
    const [offerDescription, setOfferDescription] = useState("");

    const calculateEMI = (principal: number, rate: number, months: number) => {
        const monthlyRate = rate / (12 * 100);
        const emi =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
        return Math.round(emi);
    };

    const getEMIDetails = () => {
        if (!selectedBike || paymentType === "full") return null;

        const bikePrice = selectedBike.price;
        const downPaymentAmount = Number.parseFloat(downPayment) || 0;
        const loanAmount = bikePrice - downPaymentAmount;
        const months = Number.parseInt(emiMonths);

        if (loanAmount <= 0) return null;

        const emiAmount = calculateEMI(loanAmount, interestRate, months);
        const totalAmount = emiAmount * months;
        const totalInterest = totalAmount - loanAmount;

        return {
            bikePrice,
            downPaymentAmount,
            loanAmount,
            months,
            emiAmount,
            totalAmount,
            totalInterest,
            totalPayable: downPaymentAmount + totalAmount,
        };
    };

    const filteredBikes = bikeInventory.filter((bike) => {
        const matchesSearch =
            bike.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bike.vin.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || bike.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "available":
                return "default";
            case "sold":
                return "secondary";
            case "reserved":
                return "outline";
            default:
                return "default";
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-balance">
                        Bike Sales Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your bike inventory, sales, and transactions
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsQuotationOpen(true)}
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Create Quotation
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setIsChallanOpen(true)}
                    >
                        <Truck className="h-4 w-4 mr-2" />
                        Delivery Challan
                    </Button>
                    <Dialog
                        open={isAddBikeOpen}
                        onOpenChange={setIsAddBikeOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add New Bike
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>
                                    Add New Bike to Inventory
                                </DialogTitle>
                                <DialogDescription>
                                    Enter the details of the new bike to add to
                                    your inventory.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="model">Bike Model</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select bike model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bikeModels.map((model) => (
                                                <SelectItem
                                                    key={model}
                                                    value={model}
                                                >
                                                    {model}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vin">VIN Number</Label>
                                    <Input
                                        id="vin"
                                        placeholder="ME4PC41A5JK123456"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="color">Color</Label>
                                    <Input
                                        id="color"
                                        placeholder="Black, Red, Blue..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (₹)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="75000"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsAddBikeOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => setIsAddBikeOpen(false)}
                                    >
                                        Add Bike
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Bikes
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {bikeInventory.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            In inventory
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Available
                        </CardTitle>
                        <Package className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                bikeInventory.filter(
                                    (b) => b.status === "available"
                                ).length
                            }
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Ready to sell
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Sold This Month
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                bikeInventory.filter((b) => b.status === "sold")
                                    .length
                            }
                        </div>
                        <p className="text-xs text-muted-foreground">
                            ₹2,68,000 revenue
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Reserved
                        </CardTitle>
                        <Package className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                bikeInventory.filter(
                                    (b) => b.status === "reserved"
                                ).length
                            }
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Pending sale
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="sales">Recent Sales</TabsTrigger>
                    <TabsTrigger value="emi">EMI Tracking</TabsTrigger>
                    <TabsTrigger value="quotations">Quotations</TabsTrigger>
                    <TabsTrigger value="returns">
                        Returns & Exchanges
                    </TabsTrigger>
                    <TabsTrigger value="offers">Discounts & Offers</TabsTrigger>
                </TabsList>

                <TabsContent value="inventory" className="space-y-4">
                    {/* Filters */}
                    <div className="flex items-center space-x-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by model or VIN..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-40">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="available">
                                    Available
                                </SelectItem>
                                <SelectItem value="sold">Sold</SelectItem>
                                <SelectItem value="reserved">
                                    Reserved
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Inventory Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBikes.map((bike) => (
                            <Card key={bike.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">
                                            {bike.model}
                                        </CardTitle>
                                        <Badge
                                            variant={getStatusColor(
                                                bike.status
                                            )}
                                        >
                                            {bike.status}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        VIN: {bike.vin}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Color:
                                            </span>
                                            <span className="text-sm font-medium">
                                                {bike.color}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Year:
                                            </span>
                                            <span className="text-sm font-medium">
                                                {bike.year}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Price:
                                            </span>
                                            <span className="text-sm font-bold">
                                                ₹{bike.price.toLocaleString()}
                                            </span>
                                        </div>
                                        {bike.customer && (
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">
                                                    Customer:
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {bike.customer}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-1" />
                                            View
                                        </Button>
                                        {bike.status === "available" && (
                                            <Dialog
                                                open={isSellBikeOpen}
                                                onOpenChange={setIsSellBikeOpen}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedBike(
                                                                bike
                                                            );
                                                            setPaymentType(
                                                                "full"
                                                            );
                                                            setDownPayment("");
                                                            setEmiMonths("12");
                                                        }}
                                                    >
                                                        <DollarSign className="h-4 w-4 mr-1" />
                                                        Sell
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Sell Bike -{" "}
                                                            {
                                                                selectedBike?.model
                                                            }
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Complete the sale
                                                            with flexible
                                                            payment options
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-6">
                                                        {/* Customer Information */}
                                                        <div className="space-y-4">
                                                            <h3 className="text-lg font-semibold">
                                                                Customer
                                                                Information
                                                            </h3>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="customer-name">
                                                                        Customer
                                                                        Name
                                                                    </Label>
                                                                    <Input
                                                                        id="customer-name"
                                                                        placeholder="Enter customer name"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="customer-phone">
                                                                        Phone
                                                                        Number
                                                                    </Label>
                                                                    <Input
                                                                        id="customer-phone"
                                                                        placeholder="+91 9876543210"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="customer-address">
                                                                    Address
                                                                </Label>
                                                                <Input
                                                                    id="customer-address"
                                                                    placeholder="Enter customer address"
                                                                />
                                                            </div>
                                                        </div>

                                                        <Separator />

                                                        {/* Payment Options */}
                                                        <div className="space-y-4">
                                                            <h3 className="text-lg font-semibold">
                                                                Payment Options
                                                            </h3>
                                                            <RadioGroup
                                                                value={
                                                                    paymentType
                                                                }
                                                                onValueChange={
                                                                    setPaymentType
                                                                }
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="full"
                                                                        id="full"
                                                                    />
                                                                    <Label
                                                                        htmlFor="full"
                                                                        className="flex items-center"
                                                                    >
                                                                        <DollarSign className="h-4 w-4 mr-2" />
                                                                        Full
                                                                        Payment
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="emi"
                                                                        id="emi"
                                                                    />
                                                                    <Label
                                                                        htmlFor="emi"
                                                                        className="flex items-center"
                                                                    >
                                                                        <CreditCard className="h-4 w-4 mr-2" />
                                                                        EMI
                                                                        (Down
                                                                        Payment
                                                                        +
                                                                        Monthly
                                                                        Installments)
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </div>

                                                        {/* EMI Configuration */}
                                                        {paymentType ===
                                                            "emi" && (
                                                            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                                                                <h4 className="font-semibold flex items-center">
                                                                    <Calculator className="h-4 w-4 mr-2" />
                                                                    EMI
                                                                    Configuration
                                                                </h4>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="down-payment">
                                                                            Down
                                                                            Payment
                                                                            (₹)
                                                                        </Label>
                                                                        <Input
                                                                            id="down-payment"
                                                                            type="number"
                                                                            placeholder="20000"
                                                                            value={
                                                                                downPayment
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setDownPayment(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                        <p className="text-xs text-muted-foreground">
                                                                            Minimum:
                                                                            ₹
                                                                            {Math.round(
                                                                                selectedBike?.price *
                                                                                    0.1
                                                                            ).toLocaleString()}{" "}
                                                                            (10%)
                                                                        </p>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="emi-months">
                                                                            EMI
                                                                            Duration
                                                                        </Label>
                                                                        <Select
                                                                            value={
                                                                                emiMonths
                                                                            }
                                                                            onValueChange={
                                                                                setEmiMonths
                                                                            }
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="6">
                                                                                    6
                                                                                    Months
                                                                                </SelectItem>
                                                                                <SelectItem value="12">
                                                                                    12
                                                                                    Months
                                                                                </SelectItem>
                                                                                <SelectItem value="18">
                                                                                    18
                                                                                    Months
                                                                                </SelectItem>
                                                                                <SelectItem value="24">
                                                                                    24
                                                                                    Months
                                                                                </SelectItem>
                                                                                <SelectItem value="36">
                                                                                    36
                                                                                    Months
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </div>

                                                                {/* EMI Calculation Display */}
                                                                {(() => {
                                                                    const emiDetails =
                                                                        getEMIDetails();
                                                                    if (
                                                                        !emiDetails
                                                                    )
                                                                        return null;

                                                                    return (
                                                                        <div className="space-y-3 p-4 bg-background rounded-lg border">
                                                                            <h5 className="font-semibold">
                                                                                EMI
                                                                                Calculation
                                                                                Summary
                                                                            </h5>
                                                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                                                <div className="space-y-2">
                                                                                    <div className="flex justify-between">
                                                                                        <span>
                                                                                            Bike
                                                                                            Price:
                                                                                        </span>
                                                                                        <span className="font-medium">
                                                                                            ₹
                                                                                            {emiDetails.bikePrice.toLocaleString()}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between">
                                                                                        <span>
                                                                                            Down
                                                                                            Payment:
                                                                                        </span>
                                                                                        <span className="font-medium">
                                                                                            ₹
                                                                                            {emiDetails.downPaymentAmount.toLocaleString()}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between">
                                                                                        <span>
                                                                                            Loan
                                                                                            Amount:
                                                                                        </span>
                                                                                        <span className="font-medium">
                                                                                            ₹
                                                                                            {emiDetails.loanAmount.toLocaleString()}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between">
                                                                                        <span>
                                                                                            Interest
                                                                                            Rate:
                                                                                        </span>
                                                                                        <span className="font-medium">
                                                                                            {
                                                                                                interestRate
                                                                                            }
                                                                                            %
                                                                                            p.a.
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                    <div className="flex justify-between">
                                                                                        <span>
                                                                                            EMI
                                                                                            Duration:
                                                                                        </span>
                                                                                        <span className="font-medium">
                                                                                            {
                                                                                                emiDetails.months
                                                                                            }{" "}
                                                                                            months
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between">
                                                                                        <span>
                                                                                            Monthly
                                                                                            EMI:
                                                                                        </span>
                                                                                        <span className="font-bold text-primary">
                                                                                            ₹
                                                                                            {emiDetails.emiAmount.toLocaleString()}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between">
                                                                                        <span>
                                                                                            Total
                                                                                            Interest:
                                                                                        </span>
                                                                                        <span className="font-medium">
                                                                                            ₹
                                                                                            {emiDetails.totalInterest.toLocaleString()}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between border-t pt-2">
                                                                                        <span>
                                                                                            Total
                                                                                            Payable:
                                                                                        </span>
                                                                                        <span className="font-bold">
                                                                                            ₹
                                                                                            {emiDetails.totalPayable.toLocaleString()}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </div>
                                                        )}

                                                        {/* Payment Method */}
                                                        <div className="space-y-2">
                                                            <Label htmlFor="payment-method">
                                                                {paymentType ===
                                                                "full"
                                                                    ? "Payment Method"
                                                                    : "Down Payment Method"}
                                                            </Label>
                                                            <Select>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select payment method" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="cash">
                                                                        Cash
                                                                    </SelectItem>
                                                                    <SelectItem value="bkash">
                                                                        Bkash
                                                                    </SelectItem>
                                                                    <SelectItem value="nagad">
                                                                        Nagad
                                                                    </SelectItem>
                                                                    <SelectItem value="bank">
                                                                        Bank
                                                                        Transfer
                                                                    </SelectItem>
                                                                    <SelectItem value="card">
                                                                        Credit/Debit
                                                                        Card
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="flex justify-end space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                onClick={() =>
                                                                    setIsSellBikeOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    setIsSellBikeOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                {paymentType ===
                                                                "full"
                                                                    ? "Complete Sale & Generate Invoice"
                                                                    : "Setup EMI & Generate Agreement"}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Recent Sales Tab */}
                <TabsContent value="sales" className="space-y-4">
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
                                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">
                                                    {sale.customer}
                                                </span>
                                                <Badge
                                                    variant={
                                                        sale.status ===
                                                        "completed"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {sale.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {sale.model}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {sale.phone} •{" "}
                                                {sale.paymentMethod} •{" "}
                                                {sale.saleDate}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">
                                                ₹{sale.amount.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {sale.id}
                                            </p>
                                        </div>
                                        <div className="ml-4">
                                            <Link href={`/invoice/${sale.id}`}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Invoice
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* EMI Tracking Tab */}
                <TabsContent value="emi" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>EMI Tracking</CardTitle>
                            <CardDescription>
                                Monitor customer EMI payments and outstanding
                                amounts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Demo EMI data */}
                                {[
                                    {
                                        id: "EMI-001",
                                        customer: "Rajesh Kumar",
                                        phone: "+91 9876543210",
                                        model: "Hero Xtreme 160R",
                                        bikePrice: 115000,
                                        downPayment: 25000,
                                        loanAmount: 90000,
                                        emiAmount: 8167,
                                        totalMonths: 12,
                                        paidMonths: 3,
                                        nextDueDate: "2024-02-15",
                                        status: "active",
                                    },
                                    {
                                        id: "EMI-002",
                                        customer: "Priya Sharma",
                                        phone: "+91 9876543211",
                                        model: "Hero Xpulse 200",
                                        bikePrice: 145000,
                                        downPayment: 30000,
                                        loanAmount: 115000,
                                        emiAmount: 5391,
                                        totalMonths: 24,
                                        paidMonths: 8,
                                        nextDueDate: "2024-02-20",
                                        status: "active",
                                    },
                                    {
                                        id: "EMI-003",
                                        customer: "Amit Singh",
                                        phone: "+91 9876543212",
                                        model: "Hero Glamour",
                                        bikePrice: 82000,
                                        downPayment: 15000,
                                        loanAmount: 67000,
                                        emiAmount: 6083,
                                        totalMonths: 12,
                                        paidMonths: 12,
                                        nextDueDate: "Completed",
                                        status: "completed",
                                    },
                                ].map((emi) => (
                                    <div
                                        key={emi.id}
                                        className="p-4 rounded-lg border border-border"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <span className="font-medium">
                                                        {emi.customer}
                                                    </span>
                                                    <Badge
                                                        variant={
                                                            emi.status ===
                                                            "completed"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className="ml-2"
                                                    >
                                                        {emi.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">
                                                    ₹
                                                    {emi.emiAmount.toLocaleString()}
                                                    /month
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {emi.id}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Model
                                                </p>
                                                <p className="font-medium">
                                                    {emi.model}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Progress
                                                </p>
                                                <p className="font-medium">
                                                    {emi.paidMonths}/
                                                    {emi.totalMonths} months
                                                </p>
                                                <div className="w-full bg-muted rounded-full h-2 mt-1">
                                                    <div
                                                        className="bg-primary h-2 rounded-full"
                                                        style={{
                                                            width: `${(emi.paidMonths / emi.totalMonths) * 100}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Outstanding
                                                </p>
                                                <p className="font-medium">
                                                    ₹
                                                    {(
                                                        (emi.totalMonths -
                                                            emi.paidMonths) *
                                                        emi.emiAmount
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Next Due
                                                </p>
                                                <p className="font-medium">
                                                    {emi.nextDueDate}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-3 space-x-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-1" />
                                                View Details
                                            </Button>
                                            {emi.status === "active" && (
                                                <Button size="sm">
                                                    <DollarSign className="h-4 w-4 mr-1" />
                                                    Record Payment
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="quotations" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Quotations</CardTitle>
                                    <CardDescription>
                                        Manage customer quotations and price
                                        estimates
                                    </CardDescription>
                                </div>
                                <Button
                                    onClick={() => setIsQuotationOpen(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Quotation
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        id: "QUO-001",
                                        customer: "Rajesh Kumar",
                                        phone: "+91 9876543210",
                                        model: "Hero Xtreme 160R",
                                        basePrice: 115000,
                                        discount: 5000,
                                        finalPrice: 110000,
                                        validUntil: "2024-02-15",
                                        status: "pending",
                                    },
                                    {
                                        id: "QUO-002",
                                        customer: "Priya Sharma",
                                        phone: "+91 9876543211",
                                        model: "Hero Xpulse 200",
                                        basePrice: 145000,
                                        discount: 8000,
                                        finalPrice: 137000,
                                        validUntil: "2024-02-20",
                                        status: "accepted",
                                    },
                                ].map((quotation) => (
                                    <div
                                        key={quotation.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">
                                                    {quotation.customer}
                                                </span>
                                                <Badge
                                                    variant={
                                                        quotation.status ===
                                                        "accepted"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {quotation.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {quotation.model}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {quotation.phone} • Valid until{" "}
                                                {quotation.validUntil}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">
                                                ₹
                                                {quotation.finalPrice.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground line-through">
                                                ₹
                                                {quotation.basePrice.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-green-600">
                                                Save ₹
                                                {quotation.discount.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="ml-4 space-x-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Printer className="h-4 w-4 mr-1" />
                                                Print
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="returns" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Returns & Exchanges</CardTitle>
                                    <CardDescription>
                                        Manage bike returns, replacements, and
                                        price adjustments
                                    </CardDescription>
                                </div>
                                <Button onClick={() => setIsReturnOpen(true)}>
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Process Return
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        id: "RET-001",
                                        originalSale: "INV-001",
                                        customer: "Rajesh Kumar",
                                        model: "Hero Xtreme 160R",
                                        reason: "Color preference change",
                                        type: "exchange",
                                        newModel: "Hero Xtreme 160R (Blue)",
                                        priceDifference: 0,
                                        status: "approved",
                                        date: "2024-01-25",
                                    },
                                    {
                                        id: "RET-002",
                                        originalSale: "INV-003",
                                        customer: "Sunita Devi",
                                        model: "Hero Destini 125",
                                        reason: "Manufacturing defect",
                                        type: "return",
                                        refundAmount: 85000,
                                        status: "processing",
                                        date: "2024-01-24",
                                    },
                                ].map((returnItem) => (
                                    <div
                                        key={returnItem.id}
                                        className="p-4 rounded-lg border border-border"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <span className="font-medium">
                                                        {returnItem.customer}
                                                    </span>
                                                    <Badge
                                                        variant={
                                                            returnItem.status ===
                                                            "approved"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className="ml-2"
                                                    >
                                                        {returnItem.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">
                                                    {returnItem.type ===
                                                    "return"
                                                        ? "Return"
                                                        : "Exchange"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {returnItem.id}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Original Model
                                                </p>
                                                <p className="font-medium">
                                                    {returnItem.model}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Reason
                                                </p>
                                                <p className="font-medium">
                                                    {returnItem.reason}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">
                                                    {returnItem.type ===
                                                    "return"
                                                        ? "Refund Amount"
                                                        : "New Model"}
                                                </p>
                                                <p className="font-medium">
                                                    {returnItem.type ===
                                                    "return"
                                                        ? `₹${returnItem.refundAmount?.toLocaleString()}`
                                                        : returnItem.newModel}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Date
                                                </p>
                                                <p className="font-medium">
                                                    {returnItem.date}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-3 space-x-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-1" />
                                                View Details
                                            </Button>
                                            {returnItem.status ===
                                                "processing" && (
                                                <Button size="sm">
                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                    Approve
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="offers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Discounts & Offers</CardTitle>
                                    <CardDescription>
                                        Manage promotional offers and discount
                                        schemes
                                    </CardDescription>
                                </div>
                                <Button onClick={() => setIsDiscountOpen(true)}>
                                    <Tag className="h-4 w-4 mr-2" />
                                    Create Offer
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        id: "OFF-001",
                                        title: "Festival Special",
                                        description:
                                            "Diwali special discount on all Hero bikes",
                                        type: "percentage",
                                        value: 10,
                                        applicableModels: ["All Models"],
                                        validFrom: "2024-01-01",
                                        validUntil: "2024-01-31",
                                        status: "active",
                                        usedCount: 15,
                                    },
                                    {
                                        id: "OFF-002",
                                        title: "Student Discount",
                                        description:
                                            "Special discount for students with valid ID",
                                        type: "amount",
                                        value: 5000,
                                        applicableModels: [
                                            "Hero Splendor Plus",
                                            "Hero Passion Pro",
                                        ],
                                        validFrom: "2024-01-15",
                                        validUntil: "2024-03-15",
                                        status: "active",
                                        usedCount: 8,
                                    },
                                ].map((offer) => (
                                    <div
                                        key={offer.id}
                                        className="p-4 rounded-lg border border-border"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <span className="font-medium">
                                                        {offer.title}
                                                    </span>
                                                    <Badge
                                                        variant={
                                                            offer.status ===
                                                            "active"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className="ml-2"
                                                    >
                                                        {offer.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">
                                                    {offer.type === "percentage"
                                                        ? `${offer.value}% OFF`
                                                        : `₹${offer.value.toLocaleString()} OFF`}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Used {offer.usedCount} times
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground mb-3">
                                            {offer.description}
                                        </p>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Applicable Models
                                                </p>
                                                <p className="font-medium">
                                                    {offer.applicableModels.join(
                                                        ", "
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Valid From
                                                </p>
                                                <p className="font-medium">
                                                    {offer.validFrom}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Valid Until
                                                </p>
                                                <p className="font-medium">
                                                    {offer.validUntil}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-3 space-x-2">
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-1" />
                                                View Usage
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isQuotationOpen} onOpenChange={setIsQuotationOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create Quotation</DialogTitle>
                        <DialogDescription>
                            Generate a price quotation for customer
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="quote-customer">
                                    Customer Name
                                </Label>
                                <Input
                                    id="quote-customer"
                                    placeholder="Enter customer name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quote-phone">
                                    Phone Number
                                </Label>
                                <Input
                                    id="quote-phone"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quote-model">Bike Model</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select bike model" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bikeModels.map((model) => (
                                        <SelectItem key={model} value={model}>
                                            {model}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="quote-price">
                                    Base Price (₹)
                                </Label>
                                <Input
                                    id="quote-price"
                                    type="number"
                                    placeholder="115000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quote-discount">
                                    Discount (₹)
                                </Label>
                                <Input
                                    id="quote-discount"
                                    type="number"
                                    placeholder="5000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quote-valid">Valid Until</Label>
                                <Input id="quote-valid" type="date" />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsQuotationOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => setIsQuotationOpen(false)}>
                                Generate Quotation
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isChallanOpen} onOpenChange={setIsChallanOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Generate Delivery Challan</DialogTitle>
                        <DialogDescription>
                            Create delivery challan with dispatch details
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="challan-invoice">
                                    Invoice Number
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select invoice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {recentSales.map((sale) => (
                                            <SelectItem
                                                key={sale.id}
                                                value={sale.id}
                                            >
                                                {sale.id} - {sale.customer}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="challan-date">
                                    Delivery Date
                                </Label>
                                <Input id="challan-date" type="date" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="challan-address">
                                Delivery Address
                            </Label>
                            <Input
                                id="challan-address"
                                placeholder="Enter delivery address"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="challan-driver">
                                    Driver Name
                                </Label>
                                <Input
                                    id="challan-driver"
                                    placeholder="Enter driver name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="challan-vehicle">
                                    Vehicle Number
                                </Label>
                                <Input
                                    id="challan-vehicle"
                                    placeholder="Enter vehicle number"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="challan-notes">
                                Special Instructions
                            </Label>
                            <Input
                                id="challan-notes"
                                placeholder="Any special delivery instructions"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsChallanOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => setIsChallanOpen(false)}>
                                Generate Challan
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isReturnOpen} onOpenChange={setIsReturnOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Process Return/Exchange</DialogTitle>
                        <DialogDescription>
                            Handle bike returns, replacements, and price
                            adjustments
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="return-invoice">
                                Original Invoice
                            </Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select original invoice" />
                                </SelectTrigger>
                                <SelectContent>
                                    {recentSales.map((sale) => (
                                        <SelectItem
                                            key={sale.id}
                                            value={sale.id}
                                        >
                                            {sale.id} - {sale.customer} -{" "}
                                            {sale.model}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="return-type">Return Type</Label>
                            <RadioGroup defaultValue="return">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="return"
                                        id="return"
                                    />
                                    <Label htmlFor="return">
                                        Full Return (Refund)
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="exchange"
                                        id="exchange"
                                    />
                                    <Label htmlFor="exchange">
                                        Exchange (Different Model/Color)
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="adjustment"
                                        id="adjustment"
                                    />
                                    <Label htmlFor="adjustment">
                                        Price Adjustment
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="return-reason">
                                Reason for Return
                            </Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select reason" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="defect">
                                        Manufacturing Defect
                                    </SelectItem>
                                    <SelectItem value="color">
                                        Color Preference
                                    </SelectItem>
                                    <SelectItem value="model">
                                        Model Change
                                    </SelectItem>
                                    <SelectItem value="damage">
                                        Damage in Transit
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="return-notes">
                                Additional Notes
                            </Label>
                            <Input
                                id="return-notes"
                                placeholder="Enter additional details"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsReturnOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => setIsReturnOpen(false)}>
                                Process Return
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isDiscountOpen} onOpenChange={setIsDiscountOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create Discount Offer</DialogTitle>
                        <DialogDescription>
                            Set up promotional offers and discount schemes
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="offer-title">Offer Title</Label>
                                <Input
                                    id="offer-title"
                                    placeholder="Festival Special"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="offer-code">Offer Code</Label>
                                <Input
                                    id="offer-code"
                                    placeholder="FESTIVAL2024"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="offer-description">
                                Description
                            </Label>
                            <Input
                                id="offer-description"
                                placeholder="Special discount for festival season"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="discount-type">
                                    Discount Type
                                </Label>
                                <Select
                                    value={discountType}
                                    onValueChange={setDiscountType}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percentage">
                                            Percentage (%)
                                        </SelectItem>
                                        <SelectItem value="amount">
                                            Fixed Amount (₹)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="discount-value">
                                    {discountType === "percentage"
                                        ? "Percentage"
                                        : "Amount (₹)"}
                                </Label>
                                <Input
                                    id="discount-value"
                                    type="number"
                                    placeholder={
                                        discountType === "percentage"
                                            ? "10"
                                            : "5000"
                                    }
                                    value={discountValue}
                                    onChange={(e) =>
                                        setDiscountValue(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="max-usage">Max Usage</Label>
                                <Input
                                    id="max-usage"
                                    type="number"
                                    placeholder="100"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="valid-from">Valid From</Label>
                                <Input id="valid-from" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="valid-until">Valid Until</Label>
                                <Input id="valid-until" type="date" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="applicable-models">
                                Applicable Models
                            </Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select applicable models" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Models
                                    </SelectItem>
                                    {bikeModels.map((model) => (
                                        <SelectItem key={model} value={model}>
                                            {model}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsDiscountOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => setIsDiscountOpen(false)}>
                                Create Offer
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
