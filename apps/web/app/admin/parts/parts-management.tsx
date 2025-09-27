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
import {
  Plus,
  Search,
  Filter,
  Package,
  Eye,
  MapPin,
  ArrowRightLeft,
  AlertCircle,
  Wrench,
  Hash,
  BarChart3,
} from "lucide-react"

// Demo data for parts with advanced tracking
const partsInventory = [
  {
    id: "PT001",
    name: "Engine Oil (10W-30)",
    category: "Engine",
    brand: "Hero Genuine",
    partNumber: "HG-EO-10W30-1L",
    stock: 5,
    minStock: 20,
    maxStock: 100,
    price: 450,
    cost: 320,
    supplier: "Hero MotoCorp",
    lastRestocked: "2024-01-10",
    locations: [
      { location: "Main Store", stock: 3, reserved: 0 },
      { location: "Service Bay", stock: 2, reserved: 1 },
    ],
    damaged: 0,
    reserved: 1,
    available: 4,
  },
  {
    id: "PT002",
    name: "Brake Pads - Front",
    category: "Brakes",
    brand: "Hero Genuine",
    partNumber: "HG-BP-F-001",
    stock: 8,
    minStock: 15,
    maxStock: 50,
    price: 850,
    cost: 600,
    supplier: "Hero MotoCorp",
    lastRestocked: "2024-01-12",
    locations: [
      { location: "Main Store", stock: 6, reserved: 2 },
      { location: "Service Bay", stock: 2, reserved: 0 },
    ],
    damaged: 1,
    reserved: 2,
    available: 5,
  },
  {
    id: "PT003",
    name: "Air Filter",
    category: "Engine",
    brand: "Hero Genuine",
    partNumber: "HG-AF-001",
    stock: 12,
    minStock: 25,
    maxStock: 80,
    price: 320,
    cost: 220,
    supplier: "Hero MotoCorp",
    lastRestocked: "2024-01-08",
    locations: [
      { location: "Main Store", stock: 10, reserved: 0 },
      { location: "Service Bay", stock: 2, reserved: 0 },
    ],
    damaged: 0,
    reserved: 0,
    available: 12,
  },
  {
    id: "PT004",
    name: "Spark Plug",
    category: "Engine",
    brand: "NGK",
    partNumber: "NGK-SP-CR9E",
    stock: 18,
    minStock: 30,
    maxStock: 120,
    price: 180,
    cost: 120,
    supplier: "NGK India",
    lastRestocked: "2024-01-15",
    locations: [
      { location: "Main Store", stock: 15, reserved: 0 },
      { location: "Service Bay", stock: 3, reserved: 0 },
    ],
    damaged: 0,
    reserved: 0,
    available: 18,
  },
  {
    id: "PT005",
    name: "Chain Set",
    category: "Transmission",
    brand: "Hero Genuine",
    partNumber: "HG-CS-120L",
    stock: 25,
    minStock: 10,
    maxStock: 60,
    price: 1200,
    cost: 850,
    supplier: "Hero MotoCorp",
    lastRestocked: "2024-01-14",
    locations: [
      { location: "Main Store", stock: 20, reserved: 5 },
      { location: "Service Bay", stock: 5, reserved: 0 },
    ],
    damaged: 0,
    reserved: 5,
    available: 20,
  },
  {
    id: "PT006",
    name: "Headlight Bulb",
    category: "Electrical",
    brand: "Philips",
    partNumber: "PH-HLB-12V-35W",
    stock: 35,
    minStock: 20,
    maxStock: 100,
    price: 250,
    cost: 180,
    supplier: "Philips India",
    lastRestocked: "2024-01-16",
    locations: [
      { location: "Main Store", stock: 30, reserved: 0 },
      { location: "Display Area", stock: 5, reserved: 0 },
    ],
    damaged: 0,
    reserved: 0,
    available: 35,
  },
  {
    id: "PT007",
    name: "Brake Cable",
    category: "Brakes",
    brand: "Hero Genuine",
    partNumber: "HG-BC-RR-001",
    stock: 3,
    minStock: 15,
    maxStock: 50,
    price: 380,
    cost: 260,
    supplier: "Hero MotoCorp",
    lastRestocked: "2024-01-05",
    locations: [
      { location: "Main Store", stock: 2, reserved: 0 },
      { location: "Service Bay", stock: 1, reserved: 0 },
    ],
    damaged: 2,
    reserved: 0,
    available: 1,
  },
  {
    id: "PT008",
    name: "Clutch Plate",
    category: "Transmission",
    brand: "Hero Genuine",
    partNumber: "HG-CP-STD-001",
    stock: 15,
    minStock: 12,
    maxStock: 70,
    price: 680,
    cost: 480,
    supplier: "Hero MotoCorp",
    lastRestocked: "2024-01-13",
    locations: [
      { location: "Main Store", stock: 12, reserved: 3 },
      { location: "Service Bay", stock: 3, reserved: 0 },
    ],
    damaged: 0,
    reserved: 3,
    available: 12,
  },
]

