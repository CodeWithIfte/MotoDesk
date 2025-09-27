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
import { Progress } from "@/components/ui/progress";
import {
    Search,
    Download,
    Eye,
    Edit,
    Plus,
    MessageSquare,
    Phone,
    Users,
    Target,
    TrendingUp,
    Send,
    UserPlus,
    Star,
    Clock,
    CheckCircle,
    BarChart3,
    Settings,
} from "lucide-react";

// Sample data
const leads = [
    {
        id: "L001",
        name: "Arjun Patel",
        email: "arjun@email.com",
        phone: "+91 9876543210",
        source: "Website",
        status: "Hot",
        interestedModel: "CB Shine",
        assignedTo: "Rajesh Kumar",
        lastContact: "2024-01-30",
        score: 85,
    },
    {
        id: "L002",
        name: "Meera Singh",
        email: "meera@email.com",
        phone: "+91 9876543211",
        source: "Walk-in",
        status: "Warm",
        interestedModel: "Splendor Plus",
        assignedTo: "Priya Sharma",
        lastContact: "2024-01-29",
        score: 70,
    },
    {
        id: "L003",
        name: "Vikram Gupta",
        email: "vikram@email.com",
        phone: "+91 9876543212",
        source: "Referral",
        status: "Cold",
        interestedModel: "Passion Pro",
        assignedTo: "Rajesh Kumar",
        lastContact: "2024-01-25",
        score: 45,
    },
];

const campaigns = [
    {
        id: "C001",
        name: "New Year Sale 2024",
        type: "SMS",
        status: "Active",
        recipients: 1250,
        sent: 1250,
        delivered: 1198,
        opened: 856,
        clicked: 234,
        startDate: "2024-01-01",
        endDate: "2024-01-31",
    },
    {
        id: "C002",
        name: "Service Reminder Campaign",
        type: "Email",
        status: "Completed",
        recipients: 850,
        sent: 850,
        delivered: 832,
        opened: 645,
        clicked: 187,
        startDate: "2024-01-15",
        endDate: "2024-01-30",
    },
    {
        id: "C003",
        name: "Festival Offers",
        type: "WhatsApp",
        status: "Scheduled",
        recipients: 2000,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        startDate: "2024-02-10",
        endDate: "2024-02-20",
    },
];

const communications = [
    {
        id: "COM001",
        customerId: "CUST001",
        customerName: "Rahul Sharma",
        type: "Email",
        subject: "Service Reminder",
        status: "Sent",
        sentBy: "System",
        sentDate: "2024-01-30",
        opened: true,
    },
    {
        id: "COM002",
        customerId: "CUST002",
        customerName: "Anjali Verma",
        type: "SMS",
        subject: "Payment Reminder",
        status: "Delivered",
        sentBy: "Rajesh Kumar",
        sentDate: "2024-01-30",
        opened: false,
    },
    {
        id: "COM003",
        customerId: "CUST003",
        customerName: "Suresh Patel",
        type: "Call",
        subject: "Follow-up Call",
        status: "Completed",
        sentBy: "Priya Sharma",
        sentDate: "2024-01-29",
        opened: true,
    },
];

const customerSegments = [
    {
        name: "VIP Customers",
        count: 125,
        criteria: "Purchase > ₹2L",
        color: "bg-purple-500",
    },
    {
        name: "Regular Customers",
        count: 850,
        criteria: "2+ Purchases",
        color: "bg-blue-500",
    },
    {
        name: "New Customers",
        count: 320,
        criteria: "First Purchase",
        color: "bg-green-500",
    },
    {
        name: "Inactive Customers",
        count: 180,
        criteria: "No Purchase 6M+",
        color: "bg-orange-500",
    },
];

