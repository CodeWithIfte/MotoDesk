"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Search,
  Filter,
  Eye,
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
  FileText,
  Building,
  CreditCard,
  RotateCcw,
  Edit,
} from "lucide-react"

// Demo data for vendors
const vendors = [
  {
    id: "VEN-001",
    name: "Hero MotoCorp Ltd",
    type: "manufacturer",
    contact: "Rajesh Sharma",
    phone: "+91 9876543210",
    email: "rajesh@heromotocorp.com",
    address: "Gurgaon, Haryana",
    gst: "06AABCH5555P1Z5",
    paymentTerms: "30 days",
    creditLimit: 5000000,
    outstandingAmount: 1250000,
    status: "active",
    rating: 5,
  },
  {
    id: "VEN-002",
    name: "Bajaj Auto Parts",
    type: "parts_supplier",
    contact: "Amit Kumar",
    phone: "+91 9876543211",
    email: "amit@bajajautoparts.com",
    address: "Pune, Maharashtra",
    gst: "27AABCB1234P1Z6",
    paymentTerms: "15 days",
    creditLimit: 1000000,
    outstandingAmount: 250000,
    status: "active",
    rating: 4,
  },
  {
    id: "VEN-003",
    name: "Accessories World",
    type: "accessories",
    contact: "Priya Singh",
    phone: "+91 9876543212",
    email: "priya@accessoriesworld.com",
    address: "Delhi, India",
    gst: "07AABCA9876P1Z7",
    paymentTerms: "7 days",
    creditLimit: 500000,
    outstandingAmount: 75000,
    status: "active",
    rating: 4,
  },
]

// Demo data for purchase orders
const purchaseOrders = [
  {
    id: "PO-001",
    vendor: "Hero MotoCorp Ltd",
    vendorId: "VEN-001",
    orderDate: "2024-01-15",
    expectedDelivery: "2024-01-25",
    items: [
      { model: "Hero Xtreme 160R", quantity: 10, unitPrice: 110000, total: 1100000 },
      { model: "Hero Passion Pro", quantity: 15, unitPrice: 65000, total: 975000 },
    ],
    subtotal: 2075000,
    tax: 373500,
    total: 2448500,
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "PO-002",
    vendor: "Bajaj Auto Parts",
    vendorId: "VEN-002",
    orderDate: "2024-01-18",
    expectedDelivery: "2024-01-28",
    items: [
      { model: "Brake Pads Set", quantity: 50, unitPrice: 800, total: 40000 },
      { model: "Air Filter", quantity: 100, unitPrice: 350, total: 35000 },
    ],
    subtotal: 75000,
    tax: 13500,
    total: 88500,
    status: "delivered",
    paymentStatus: "paid",
  },
]

// Demo data for purchase entries
const purchaseEntries = [
  {
    id: "PE-001",
    poId: "PO-001",
    vendor: "Hero MotoCorp Ltd",
    invoiceNumber: "HMC/2024/001",
    receivedDate: "2024-01-25",
    items: [
      { model: "Hero Xtreme 160R", ordered: 10, received: 10, damaged: 0 },
      { model: "Hero Passion Pro", ordered: 15, received: 14, damaged: 1 },
    ],
    totalAmount: 2448500,
    status: "partially_received",
  },
  {
    id: "PE-002",
    poId: "PO-002",
    vendor: "Bajaj Auto Parts",
    invoiceNumber: "BAP/2024/001",
    receivedDate: "2024-01-28",
    items: [
      { model: "Brake Pads Set", ordered: 50, received: 50, damaged: 0 },
      { model: "Air Filter", ordered: 100, received: 100, damaged: 0 },
    ],
    totalAmount: 88500,
    status: "completed",
  },
]