const recentPartsSales = [
  {
    id: "PS001",
    customer: "Rajesh Kumar",
    phone: "+91 9876543210",
    items: [
      { name: "Engine Oil (10W-30)", quantity: 2, price: 450 },
      { name: "Air Filter", quantity: 1, price: 320 },
    ],
    total: 1220,
    paymentMethod: "Cash",
    saleDate: "2024-01-20",
    status: "completed",
  },
  {
    id: "PS002",
    customer: "Priya Sharma",
    phone: "+91 9876543211",
    items: [
      { name: "Brake Pads - Front", quantity: 1, price: 850 },
      { name: "Brake Cable", quantity: 1, price: 380 },
    ],
    total: 1230,
    paymentMethod: "Bkash",
    saleDate: "2024-01-19",
    status: "completed",
  },
  {
    id: "PS003",
    customer: "Amit Singh",
    phone: "+91 9876543212",
    items: [{ name: "Chain Set", quantity: 1, price: 1200 }],
    total: 1200,
    paymentMethod: "Nagad",
    saleDate: "2024-01-18",
    status: "pending",
  },
]

const categories = ["All", "Engine", "Brakes", "Transmission", "Electrical", "Body", "Accessories"]

// Demo data for bike inventory with frame/engine tracking
const bikeInventoryAdvanced = [
  {
    id: "BK001",
    model: "Hero Splendor Plus",
    variant: "Standard",
    color: "Black",
    year: 2024,
    frameNumber: "ME4PC41A5JK123456",
    engineNumber: "JC41E1234567",
    price: 75000,
    status: "available",
    location: "Main Showroom",
    dateReceived: "2024-01-15",
    condition: "new",
    fuelLevel: "empty",
    accessories: ["Standard Kit"],
    warranty: "2 years",
    insurance: "pending",
  },
  {
    id: "BK002",
    model: "Hero Xtreme 160R",
    variant: "Sports",
    color: "Red",
    year: 2024,
    frameNumber: "ME4PC41A5JK123457",
    engineNumber: "JC41E1234568",
    price: 115000,
    status: "sold",
    location: "Delivered",
    dateReceived: "2024-01-10",
    dateSold: "2024-01-20",
    condition: "new",
    fuelLevel: "full",
    accessories: ["Sports Kit", "Mobile Charger"],
    warranty: "2 years",
    insurance: "completed",
    customer: "Rajesh Kumar",
  },
  {
    id: "BK003",
    model: "Hero Passion Pro",
    variant: "Standard",
    color: "Blue",
    year: 2024,
    frameNumber: "ME4PC41A5JK123458",
    engineNumber: "JC41E1234569",
    price: 68000,
    status: "damaged",
    location: "Service Bay",
    dateReceived: "2024-01-12",
    condition: "damaged",
    damageDescription: "Minor scratches on fuel tank during transport",
    fuelLevel: "quarter",
    accessories: ["Standard Kit"],
    warranty: "2 years",
    insurance: "pending",
  },
]

// Demo data for stock locations
const stockLocations = [
  {
    id: "LOC001",
    name: "Main Store",
    type: "warehouse",
    address: "Ground Floor, Main Building",
    capacity: 1000,
    currentStock: 450,
    manager: "Rajesh Kumar",
    phone: "+91 9876543210",
  },
  {
    id: "LOC002",
    name: "Service Bay",
    type: "service",
    address: "Service Department",
    capacity: 200,
    currentStock: 85,
    manager: "Amit Singh",
    phone: "+91 9876543211",
  },
  {
    id: "LOC003",
    name: "Display Area",
    type: "showroom",
    address: "Customer Display Area",
    capacity: 50,
    currentStock: 25,
    manager: "Priya Sharma",
    phone: "+91 9876543212",
  },
]

