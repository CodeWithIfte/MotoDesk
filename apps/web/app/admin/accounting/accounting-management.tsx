"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Plus,
    Search,
    Filter,
    Download,
    Eye,
    Edit,
    Trash2,
    Calculator,
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard,
    Banknote,
    FileText,
    BarChart3,
    PieChart,
} from "lucide-react";

// Sample data
const vouchers = [
    {
        id: "V001",
        type: "Payment",
        date: "2024-01-15",
        amount: 25000,
        description: "Rent Payment",
        status: "Approved",
    },
    {
        id: "V002",
        type: "Receipt",
        date: "2024-01-16",
        amount: 150000,
        description: "Bike Sale - CB Shine",
        status: "Approved",
    },
    {
        id: "V003",
        type: "Journal",
        date: "2024-01-17",
        amount: 5000,
        description: "Depreciation Entry",
        status: "Pending",
    },
    {
        id: "V004",
        type: "Contra",
        date: "2024-01-18",
        amount: 50000,
        description: "Bank Transfer",
        status: "Approved",
    },
];

const ledgerAccounts = [
    {
        id: "L001",
        name: "Cash Account",
        type: "Asset",
        balance: 125000,
        lastTransaction: "2024-01-18",
    },
    {
        id: "L002",
        name: "Bank Account - SBI",
        type: "Asset",
        balance: 850000,
        lastTransaction: "2024-01-18",
    },
    {
        id: "L003",
        name: "Inventory - Bikes",
        type: "Asset",
        balance: 2500000,
        lastTransaction: "2024-01-17",
    },
    {
        id: "L004",
        name: "Accounts Receivable",
        type: "Asset",
        balance: 180000,
        lastTransaction: "2024-01-16",
    },
    {
        id: "L005",
        name: "Accounts Payable",
        type: "Liability",
        balance: 320000,
        lastTransaction: "2024-01-15",
    },
    {
        id: "L006",
        name: "Sales Revenue",
        type: "Income",
        balance: 1250000,
        lastTransaction: "2024-01-16",
    },
];

const bankTransactions = [
    {
        id: "BT001",
        date: "2024-01-15",
        description: "Rent Payment",
        debit: 25000,
        credit: 0,
        balance: 825000,
        reconciled: true,
    },
    {
        id: "BT002",
        date: "2024-01-16",
        description: "Customer Payment",
        debit: 0,
        credit: 150000,
        balance: 975000,
        reconciled: true,
    },
    {
        id: "BT003",
        date: "2024-01-17",
        description: "Supplier Payment",
        debit: 75000,
        credit: 0,
        balance: 900000,
        reconciled: false,
    },
    {
        id: "BT004",
        date: "2024-01-18",
        description: "Bank Charges",
        debit: 500,
        credit: 0,
        balance: 899500,
        reconciled: false,
    },
];

