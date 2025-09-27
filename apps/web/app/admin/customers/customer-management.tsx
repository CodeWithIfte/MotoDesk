"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, User, Phone, MapPin, Calendar, Bike, Eye, Edit } from "lucide-react"

// Demo data for customers
const customers = [
  {
    id: "CUST-001",
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh.kumar@email.com",
    address: "123 Main Street, Patna, Bihar - 800001",
    dateJoined: "2023-06-15",
    totalPurchases: 2,
    totalSpent: 183000,
    lastVisit: "2024-01-20",
    bikes: [
      { model: "Hero Xtreme 160R", regNumber: "BR01AB1234", purchaseDate: "2023-06-15", price: 115000 },
      { model: "Hero Splendor Plus", regNumber: "BR01CD5678", purchaseDate: "2024-01-10", price: 68000 },
    ],
    services: [
      { id: "SRV-001", date: "2024-01-20", service: "General Service", bike: "Hero Xtreme 160R", cost: 1500 },
      { id: "SRV-015", date: "2023-12-10", service: "Oil Change", bike: "Hero Xtreme 160R", cost: 800 },
    ],
    status: "active",
  },
  {
    id: "CUST-002",
    name: "Priya Sharma",
    phone: "+91 9876543211",
    email: "priya.sharma@email.com",
    address: "456 Park Avenue, Patna, Bihar - 800002",
    dateJoined: "2023-08-22",
    totalPurchases: 1,
    totalSpent: 82000,
    lastVisit: "2024-01-18",
    bikes: [{ model: "Hero Glamour", regNumber: "BR01EF9012", purchaseDate: "2023-08-22", price: 82000 }],
    services: [
      { id: "SRV-004", date: "2024-01-18", service: "Chain Maintenance", bike: "Hero Glamour", cost: 600 },
      { id: "SRV-012", date: "2023-11-15", service: "General Service", bike: "Hero Glamour", cost: 1200 },
    ],
    status: "active",
  },
  {
    id: "CUST-003",
    name: "Amit Singh",
    phone: "+91 9876543212",
    email: "amit.singh@email.com",
    address: "789 Gandhi Road, Patna, Bihar - 800003",
    dateJoined: "2023-04-10",
    totalPurchases: 1,
    totalSpent: 68000,
    lastVisit: "2024-01-15",
    bikes: [{ model: "Hero Passion Pro", regNumber: "BR01GH3456", purchaseDate: "2023-04-10", price: 68000 }],
    services: [
      { id: "SRV-008", date: "2024-01-15", service: "Brake Repair", bike: "Hero Passion Pro", cost: 1800 },
      { id: "SRV-020", date: "2023-10-05", service: "Oil Change", bike: "Hero Passion Pro", cost: 750 },
    ],
    status: "active",
  },
  {
    id: "CUST-004",
    name: "Sunita Devi",
    phone: "+91 9876543213",
    email: "sunita.devi@email.com",
    address: "321 Station Road, Patna, Bihar - 800004",
    dateJoined: "2023-09-05",
    totalPurchases: 1,
    totalSpent: 85000,
    lastVisit: "2024-01-12",
    bikes: [{ model: "Hero Destini 125", regNumber: "BR01IJ7890", purchaseDate: "2023-09-05", price: 85000 }],
    services: [
      { id: "SRV-002", date: "2024-01-12", service: "Oil Change", bike: "Hero Destini 125", cost: 800 },
      { id: "SRV-018", date: "2023-12-20", service: "General Service", bike: "Hero Destini 125", cost: 1100 },
    ],
    status: "active",
  },
  {
    id: "CUST-005",
    name: "Manoj Tiwari",
    phone: "+91 9876543214",
    email: "manoj.tiwari@email.com",
    address: "654 College Road, Patna, Bihar - 800005",
    dateJoined: "2023-07-18",
    totalPurchases: 1,
    totalSpent: 145000,
    lastVisit: "2024-01-08",
    bikes: [{ model: "Hero Xpulse 200", regNumber: "BR01KL1234", purchaseDate: "2023-07-18", price: 145000 }],
    services: [
      { id: "SRV-003", date: "2024-01-08", service: "Brake Repair", bike: "Hero Xpulse 200", cost: 2200 },
      { id: "SRV-016", date: "2023-11-28", service: "Chain Maintenance", bike: "Hero Xpulse 200", cost: 900 },
    ],
    status: "active",
  },
  {
    id: "CUST-006",
    name: "Vikash Gupta",
    phone: "+91 9876543215",
    email: "vikash.gupta@email.com",
    address: "987 Market Street, Patna, Bihar - 800006",
    dateJoined: "2022-12-03",
    totalPurchases: 0,
    totalSpent: 0,
    lastVisit: "2023-08-15",
    bikes: [],
    services: [
      { id: "SRV-025", date: "2023-08-15", service: "General Service", bike: "Hero Glamour", cost: 1500 },
      { id: "SRV-030", date: "2023-05-20", service: "Oil Change", bike: "Hero Glamour", cost: 800 },
    ],
    status: "inactive",
  },
]