export function PartsManagement() {
  const [activeTab, setActiveTab] = useState("inventory")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [stockFilter, setStockFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [isAddPartOpen, setIsAddPartOpen] = useState(false)
  const [isSellPartsOpen, setIsSellPartsOpen] = useState(false)
  const [isStockTransferOpen, setIsStockTransferOpen] = useState(false)
  const [isDamageStockOpen, setIsDamageStockOpen] = useState(false)
  const [isFrameTrackingOpen, setIsFrameTrackingOpen] = useState(false)

  const filteredParts = partsInventory.filter((part) => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || part.category === categoryFilter
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && part.stock <= part.minStock) ||
      (stockFilter === "good" && part.stock > part.minStock) ||
      (stockFilter === "damaged" && part.damaged > 0) ||
      (stockFilter === "reserved" && part.reserved > 0)
    const matchesLocation = locationFilter === "all" || part.locations.some((loc) => loc.location === locationFilter)
    return matchesSearch && matchesCategory && matchesStock && matchesLocation
  })

  const lowStockParts = partsInventory.filter((part) => part.stock <= part.minStock)
  const totalPartsValue = partsInventory.reduce((sum, part) => sum + part.stock * part.cost, 0)

  const getStockStatus = (part: any) => {
    if (part.stock <= part.minStock * 0.5) return "critical"
    if (part.stock <= part.minStock) return "low"
    return "good"
  }

  const getStockBadgeVariant = (status: string) => {
    switch (status) {
      case "critical":
        return "destructive"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Advanced Inventory & Stock Control</h1>
          <p className="text-muted-foreground">
            Comprehensive inventory management with location tracking and damage control
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsStockTransferOpen(true)}>
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Stock Transfer
          </Button>
          <Button variant="outline" onClick={() => setIsDamageStockOpen(true)}>
            <AlertCircle className="h-4 w-4 mr-2" />
            Damage Stock
          </Button>
          <Button variant="outline" onClick={() => setIsFrameTrackingOpen(true)}>
            <Hash className="h-4 w-4 mr-2" />
            Frame Tracking
          </Button>
          <Dialog open={isAddPartOpen} onOpenChange={setIsAddPartOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>Add a new part or accessory to your inventory</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="part-name">Item Name</Label>
                  <Input id="part-name" placeholder="Engine Oil (10W-30)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cost-price">Cost Price (₹)</Label>
                    <Input id="cost-price" type="number" placeholder="320" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="selling-price">Selling Price (₹)</Label>
                    <Input id="selling-price" type="number" placeholder="450" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial-stock">Initial Stock</Label>
                    <Input id="initial-stock" type="number" placeholder="50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-stock">Minimum Stock</Label>
                    <Input id="min-stock" type="number" placeholder="20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="Hero MotoCorp" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddPartOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddPartOpen(false)}>Add Item</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partsInventory.length + bikeInventoryAdvanced.length}</div>
            <p className="text-xs text-muted-foreground">Parts + Bikes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <MapPin className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockLocations.length}</div>
            <p className="text-xs text-muted-foreground">Active locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Damaged Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {partsInventory.reduce((sum, part) => sum + part.damaged, 0) +
                bikeInventoryAdvanced.filter((bike) => bike.status === "damaged").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved Stock</CardTitle>
            <Package className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partsInventory.reduce((sum, part) => sum + part.reserved, 0)}</div>
            <p className="text-xs text-muted-foreground">Reserved items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45.2L</div>
            <p className="text-xs text-muted-foreground">Total inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="inventory">Parts Inventory</TabsTrigger>
          <TabsTrigger value="bikes">Bike Tracking</TabsTrigger>
          <TabsTrigger value="locations">Location Management</TabsTrigger>
          <TabsTrigger value="damage">Damage Control</TabsTrigger>
          <TabsTrigger value="transfers">Stock Transfers</TabsTrigger>
          <TabsTrigger value="analytics">Stock Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Enhanced Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search parts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-40">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {stockLocations.map((location) => (
                  <SelectItem key={location.id} value={location.name}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="good">Good Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced Parts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParts.map((part) => (
              <Card key={part.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{part.name}</CardTitle>
                    <div className="flex space-x-1">
                      {part.damaged > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {part.damaged} Damaged
                        </Badge>
                      )}
                      {part.reserved > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {part.reserved} Reserved
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>
                    {part.category} • {part.partNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Available:</span>
                      <span className="text-sm font-medium text-green-600">{part.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Stock:</span>
                      <span className="text-sm font-medium">{part.stock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Min/Max:</span>
                      <span className="text-sm font-medium">
                        {part.minStock}/{part.maxStock}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="text-sm font-bold">₹{part.price}</span>
                    </div>
                  </div>

                  {/* Location Breakdown */}
                  <div className="mt-3">
                    <h4 className="text-xs font-semibold mb-2">Stock by Location:</h4>
                    <div className="space-y-1">
                      {part.locations.map((loc, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{loc.location}:</span>
                          <span>
                            {loc.stock} ({loc.reserved} reserved)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stock Level Indicator */}
                  <div className="w-full bg-muted rounded-full h-2 mt-3">
                    <div
                      className={`h-2 rounded-full ${
                        part.stock <= part.minStock * 0.5
                          ? "bg-red-500"
                          : part.stock <= part.minStock
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min((part.stock / part.maxStock) * 100, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    <Button size="sm">
                      <ArrowRightLeft className="h-4 w-4 mr-1" />
                      Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bikes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Bike Inventory Tracking</CardTitle>
                  <CardDescription>Frame and engine number tracking with detailed status</CardDescription>
                </div>
                <Button onClick={() => setIsFrameTrackingOpen(true)}>
                  <Hash className="h-4 w-4 mr-2" />
                  Track by Frame/Engine
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bikeInventoryAdvanced.map((bike) => (
                  <div key={bike.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-medium">
                          {bike.model} - {bike.variant}
                        </span>
                        <Badge
                          variant={
                            bike.status === "available"
                              ? "default"
                              : bike.status === "sold"
                                ? "secondary"
                                : bike.status === "damaged"
                                  ? "destructive"
                                  : "outline"
                          }
                          className="ml-2"
                        >
                          {bike.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{bike.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {bike.color} • {bike.year}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Frame Number</p>
                        <p className="font-mono text-sm">{bike.frameNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engine Number</p>
                        <p className="font-mono text-sm">{bike.engineNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium text-sm">{bike.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Condition</p>
                        <p className="font-medium text-sm capitalize">{bike.condition}</p>
                      </div>
                    </div>

                    {bike.status === "damaged" && bike.damageDescription && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-3">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium text-red-800">Damage Report:</span>
                        </div>
                        <p className="text-sm text-red-700 mt-1">{bike.damageDescription}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Fuel Level</p>
                        <p className="font-medium capitalize">{bike.fuelLevel}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Warranty</p>
                        <p className="font-medium">{bike.warranty}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Insurance</p>
                        <p className="font-medium capitalize">{bike.insurance}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Accessories</p>
                        <p className="font-medium">{bike.accessories.join(", ")}</p>
                      </div>
                    </div>

                    {bike.customer && (
                      <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm text-green-800">
                          <strong>Sold to:</strong> {bike.customer} on {bike.dateSold}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end mt-3 space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Full Details
                      </Button>
                      {bike.status === "damaged" && (
                        <Button size="sm" variant="destructive">
                          <Wrench className="h-4 w-4 mr-1" />
                          Service
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Stock Locations</CardTitle>
                  <CardDescription>Manage inventory across multiple locations</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Location
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stockLocations.map((location) => (
                  <Card key={location.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{location.name}</CardTitle>
                        <Badge variant="outline" className="capitalize">
                          {location.type}
                        </Badge>
                      </div>
                      <CardDescription>{location.address}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Capacity:</span>
                          <span className="text-sm font-medium">{location.capacity} items</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Current Stock:</span>
                          <span className="text-sm font-medium">{location.currentStock} items</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Utilization:</span>
                          <span className="text-sm font-bold">
                            {Math.round((location.currentStock / location.capacity) * 100)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Manager:</span>
                          <span className="text-sm font-medium">{location.manager}</span>
                        </div>
                      </div>

                      {/* Capacity Indicator */}
                      <div className="w-full bg-muted rounded-full h-2 mt-3">
                        <div
                          className={`h-2 rounded-full ${
                            location.currentStock / location.capacity > 0.9
                              ? "bg-red-500"
                              : location.currentStock / location.capacity > 0.7
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${(location.currentStock / location.capacity) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Stock
                        </Button>
                        <Button size="sm">
                          <ArrowRightLeft className="h-4 w-4 mr-1" />
                          Transfer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="damage" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Damage Stock Management</CardTitle>
                  <CardDescription>Track and manage damaged inventory items</CardDescription>
                </div>
                <Button onClick={() => setIsDamageStockOpen(true)}>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Report Damage
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Damaged Parts */}
                {partsInventory
                  .filter((part) => part.damaged > 0)
                  .map((part) => (
                    <div key={part.id} className="p-4 rounded-lg border border-red-200 bg-red-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="font-medium">{part.name}</span>
                          <Badge variant="destructive">{part.damaged} Damaged</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-red-600">
                            Loss: ₹{(part.damaged * part.cost).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Part Number</p>
                          <p className="font-medium">{part.partNumber}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Category</p>
                          <p className="font-medium">{part.category}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Unit Cost</p>
                          <p className="font-medium">₹{part.cost}</p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3 space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Damage Report
                        </Button>
                        <Button size="sm">
                          <Wrench className="h-4 w-4 mr-1" />
                          Process Claim
                        </Button>
                      </div>
                    </div>
                  ))}

                {/* Damaged Bikes */}
                {bikeInventoryAdvanced
                  .filter((bike) => bike.status === "damaged")
                  .map((bike) => (
                    <div key={bike.id} className="p-4 rounded-lg border border-red-200 bg-red-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="font-medium">
                            {bike.model} - {bike.color}
                          </span>
                          <Badge variant="destructive">Damaged</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-red-600">Value: ₹{bike.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground">Frame Number</p>
                          <p className="font-mono">{bike.frameNumber}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{bike.location}</p>
                        </div>
                      </div>
                      {bike.damageDescription && (
                        <div className="p-2 bg-white border border-red-200 rounded mb-3">
                          <p className="text-sm">
                            <strong>Damage Description:</strong> {bike.damageDescription}
                          </p>
                        </div>
                      )}
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Assessment
                        </Button>
                        <Button size="sm">
                          <Wrench className="h-4 w-4 mr-1" />
                          Repair
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Stock Transfers</CardTitle>
                  <CardDescription>Track inventory movements between locations</CardDescription>
                </div>
                <Button onClick={() => setIsStockTransferOpen(true)}>
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  New Transfer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "ST-001",
                    item: "Engine Oil (10W-30)",
                    quantity: 10,
                    from: "Main Store",
                    to: "Service Bay",
                    requestedBy: "Amit Singh",
                    date: "2024-01-20",
                    status: "completed",
                    reason: "Service department stock replenishment",
                  },
                  {
                    id: "ST-002",
                    item: "Brake Pads - Front",
                    quantity: 5,
                    from: "Main Store",
                    to: "Display Area",
                    requestedBy: "Priya Sharma",
                    date: "2024-01-19",
                    status: "pending",
                    reason: "Customer demonstration",
                  },
                  {
                    id: "ST-003",
                    item: "Hero Splendor Plus",
                    quantity: 1,
                    from: "Main Store",
                    to: "Display Area",
                    requestedBy: "Sales Team",
                    date: "2024-01-18",
                    status: "in_transit",
                    reason: "Showroom display",
                  },
                ].map((transfer) => (
                  <div key={transfer.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-medium">{transfer.id}</span>
                        <Badge
                          variant={
                            transfer.status === "completed"
                              ? "default"
                              : transfer.status === "in_transit"
                                ? "secondary"
                                : "outline"
                          }
                          className="ml-2"
                        >
                          {transfer.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{transfer.quantity} units</p>
                        <p className="text-xs text-muted-foreground">{transfer.date}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Item</p>
                        <p className="font-medium">{transfer.item}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">From</p>
                        <p className="font-medium">{transfer.from}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">To</p>
                        <p className="font-medium">{transfer.to}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Requested By</p>
                        <p className="font-medium">{transfer.requestedBy}</p>
                      </div>
                    </div>

                    <div className="p-2 bg-muted/50 rounded mb-3">
                      <p className="text-sm">
                        <strong>Reason:</strong> {transfer.reason}
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      {transfer.status === "pending" && (
                        <Button size="sm">
                          <ArrowRightLeft className="h-4 w-4 mr-1" />
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Stock Movement Analytics</CardTitle>
                <CardDescription>Inventory turnover and movement patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fast Moving Items</span>
                    <Badge variant="default">15 items</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Slow Moving Items</span>
                    <Badge variant="secondary">8 items</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dead Stock</span>
                    <Badge variant="destructive">3 items</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Turnover</span>
                    <span className="font-bold">2.3x/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Efficiency</CardTitle>
                <CardDescription>Storage utilization across locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockLocations.map((location) => (
                    <div key={location.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{location.name}</span>
                        <span className="text-sm font-bold">
                          {Math.round((location.currentStock / location.capacity) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(location.currentStock / location.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Stock Transfer Dialog */}
      <Dialog open={isStockTransferOpen} onOpenChange={setIsStockTransferOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Stock Transfer</DialogTitle>
            <DialogDescription>Transfer inventory between locations</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transfer-from">From Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source location" />
                  </SelectTrigger>
                  <SelectContent>
                    {stockLocations.map((location) => (
                      <SelectItem key={location.id} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transfer-to">To Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination location" />
                  </SelectTrigger>
                  <SelectContent>
                    {stockLocations.map((location) => (
                      <SelectItem key={location.id} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-item">Select Item</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose item to transfer" />
                </SelectTrigger>
                <SelectContent>
                  {partsInventory.map((part) => (
                    <SelectItem key={part.id} value={part.id}>
                      {part.name} (Available: {part.available})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transfer-quantity">Quantity</Label>
                <Input id="transfer-quantity" type="number" placeholder="Enter quantity" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transfer-date">Transfer Date</Label>
                <Input id="transfer-date" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-reason">Reason for Transfer</Label>
              <Input id="transfer-reason" placeholder="Enter reason for transfer" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsStockTransferOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsStockTransferOpen(false)}>Create Transfer Request</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Frame/Engine Tracking Dialog */}
      <Dialog open={isFrameTrackingOpen} onOpenChange={setIsFrameTrackingOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Frame/Engine Number Tracking</DialogTitle>
            <DialogDescription>Search and track bikes by frame or engine number</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search-number">Frame or Engine Number</Label>
              <Input
                id="search-number"
                placeholder="Enter frame number (ME4PC41A5JK123456) or engine number (JC41E1234567)"
              />
            </div>
            <Button className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>

            {/* Search Results */}
            <div className="space-y-3">
              <h4 className="font-semibold">Search Results:</h4>
              {bikeInventoryAdvanced.slice(0, 2).map((bike) => (
                <div key={bike.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {bike.model} - {bike.color}
                      </p>
                      <p className="text-sm text-muted-foreground">Frame: {bike.frameNumber}</p>
                      <p className="text-sm text-muted-foreground">Engine: {bike.engineNumber}</p>
                    </div>
                    <Badge variant={bike.status === "available" ? "default" : "secondary"}>{bike.status}</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>
                      <strong>Location:</strong> {bike.location}
                    </p>
                    <p>
                      <strong>Condition:</strong> {bike.condition}
                    </p>
                    {bike.customer && (
                      <p>
                        <strong>Customer:</strong> {bike.customer}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Damage Stock Dialog */}
      <Dialog open={isDamageStockOpen} onOpenChange={setIsDamageStockOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Report Damage Stock</DialogTitle>
            <DialogDescription>Record damaged inventory items</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="damage-item">Select Item</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose item" />
                </SelectTrigger>
                <SelectContent>
                  {partsInventory.map((part) => (
                    <SelectItem key={part.id} value={part.id}>
                      {part.name} (Stock: {part.stock})
                    </SelectItem>
                  ))}
                  {bikeInventoryAdvanced.map((bike) => (
                    <SelectItem key={bike.id} value={bike.id}>
                      {bike.model} - {bike.frameNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="damage-quantity">Quantity Damaged</Label>
                <Input id="damage-quantity" type="number" placeholder="Enter quantity" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="damage-date">Date Discovered</Label>
                <Input id="damage-date" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="damage-reason">Damage Reason</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transport">Damage in Transport</SelectItem>
                  <SelectItem value="handling">Poor Handling</SelectItem>
                  <SelectItem value="storage">Storage Issues</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing Defect</SelectItem>
                  <SelectItem value="weather">Weather Damage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="damage-description">Damage Description</Label>
              <Input id="damage-description" placeholder="Detailed description of damage" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="damage-location">Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Where was damage found?" />
                </SelectTrigger>
                <SelectContent>
                  {stockLocations.map((location) => (
                    <SelectItem key={location.id} value={location.name}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDamageStockOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDamageStockOpen(false)}>Report Damage</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