export function AccountingManagement() {
    const [activeTab, setActiveTab] = useState("vouchers");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedVoucherType, setSelectedVoucherType] = useState("all");
    const [isVoucherDialogOpen, setIsVoucherDialogOpen] = useState(false);
    const [isLedgerDialogOpen, setIsLedgerDialogOpen] = useState(false);

    const filteredVouchers = vouchers.filter((voucher) => {
        const matchesSearch =
            voucher.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            voucher.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType =
            selectedVoucherType === "all" ||
            voucher.type.toLowerCase() === selectedVoucherType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹12,50,000</div>
                        <p className="text-xs text-muted-foreground">
                            +8.2% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Expenses
                        </CardTitle>
                        <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹8,75,000</div>
                        <p className="text-xs text-muted-foreground">
                            +3.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Net Profit
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹3,75,000</div>
                        <p className="text-xs text-muted-foreground">
                            +12.5% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Bank Balance
                        </CardTitle>
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹8,99,500</div>
                        <p className="text-xs text-muted-foreground">
                            SBI Current Account
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
            >
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
                    <TabsTrigger value="ledger">Ledger</TabsTrigger>
                    <TabsTrigger value="bank">Bank Reconciliation</TabsTrigger>
                    <TabsTrigger value="reports">Financial Reports</TabsTrigger>
                    <TabsTrigger value="daybook">Day Book</TabsTrigger>
                    <TabsTrigger value="trial">Trial Balance</TabsTrigger>
                </TabsList>

                {/* Vouchers Tab */}
                <TabsContent value="vouchers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Voucher Management</CardTitle>
                                    <CardDescription>
                                        Create and manage accounting vouchers
                                    </CardDescription>
                                </div>
                                <Dialog
                                    open={isVoucherDialogOpen}
                                    onOpenChange={setIsVoucherDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            New Voucher
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Create New Voucher
                                            </DialogTitle>
                                            <DialogDescription>
                                                Enter voucher details
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="voucher-type">
                                                        Voucher Type
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="payment">
                                                                Payment Voucher
                                                            </SelectItem>
                                                            <SelectItem value="receipt">
                                                                Receipt Voucher
                                                            </SelectItem>
                                                            <SelectItem value="journal">
                                                                Journal Voucher
                                                            </SelectItem>
                                                            <SelectItem value="contra">
                                                                Contra Voucher
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="voucher-date">
                                                        Date
                                                    </Label>
                                                    <Input
                                                        id="voucher-date"
                                                        type="date"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="voucher-amount">
                                                    Amount
                                                </Label>
                                                <Input
                                                    id="voucher-amount"
                                                    type="number"
                                                    placeholder="Enter amount"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="voucher-description">
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id="voucher-description"
                                                    placeholder="Enter description"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="debit-account">
                                                        Debit Account
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select account" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="cash">
                                                                Cash Account
                                                            </SelectItem>
                                                            <SelectItem value="bank">
                                                                Bank Account
                                                            </SelectItem>
                                                            <SelectItem value="expense">
                                                                Expense Account
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="credit-account">
                                                        Credit Account
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select account" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="cash">
                                                                Cash Account
                                                            </SelectItem>
                                                            <SelectItem value="bank">
                                                                Bank Account
                                                            </SelectItem>
                                                            <SelectItem value="revenue">
                                                                Revenue Account
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsVoucherDialogOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setIsVoucherDialogOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Create Voucher
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search vouchers..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-8"
                                    />
                                </div>
                                <Select
                                    value={selectedVoucherType}
                                    onValueChange={setSelectedVoucherType}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Types
                                        </SelectItem>
                                        <SelectItem value="payment">
                                            Payment
                                        </SelectItem>
                                        <SelectItem value="receipt">
                                            Receipt
                                        </SelectItem>
                                        <SelectItem value="journal">
                                            Journal
                                        </SelectItem>
                                        <SelectItem value="contra">
                                            Contra
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Voucher ID</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredVouchers.map((voucher) => (
                                        <TableRow key={voucher.id}>
                                            <TableCell className="font-medium">
                                                {voucher.id}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {voucher.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {voucher.date}
                                            </TableCell>
                                            <TableCell>
                                                ₹
                                                {voucher.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {voucher.description}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        voucher.status ===
                                                        "Approved"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {voucher.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Ledger Tab */}
                <TabsContent value="ledger" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Ledger Accounts</CardTitle>
                                    <CardDescription>
                                        Manage chart of accounts and ledger
                                        balances
                                    </CardDescription>
                                </div>
                                <Dialog
                                    open={isLedgerDialogOpen}
                                    onOpenChange={setIsLedgerDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            New Account
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Create New Account
                                            </DialogTitle>
                                            <DialogDescription>
                                                Add a new ledger account
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="account-name">
                                                    Account Name
                                                </Label>
                                                <Input
                                                    id="account-name"
                                                    placeholder="Enter account name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="account-type">
                                                    Account Type
                                                </Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="asset">
                                                            Asset
                                                        </SelectItem>
                                                        <SelectItem value="liability">
                                                            Liability
                                                        </SelectItem>
                                                        <SelectItem value="equity">
                                                            Equity
                                                        </SelectItem>
                                                        <SelectItem value="income">
                                                            Income
                                                        </SelectItem>
                                                        <SelectItem value="expense">
                                                            Expense
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="opening-balance">
                                                    Opening Balance
                                                </Label>
                                                <Input
                                                    id="opening-balance"
                                                    type="number"
                                                    placeholder="Enter opening balance"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsLedgerDialogOpen(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setIsLedgerDialogOpen(false)
                                                }
                                            >
                                                Create Account
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Account ID</TableHead>
                                        <TableHead>Account Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Balance</TableHead>
                                        <TableHead>Last Transaction</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ledgerAccounts.map((account) => (
                                        <TableRow key={account.id}>
                                            <TableCell className="font-medium">
                                                {account.id}
                                            </TableCell>
                                            <TableCell>
                                                {account.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {account.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell
                                                className={
                                                    account.balance < 0
                                                        ? "text-red-600"
                                                        : "text-green-600"
                                                }
                                            >
                                                ₹
                                                {Math.abs(
                                                    account.balance
                                                ).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {account.lastTransaction}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Bank Reconciliation Tab */}
                <TabsContent value="bank" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bank Reconciliation</CardTitle>
                            <CardDescription>
                                Reconcile bank statements with book entries
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3 mb-6">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">
                                            Book Balance
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            ₹8,99,500
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">
                                            Bank Balance
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            ₹9,01,200
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">
                                            Difference
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-red-600">
                                            ₹1,700
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Debit</TableHead>
                                        <TableHead>Credit</TableHead>
                                        <TableHead>Balance</TableHead>
                                        <TableHead>Reconciled</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bankTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>
                                                {transaction.date}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.description}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.debit > 0
                                                    ? `₹${transaction.debit.toLocaleString()}`
                                                    : "-"}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.credit > 0
                                                    ? `₹${transaction.credit.toLocaleString()}`
                                                    : "-"}
                                            </TableCell>
                                            <TableCell>
                                                ₹
                                                {transaction.balance.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        transaction.reconciled
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {transaction.reconciled
                                                        ? "Reconciled"
                                                        : "Pending"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {!transaction.reconciled && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Reconcile
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Financial Reports Tab */}
                <TabsContent value="reports" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <BarChart3 className="h-5 w-5 text-blue-600" />
                                    <CardTitle className="text-lg">
                                        Profit & Loss
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Income statement for the period
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                >
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <PieChart className="h-5 w-5 text-green-600" />
                                    <CardTitle className="text-lg">
                                        Balance Sheet
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Financial position statement
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                >
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5 text-purple-600" />
                                    <CardTitle className="text-lg">
                                        Cash Flow
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Cash flow statement
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                >
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <Calculator className="h-5 w-5 text-orange-600" />
                                    <CardTitle className="text-lg">
                                        Trial Balance
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    List of all ledger balances
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                >
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <TrendingUp className="h-5 w-5 text-red-600" />
                                    <CardTitle className="text-lg">
                                        Sales Analysis
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Detailed sales performance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                >
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <CreditCard className="h-5 w-5 text-indigo-600" />
                                    <CardTitle className="text-lg">
                                        Expense Report
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Expense analysis and trends
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                >
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Day Book Tab */}
                <TabsContent value="daybook" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Day Book</CardTitle>
                            <CardDescription>
                                Daily transaction summary
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 mb-4">
                                <Input type="date" className="w-[180px]" />
                                <Button variant="outline">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-4">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-2xl font-bold">
                                                ₹2,45,000
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Total Receipts
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-2xl font-bold">
                                                ₹1,85,000
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Total Payments
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-2xl font-bold">
                                                ₹60,000
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Net Cash Flow
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-2xl font-bold">
                                                15
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Total Transactions
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Voucher No.</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Debit</TableHead>
                                            <TableHead>Credit</TableHead>
                                            <TableHead>Balance</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>09:30 AM</TableCell>
                                            <TableCell>V001</TableCell>
                                            <TableCell>
                                                Opening Balance
                                            </TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>₹8,39,500</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>10:15 AM</TableCell>
                                            <TableCell>V002</TableCell>
                                            <TableCell>
                                                Bike Sale - Splendor Plus
                                            </TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>₹85,000</TableCell>
                                            <TableCell>₹9,24,500</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>11:30 AM</TableCell>
                                            <TableCell>V003</TableCell>
                                            <TableCell>
                                                Supplier Payment
                                            </TableCell>
                                            <TableCell>₹45,000</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>₹8,79,500</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Trial Balance Tab */}
                <TabsContent value="trial" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Trial Balance</CardTitle>
                            <CardDescription>
                                Summary of all ledger account balances
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 mb-4">
                                <Input
                                    type="date"
                                    placeholder="From Date"
                                    className="w-[150px]"
                                />
                                <Input
                                    type="date"
                                    placeholder="To Date"
                                    className="w-[150px]"
                                />
                                <Button variant="outline">Generate</Button>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Account Name</TableHead>
                                        <TableHead>Account Type</TableHead>
                                        <TableHead className="text-right">
                                            Debit Balance
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Credit Balance
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Cash Account
                                        </TableCell>
                                        <TableCell>Asset</TableCell>
                                        <TableCell className="text-right">
                                            ₹1,25,000
                                        </TableCell>
                                        <TableCell className="text-right">
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Bank Account - SBI
                                        </TableCell>
                                        <TableCell>Asset</TableCell>
                                        <TableCell className="text-right">
                                            ₹8,50,000
                                        </TableCell>
                                        <TableCell className="text-right">
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Inventory - Bikes
                                        </TableCell>
                                        <TableCell>Asset</TableCell>
                                        <TableCell className="text-right">
                                            ₹25,00,000
                                        </TableCell>
                                        <TableCell className="text-right">
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Accounts Payable
                                        </TableCell>
                                        <TableCell>Liability</TableCell>
                                        <TableCell className="text-right">
                                            -
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ₹3,20,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Sales Revenue
                                        </TableCell>
                                        <TableCell>Income</TableCell>
                                        <TableCell className="text-right">
                                            -
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ₹12,50,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="border-t-2 font-bold">
                                        <TableCell colSpan={2}>Total</TableCell>
                                        <TableCell className="text-right">
                                            ₹34,75,000
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ₹34,75,000
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