export function CustomerManagement() {
  const [activeTab, setActiveTab] = useState("customers")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  const avgSpentPerCustomer = totalRevenue / totalCustomers

  const getCustomerValue = (customer: any) => {
    if (customer.totalSpent >= 100000) return "high"
    if (customer.totalSpent >= 50000) return "medium"
    return "low"
  }

  const getValueBadgeVariant = (value: string) => {
    switch (value) {
      case "high":
        return "default"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Customer Management</h1>
          <p className="text-muted-foreground">Manage customer profiles, purchase history, and service records</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>Create a new customer profile</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">Full Name</Label>
                    <Input id="customer-name" placeholder="Enter customer name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-phone">Phone Number</Label>
                    <Input id="customer-phone" placeholder="+91 9876543210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email Address</Label>
                  <Input id="customer-email" type="email" placeholder="customer@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-address">Address</Label>
                  <Textarea id="customer-address" placeholder="Enter complete address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-notes">Notes (Optional)</Label>
                  <Textarea id="customer-notes" placeholder="Any additional notes about the customer" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddCustomerOpen(false)}>Add Customer</Button>
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
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Registered customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">Recent activity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Bike className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Spent</CardTitle>
            <Bike className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{Math.round(avgSpentPerCustomer).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per customer</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="customers">All Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCustomers.map((customer) => {
              const customerValue = getCustomerValue(customer)
              return (
                <Card key={customer.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{customer.name}</CardTitle>
                          <CardDescription>{customer.id}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                        <Badge variant={getValueBadgeVariant(customerValue)}>{customerValue} value</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{customer.address.split(",")[0]}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {customer.dateJoined}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{customer.totalPurchases}</p>
                        <p className="text-xs text-muted-foreground">Bikes Purchased</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">₹{customer.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Dialog open={isCustomerDetailsOpen} onOpenChange={setIsCustomerDetailsOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{selectedCustomer?.name} - Customer Details</DialogTitle>
                            <DialogDescription>Complete customer profile and history</DialogDescription>
                          </DialogHeader>
                          {selectedCustomer && (
                            <div className="space-y-6">
                              {/* Customer Info */}
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                  <h3 className="font-semibold">Contact Information</h3>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <strong>Phone:</strong> {selectedCustomer.phone}
                                    </p>
                                    <p>
                                      <strong>Email:</strong> {selectedCustomer.email}
                                    </p>
                                    <p>
                                      <strong>Address:</strong> {selectedCustomer.address}
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <h3 className="font-semibold">Account Summary</h3>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <strong>Customer ID:</strong> {selectedCustomer.id}
                                    </p>
                                    <p>
                                      <strong>Date Joined:</strong> {selectedCustomer.dateJoined}
                                    </p>
                                    <p>
                                      <strong>Last Visit:</strong> {selectedCustomer.lastVisit}
                                    </p>
                                    <p>
                                      <strong>Status:</strong>{" "}
                                      <Badge variant={selectedCustomer.status === "active" ? "default" : "secondary"}>
                                        {selectedCustomer.status}
                                      </Badge>
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Bikes Owned */}
                              <div>
                                <h3 className="font-semibold mb-3">Bikes Owned ({selectedCustomer.bikes.length})</h3>
                                {selectedCustomer.bikes.length > 0 ? (
                                  <div className="space-y-2">
                                    {selectedCustomer.bikes.map((bike: any, index: number) => (
                                      <div
                                        key={index}
                                        className="flex justify-between items-center p-3 border rounded-lg"
                                      >
                                        <div>
                                          <p className="font-medium">{bike.model}</p>
                                          <p className="text-sm text-muted-foreground">
                                            {bike.regNumber} • Purchased {bike.purchaseDate}
                                          </p>
                                        </div>
                                        <p className="font-semibold">₹{bike.price.toLocaleString()}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-muted-foreground">No bikes purchased yet</p>
                                )}
                              </div>

                              {/* Service History */}
                              <div>
                                <h3 className="font-semibold mb-3">
                                  Service History ({selectedCustomer.services.length})
                                </h3>
                                {selectedCustomer.services.length > 0 ? (
                                  <div className="space-y-2">
                                    {selectedCustomer.services.map((service: any, index: number) => (
                                      <div
                                        key={index}
                                        className="flex justify-between items-center p-3 border rounded-lg"
                                      >
                                        <div>
                                          <p className="font-medium">{service.service}</p>
                                          <p className="text-sm text-muted-foreground">
                                            {service.bike} • {service.date}
                                          </p>
                                        </div>
                                        <p className="font-semibold">₹{service.cost}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-muted-foreground">No service history</p>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Value Distribution</CardTitle>
                <CardDescription>Customers by spending categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>High Value (₹1L+)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                      </div>
                      <span className="text-sm font-medium">
                        {customers.filter((c) => getCustomerValue(c) === "high").length}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Medium Value (₹50K-1L)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                      </div>
                      <span className="text-sm font-medium">
                        {customers.filter((c) => getCustomerValue(c) === "medium").length}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Low Value (&lt;₹50K)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full w-1/4"></div>
                      </div>
                      <span className="text-sm font-medium">
                        {customers.filter((c) => getCustomerValue(c) === "low").length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Highest spending customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customers
                    .sort((a, b) => b.totalSpent - a.totalSpent)
                    .slice(0, 5)
                    .map((customer, index) => (
                      <div key={customer.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.totalPurchases} bikes</p>
                          </div>
                        </div>
                        <p className="font-semibold">₹{customer.totalSpent.toLocaleString()}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