export function PurchaseManagement() {
  const [activeTab, setActiveTab] = useState("orders")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false)
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false)
  const [isPurchaseEntryOpen, setIsPurchaseEntryOpen] = useState(false)
  const [isDebitNoteOpen, setIsDebitNoteOpen] = useState(false)
  const [isCreditNoteOpen, setIsCreditNoteOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
      case "delivered":
      case "paid":
        return "default"
      case "pending":
      case "unpaid":
        return "secondary"
      case "partially_received":
        return "outline"
      case "inactive":
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Purchase & Vendor Management</h1>
          <p className="text-muted-foreground">Manage vendors, purchase orders, and inventory procurement</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsDebitNoteOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Debit Note
          </Button>
          <Button variant="outline" onClick={() => setIsCreditNoteOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Credit Note
          </Button>
          <Dialog open={isCreatePOOpen} onOpenChange={setIsCreatePOOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Purchase Order
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.filter((v) => v.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Registered suppliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchaseOrders.filter((po) => po.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting delivery</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Purchases</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹25.37L</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹15.75L</div>
            <p className="text-xs text-muted-foreground">To be paid</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="entries">Purchase Entries</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
          <TabsTrigger value="returns">Purchase Returns</TabsTrigger>
          <TabsTrigger value="reorder">Re-order Management</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search purchase orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Purchase Orders List */}
          <div className="space-y-4">
            {purchaseOrders.map((po) => (
              <Card key={po.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{po.id}</CardTitle>
                      <CardDescription>{po.vendor}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(po.status)}>{po.status}</Badge>
                      <Badge variant={getStatusColor(po.paymentStatus)}>{po.paymentStatus}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <p className="font-medium">{po.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Delivery</p>
                      <p className="font-medium">{po.expectedDelivery}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Items</p>
                      <p className="font-medium">{po.items.length} items</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-bold">₹{po.total.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm">Items:</h4>
                    {po.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm">{item.model}</span>
                        <span className="text-sm">
                          Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString()} = ₹{item.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {po.status === "delivered" && (
                      <Button size="sm" onClick={() => setIsPurchaseEntryOpen(true)}>
                        <Package className="h-4 w-4 mr-1" />
                        Create Entry
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="entries" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Purchase Entries</CardTitle>
                  <CardDescription>Track received inventory and purchase receipts</CardDescription>
                </div>
                <Button onClick={() => setIsPurchaseEntryOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchaseEntries.map((entry) => (
                  <div key={entry.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-medium">{entry.id}</span>
                        <Badge variant={getStatusColor(entry.status)} className="ml-2">
                          {entry.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{entry.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{entry.invoiceNumber}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Vendor</p>
                        <p className="font-medium">{entry.vendor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">PO Reference</p>
                        <p className="font-medium">{entry.poId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Received Date</p>
                        <p className="font-medium">{entry.receivedDate}</p>
                      </div>
                    </div>

                    {/* Items received */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Items Received:</h4>
                      {entry.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded text-sm">
                          <span>{item.model}</span>
                          <div className="flex space-x-4">
                            <span>Ordered: {item.ordered}</span>
                            <span className="text-green-600">Received: {item.received}</span>
                            {item.damaged > 0 && <span className="text-red-600">Damaged: {item.damaged}</span>}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end mt-3 space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Receipt
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Print GRN
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Vendor Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="parts_supplier">Parts Supplier</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vendor
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendors.map((vendor) => (
              <Card key={vendor.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <Badge variant={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                  </div>
                  <CardDescription className="capitalize">{vendor.type.replace("_", " ")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Contact:</span>
                      <span className="text-sm font-medium">{vendor.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="text-sm font-medium">{vendor.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payment Terms:</span>
                      <span className="text-sm font-medium">{vendor.paymentTerms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Credit Limit:</span>
                      <span className="text-sm font-bold">₹{(vendor.creditLimit / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Outstanding:</span>
                      <span className="text-sm font-bold text-red-600">
                        ₹{(vendor.outstandingAmount / 100000).toFixed(1)}L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${i < vendor.rating ? "text-yellow-500" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="returns" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Purchase Returns</CardTitle>
                  <CardDescription>Manage returns to vendors and credit notes</CardDescription>
                </div>
                <Button>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Process Return
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "PR-001",
                    vendor: "Hero MotoCorp Ltd",
                    originalPO: "PO-001",
                    returnDate: "2024-01-26",
                    reason: "Damaged in transit",
                    items: [{ model: "Hero Passion Pro", quantity: 1, amount: 65000 }],
                    totalAmount: 65000,
                    status: "approved",
                  },
                  {
                    id: "PR-002",
                    vendor: "Bajaj Auto Parts",
                    originalPO: "PO-002",
                    returnDate: "2024-01-29",
                    reason: "Wrong specification",
                    items: [{ model: "Air Filter", quantity: 10, amount: 3500 }],
                    totalAmount: 3500,
                    status: "pending",
                  },
                ].map((returnItem) => (
                  <div key={returnItem.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-medium">{returnItem.id}</span>
                        <Badge variant={getStatusColor(returnItem.status)} className="ml-2">
                          {returnItem.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{returnItem.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{returnItem.originalPO}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Vendor</p>
                        <p className="font-medium">{returnItem.vendor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Return Date</p>
                        <p className="font-medium">{returnItem.returnDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reason</p>
                        <p className="font-medium">{returnItem.reason}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Returned Items:</h4>
                      {returnItem.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded text-sm">
                          <span>{item.model}</span>
                          <span>
                            Qty: {item.quantity} - ₹{item.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end mt-3 space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {returnItem.status === "pending" && (
                        <Button size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Generate Credit Note
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reorder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Re-order Management</CardTitle>
              <CardDescription>Monitor stock levels and manage automatic reorder alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "RO-001",
                    model: "Hero Splendor Plus",
                    currentStock: 2,
                    minStock: 5,
                    maxStock: 20,
                    suggestedOrder: 18,
                    preferredVendor: "Hero MotoCorp Ltd",
                    lastOrderDate: "2024-01-10",
                    avgMonthlySales: 8,
                    priority: "high",
                  },
                  {
                    id: "RO-002",
                    model: "Brake Pads Set",
                    currentStock: 15,
                    minStock: 20,
                    maxStock: 100,
                    suggestedOrder: 85,
                    preferredVendor: "Bajaj Auto Parts",
                    lastOrderDate: "2024-01-18",
                    avgMonthlySales: 25,
                    priority: "medium",
                  },
                  {
                    id: "RO-003",
                    model: "Engine Oil 1L",
                    currentStock: 8,
                    minStock: 25,
                    maxStock: 200,
                    suggestedOrder: 192,
                    preferredVendor: "Accessories World",
                    lastOrderDate: "2024-01-05",
                    avgMonthlySales: 45,
                    priority: "high",
                  },
                ].map((reorder) => (
                  <div key={reorder.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle
                          className={`h-5 w-5 ${reorder.priority === "high" ? "text-red-500" : "text-yellow-500"}`}
                        />
                        <div>
                          <span className="font-medium">{reorder.model}</span>
                          <Badge variant={reorder.priority === "high" ? "destructive" : "secondary"} className="ml-2">
                            {reorder.priority} priority
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Order: {reorder.suggestedOrder} units</p>
                        <p className="text-xs text-muted-foreground">{reorder.preferredVendor}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Stock</p>
                        <p className="font-medium text-red-600">{reorder.currentStock} units</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Min Stock</p>
                        <p className="font-medium">{reorder.minStock} units</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Sales</p>
                        <p className="font-medium">{reorder.avgMonthlySales} units</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Order</p>
                        <p className="font-medium">{reorder.lastOrderDate}</p>
                      </div>
                    </div>

                    {/* Stock Level Indicator */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Stock Level</span>
                        <span>
                          {reorder.currentStock}/{reorder.maxStock}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${reorder.currentStock <= reorder.minStock ? "bg-red-500" : "bg-yellow-500"}`}
                          style={{ width: `${(reorder.currentStock / reorder.maxStock) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Adjust Levels
                      </Button>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Create PO
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Purchase Order Dialog */}
      <Dialog open={isCreatePOOpen} onOpenChange={setIsCreatePOOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogDescription>Generate a new purchase order for vendor</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Vendor Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="po-vendor">Select Vendor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>
                        {vendor.name} - {vendor.type.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="po-date">Expected Delivery</Label>
                <Input id="po-date" type="date" />
              </div>
            </div>

            <Separator />

            {/* Items Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Order Items</h3>
              <div className="space-y-3">
                {[1, 2].map((item) => (
                  <div key={item} className="grid grid-cols-4 gap-4 p-3 border rounded-lg">
                    <div className="space-y-2">
                      <Label>Item/Model</Label>
                      <Input placeholder="Enter item name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit Price (₹)</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Total (₹)</Label>
                      <Input disabled placeholder="0" />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Subtotal (₹)</Label>
                  <Input disabled placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Tax (18%)</Label>
                  <Input disabled placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Total Amount (₹)</Label>
                  <Input disabled placeholder="0" className="font-bold" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="po-notes">Special Instructions</Label>
              <Input id="po-notes" placeholder="Any special delivery or quality requirements" />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreatePOOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline">Save Draft</Button>
              <Button onClick={() => setIsCreatePOOpen(false)}>Create Purchase Order</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Vendor Dialog */}
      <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
            <DialogDescription>Register a new vendor/supplier</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor-name">Vendor Name</Label>
                <Input id="vendor-name" placeholder="Enter vendor name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-type">Vendor Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="parts_supplier">Parts Supplier</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="service">Service Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor-contact">Contact Person</Label>
                <Input id="vendor-contact" placeholder="Contact person name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-phone">Phone Number</Label>
                <Input id="vendor-phone" placeholder="+91 9876543210" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor-email">Email Address</Label>
              <Input id="vendor-email" type="email" placeholder="vendor@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor-address">Address</Label>
              <Input id="vendor-address" placeholder="Complete address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor-gst">GST Number</Label>
                <Input id="vendor-gst" placeholder="GST registration number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-payment">Payment Terms</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="7_days">7 Days</SelectItem>
                    <SelectItem value="15_days">15 Days</SelectItem>
                    <SelectItem value="30_days">30 Days</SelectItem>
                    <SelectItem value="45_days">45 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor-credit">Credit Limit (₹)</Label>
              <Input id="vendor-credit" type="number" placeholder="1000000" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddVendorOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddVendorOpen(false)}>Add Vendor</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Purchase Entry Dialog */}
      <Dialog open={isPurchaseEntryOpen} onOpenChange={setIsPurchaseEntryOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Purchase Entry</DialogTitle>
            <DialogDescription>Record received inventory against purchase order</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entry-po">Purchase Order</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select PO" />
                  </SelectTrigger>
                  <SelectContent>
                    {purchaseOrders.map((po) => (
                      <SelectItem key={po.id} value={po.id}>
                        {po.id} - {po.vendor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-invoice">Vendor Invoice No.</Label>
                <Input id="entry-invoice" placeholder="Vendor invoice number" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entry-date">Received Date</Label>
                <Input id="entry-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-grn">GRN Number</Label>
                <Input id="entry-grn" placeholder="Auto-generated" disabled />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Items Received</h3>
              <div className="space-y-3">
                {[1, 2].map((item) => (
                  <div key={item} className="grid grid-cols-5 gap-4 p-3 border rounded-lg">
                    <div className="space-y-2">
                      <Label>Item</Label>
                      <Input disabled placeholder="Hero Xtreme 160R" />
                    </div>
                    <div className="space-y-2">
                      <Label>Ordered</Label>
                      <Input disabled placeholder="10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Received</Label>
                      <Input type="number" placeholder="10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Damaged</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Badge variant="default">Complete</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry-notes">Remarks</Label>
              <Input id="entry-notes" placeholder="Any remarks about the delivery" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsPurchaseEntryOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsPurchaseEntryOpen(false)}>Create Entry & Update Stock</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