export function CRMManagement() {
    const [activeTab, setActiveTab] = useState("leads");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false);
    const [isCampaignDialogOpen, setIsCampaignDialogOpen] = useState(false);
    const [isBulkMessageDialogOpen, setIsBulkMessageDialogOpen] =
        useState(false);

    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone.includes(searchTerm);
        const matchesStatus =
            selectedStatus === "all" ||
            lead.status.toLowerCase() === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Leads
                        </CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,245</div>
                        <p className="text-xs text-muted-foreground">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Conversion Rate
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24.5%</div>
                        <p className="text-xs text-muted-foreground">
                            +3.2% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Campaigns
                        </CardTitle>
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            2 scheduled
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Customer Satisfaction
                        </CardTitle>
                        <Star className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.8/5</div>
                        <p className="text-xs text-muted-foreground">
                            Based on 156 reviews
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
                    <TabsTrigger value="leads">Lead Management</TabsTrigger>
                    <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                    <TabsTrigger value="communications">
                        Communications
                    </TabsTrigger>
                    <TabsTrigger value="segments">
                        Customer Segments
                    </TabsTrigger>
                    <TabsTrigger value="analytics">CRM Analytics</TabsTrigger>
                    <TabsTrigger value="automation">Automation</TabsTrigger>
                </TabsList>

                {/* Lead Management Tab */}
                <TabsContent value="leads" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Lead Management</CardTitle>
                                    <CardDescription>
                                        Track and manage sales leads and
                                        prospects
                                    </CardDescription>
                                </div>
                                <Dialog
                                    open={isLeadDialogOpen}
                                    onOpenChange={setIsLeadDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Add Lead
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Add New Lead
                                            </DialogTitle>
                                            <DialogDescription>
                                                Enter lead information
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="lead-name">
                                                        Full Name
                                                    </Label>
                                                    <Input
                                                        id="lead-name"
                                                        placeholder="Enter full name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lead-phone">
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        id="lead-phone"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lead-email">
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="lead-email"
                                                    type="email"
                                                    placeholder="Enter email address"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="lead-source">
                                                        Lead Source
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select source" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="website">
                                                                Website
                                                            </SelectItem>
                                                            <SelectItem value="walk-in">
                                                                Walk-in
                                                            </SelectItem>
                                                            <SelectItem value="referral">
                                                                Referral
                                                            </SelectItem>
                                                            <SelectItem value="social-media">
                                                                Social Media
                                                            </SelectItem>
                                                            <SelectItem value="advertisement">
                                                                Advertisement
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lead-model">
                                                        Interested Model
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select model" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="cb-shine">
                                                                CB Shine
                                                            </SelectItem>
                                                            <SelectItem value="splendor-plus">
                                                                Splendor Plus
                                                            </SelectItem>
                                                            <SelectItem value="passion-pro">
                                                                Passion Pro
                                                            </SelectItem>
                                                            <SelectItem value="hf-deluxe">
                                                                HF Deluxe
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lead-notes">
                                                    Notes
                                                </Label>
                                                <Textarea
                                                    id="lead-notes"
                                                    placeholder="Enter additional notes"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsLeadDialogOpen(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setIsLeadDialogOpen(false)
                                                }
                                            >
                                                Add Lead
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
                                        placeholder="Search leads..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-8"
                                    />
                                </div>
                                <Select
                                    value={selectedStatus}
                                    onValueChange={setSelectedStatus}
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="hot">Hot</SelectItem>
                                        <SelectItem value="warm">
                                            Warm
                                        </SelectItem>
                                        <SelectItem value="cold">
                                            Cold
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
                                        <TableHead>Lead ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Interested Model</TableHead>
                                        <TableHead>Score</TableHead>
                                        <TableHead>Assigned To</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredLeads.map((lead) => (
                                        <TableRow key={lead.id}>
                                            <TableCell className="font-medium">
                                                {lead.id}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {lead.name}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Last contact:{" "}
                                                        {lead.lastContact}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="text-sm">
                                                        {lead.phone}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {lead.email}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {lead.source}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        lead.status === "Hot"
                                                            ? "default"
                                                            : lead.status ===
                                                                "Warm"
                                                              ? "secondary"
                                                              : "outline"
                                                    }
                                                >
                                                    {lead.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {lead.interestedModel}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Progress
                                                        value={lead.score}
                                                        className="w-16 h-2"
                                                    />
                                                    <span className="text-sm">
                                                        {lead.score}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {lead.assignedTo}
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
                                                        <Phone className="h-4 w-4" />
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

                {/* Campaigns Tab */}
                <TabsContent value="campaigns" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Marketing Campaigns</CardTitle>
                                    <CardDescription>
                                        Manage SMS, email, and WhatsApp
                                        campaigns
                                    </CardDescription>
                                </div>
                                <Dialog
                                    open={isCampaignDialogOpen}
                                    onOpenChange={setIsCampaignDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Campaign
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Create New Campaign
                                            </DialogTitle>
                                            <DialogDescription>
                                                Set up a new marketing campaign
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="campaign-name">
                                                    Campaign Name
                                                </Label>
                                                <Input
                                                    id="campaign-name"
                                                    placeholder="Enter campaign name"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="campaign-type">
                                                        Campaign Type
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="sms">
                                                                SMS
                                                            </SelectItem>
                                                            <SelectItem value="email">
                                                                Email
                                                            </SelectItem>
                                                            <SelectItem value="whatsapp">
                                                                WhatsApp
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="campaign-segment">
                                                        Target Segment
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select segment" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="all">
                                                                All Customers
                                                            </SelectItem>
                                                            <SelectItem value="vip">
                                                                VIP Customers
                                                            </SelectItem>
                                                            <SelectItem value="regular">
                                                                Regular
                                                                Customers
                                                            </SelectItem>
                                                            <SelectItem value="new">
                                                                New Customers
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="campaign-message">
                                                    Message Content
                                                </Label>
                                                <Textarea
                                                    id="campaign-message"
                                                    placeholder="Enter your message"
                                                    rows={4}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="campaign-start">
                                                        Start Date
                                                    </Label>
                                                    <Input
                                                        id="campaign-start"
                                                        type="datetime-local"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="campaign-end">
                                                        End Date
                                                    </Label>
                                                    <Input
                                                        id="campaign-end"
                                                        type="datetime-local"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsCampaignDialogOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setIsCampaignDialogOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Create Campaign
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
                                        <TableHead>Campaign Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Recipients</TableHead>
                                        <TableHead>Delivered</TableHead>
                                        <TableHead>Opened</TableHead>
                                        <TableHead>Clicked</TableHead>
                                        <TableHead>Period</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaigns.map((campaign) => (
                                        <TableRow key={campaign.id}>
                                            <TableCell className="font-medium">
                                                {campaign.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {campaign.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        campaign.status ===
                                                        "Active"
                                                            ? "default"
                                                            : campaign.status ===
                                                                "Completed"
                                                              ? "secondary"
                                                              : "outline"
                                                    }
                                                >
                                                    {campaign.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {campaign.recipients.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {campaign.delivered.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {campaign.opened.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {campaign.clicked.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>
                                                        {campaign.startDate}
                                                    </div>
                                                    <div className="text-muted-foreground">
                                                        to {campaign.endDate}
                                                    </div>
                                                </div>
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
                                                        <BarChart3 className="h-4 w-4" />
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

                {/* Communications Tab */}
                <TabsContent value="communications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Communication History</CardTitle>
                                    <CardDescription>
                                        Track all customer communications
                                    </CardDescription>
                                </div>
                                <Dialog
                                    open={isBulkMessageDialogOpen}
                                    onOpenChange={setIsBulkMessageDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Bulk Message
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Send Bulk Message
                                            </DialogTitle>
                                            <DialogDescription>
                                                Send message to multiple
                                                customers
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="message-type">
                                                        Message Type
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="sms">
                                                                SMS
                                                            </SelectItem>
                                                            <SelectItem value="email">
                                                                Email
                                                            </SelectItem>
                                                            <SelectItem value="whatsapp">
                                                                WhatsApp
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="recipient-group">
                                                        Recipient Group
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select group" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="all">
                                                                All Customers
                                                            </SelectItem>
                                                            <SelectItem value="vip">
                                                                VIP Customers
                                                            </SelectItem>
                                                            <SelectItem value="service-due">
                                                                Service Due
                                                            </SelectItem>
                                                            <SelectItem value="leads">
                                                                Active Leads
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="message-subject">
                                                    Subject (for Email)
                                                </Label>
                                                <Input
                                                    id="message-subject"
                                                    placeholder="Enter subject line"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="message-content">
                                                    Message Content
                                                </Label>
                                                <Textarea
                                                    id="message-content"
                                                    placeholder="Enter your message"
                                                    rows={5}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>
                                                    Estimated Recipients: 1,245
                                                    customers
                                                </Label>
                                                <div className="text-sm text-muted-foreground">
                                                    Estimated cost: ₹124.50
                                                    (SMS) | Free
                                                    (Email/WhatsApp)
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsBulkMessageDialogOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setIsBulkMessageDialogOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Send Message
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-4 mb-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-2xl font-bold">
                                            2,456
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Total Messages Sent
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-2xl font-bold">
                                            89.5%
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Delivery Rate
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-2xl font-bold">
                                            67.2%
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Open Rate
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-2xl font-bold">
                                            15.8%
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Response Rate
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Subject/Content</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Sent By</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Opened</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {communications.map((comm) => (
                                        <TableRow key={comm.id}>
                                            <TableCell className="font-medium">
                                                {comm.customerName}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {comm.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="max-w-[200px] truncate">
                                                {comm.subject}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        comm.status === "Sent"
                                                            ? "default"
                                                            : comm.status ===
                                                                "Delivered"
                                                              ? "secondary"
                                                              : "outline"
                                                    }
                                                >
                                                    {comm.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{comm.sentBy}</TableCell>
                                            <TableCell>
                                                {comm.sentDate}
                                            </TableCell>
                                            <TableCell>
                                                {comm.opened ? (
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                )}
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
                                                        <MessageSquare className="h-4 w-4" />
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

                {/* Customer Segments Tab */}
                <TabsContent value="segments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Segments</CardTitle>
                            <CardDescription>
                                Organize customers into targeted segments
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                                {customerSegments.map((segment, index) => (
                                    <Card
                                        key={index}
                                        className="cursor-pointer hover:shadow-md transition-shadow"
                                    >
                                        <CardHeader>
                                            <div className="flex items-center space-x-2">
                                                <div
                                                    className={`w-4 h-4 rounded-full ${segment.color}`}
                                                ></div>
                                                <CardTitle className="text-lg">
                                                    {segment.name}
                                                </CardTitle>
                                            </div>
                                            <CardDescription>
                                                {segment.criteria}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {segment.count.toLocaleString()}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                customers
                                            </p>
                                            <Button
                                                variant="outline"
                                                className="w-full mt-4 bg-transparent"
                                            >
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                Send Message
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Create Custom Segment</CardTitle>
                                    <CardDescription>
                                        Define your own customer segment
                                        criteria
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="segment-name">
                                                    Segment Name
                                                </Label>
                                                <Input
                                                    id="segment-name"
                                                    placeholder="Enter segment name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="segment-criteria">
                                                    Criteria
                                                </Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select criteria" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="purchase-amount">
                                                            Purchase Amount
                                                        </SelectItem>
                                                        <SelectItem value="purchase-frequency">
                                                            Purchase Frequency
                                                        </SelectItem>
                                                        <SelectItem value="last-purchase">
                                                            Last Purchase Date
                                                        </SelectItem>
                                                        <SelectItem value="service-history">
                                                            Service History
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <Button className="w-fit">
                                            Create Segment
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* CRM Analytics Tab */}
                <TabsContent value="analytics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>CRM Analytics</CardTitle>
                            <CardDescription>
                                Analyze customer relationships and communication
                                effectiveness
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Lead Conversion Analysis
                                        </CardTitle>
                                        <CardDescription>
                                            Track lead to customer conversion
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            variant="outline"
                                            className="w-full bg-transparent"
                                        >
                                            <BarChart3 className="mr-2 h-4 w-4" />
                                            View Analysis
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Campaign Performance
                                        </CardTitle>
                                        <CardDescription>
                                            Analyze campaign effectiveness
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            variant="outline"
                                            className="w-full bg-transparent"
                                        >
                                            <TrendingUp className="mr-2 h-4 w-4" />
                                            View Performance
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Customer Lifetime Value
                                        </CardTitle>
                                        <CardDescription>
                                            Calculate customer value metrics
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            variant="outline"
                                            className="w-full bg-transparent"
                                        >
                                            <Users className="mr-2 h-4 w-4" />
                                            View CLV
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Automation Tab */}
                <TabsContent value="automation" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Marketing Automation</CardTitle>
                            <CardDescription>
                                Set up automated workflows and triggers
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Welcome Series
                                        </CardTitle>
                                        <CardDescription>
                                            Automated welcome messages for new
                                            customers
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">
                                                    Status
                                                </span>
                                                <Badge variant="default">
                                                    Active
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">
                                                    Triggered
                                                </span>
                                                <span className="text-sm font-medium">
                                                    45 times
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-4 bg-transparent"
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            Configure
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Service Reminders
                                        </CardTitle>
                                        <CardDescription>
                                            Automatic service reminder
                                            notifications
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">
                                                    Status
                                                </span>
                                                <Badge variant="default">
                                                    Active
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">
                                                    Triggered
                                                </span>
                                                <span className="text-sm font-medium">
                                                    128 times
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-4 bg-transparent"
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            Configure
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Birthday Wishes
                                        </CardTitle>
                                        <CardDescription>
                                            Automated birthday greetings with
                                            offers
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">
                                                    Status
                                                </span>
                                                <Badge variant="secondary">
                                                    Inactive
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">
                                                    Triggered
                                                </span>
                                                <span className="text-sm font-medium">
                                                    0 times
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-4 bg-transparent"
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            Configure
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Follow-up Sequences
                                        </CardTitle>
                                        <CardDescription>
                                            Automated follow-up for leads and
                                            customers
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">
                                                    Status
                                                </span>
                                                <Badge variant="default">
                                                    Active
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">
                                                    Triggered
                                                </span>
                                                <span className="text-sm font-medium">
                                                    89 times
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-4 bg-transparent"
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            Configure
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
