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
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Plus, Search, Filter, Eye, Edit, Package, Tag, Bike, Zap, Settings, FileText, Upload } from "lucide-react"

// Product Categories
const productCategories = [
  {
    id: "CAT-001",
    name: "Motorcycles",
    description: "Complete motorcycle units",
    icon: Bike,
    parentId: null,
    status: "active",
    productCount: 8,
    subcategories: ["CAT-002", "CAT-003", "CAT-004"],
  },
  {
    id: "CAT-002",
    name: "Commuter Bikes",
    description: "Daily commuter motorcycles",
    icon: Bike,
    parentId: "CAT-001",
    status: "active",
    productCount: 4,
    subcategories: [],
  },
  {
    id: "CAT-003",
    name: "Sports Bikes",
    description: "Performance and sports motorcycles",
    icon: Zap,
    parentId: "CAT-001",
    status: "active",
    productCount: 2,
    subcategories: [],
  },
  {
    id: "CAT-004",
    name: "Scooters",
    description: "Automatic scooters",
    icon: Bike,
    parentId: "CAT-001",
    status: "active",
    productCount: 2,
    subcategories: [],
  },
  {
    id: "CAT-005",
    name: "Spare Parts",
    description: "Motorcycle spare parts and components",
    icon: Settings,
    parentId: null,
    status: "active",
    productCount: 25,
    subcategories: ["CAT-006", "CAT-007", "CAT-008"],
  },
  {
    id: "CAT-006",
    name: "Engine Parts",
    description: "Engine components and parts",
    icon: Settings,
    parentId: "CAT-005",
    status: "active",
    productCount: 12,
    subcategories: [],
  },
  {
    id: "CAT-007",
    name: "Body Parts",
    description: "Body panels and exterior parts",
    icon: Package,
    parentId: "CAT-005",
    status: "active",
    productCount: 8,
    subcategories: [],
  },
  {
    id: "CAT-008",
    name: "Electrical Parts",
    description: "Electrical components and wiring",
    icon: Zap,
    parentId: "CAT-005",
    status: "active",
    productCount: 5,
    subcategories: [],
  },
  {
    id: "CAT-009",
    name: "Accessories",
    description: "Motorcycle accessories and add-ons",
    icon: Package,
    parentId: null,
    status: "active",
    productCount: 15,
    subcategories: ["CAT-010", "CAT-011"],
  },
  {
    id: "CAT-010",
    name: "Safety Accessories",
    description: "Helmets, protective gear",
    icon: Package,
    parentId: "CAT-009",
    status: "active",
    productCount: 8,
    subcategories: [],
  },
  {
    id: "CAT-011",
    name: "Comfort Accessories",
    description: "Seats, grips, mirrors",
    icon: Package,
    parentId: "CAT-009",
    status: "active",
    productCount: 7,
    subcategories: [],
  },
]

// Products Database
const products = [
  // Motorcycles
  {
    id: "PROD-001",
    name: "Hero Splendor Plus",
    sku: "HSP-2024-001",
    categoryId: "CAT-002",
    category: "Commuter Bikes",
    description: "Reliable and fuel-efficient commuter motorcycle",
    specifications: {
      engine: "97.2cc, Single Cylinder, 4-Stroke",
      power: "8.02 PS @ 8000 rpm",
      mileage: "80-85 kmpl",
      fuelTank: "9.8 liters",
      weight: "112 kg",
    },
    pricing: {
      basePrice: 75000,
      dealerPrice: 70000,
      mrp: 78000,
      gst: 18,
    },
    inventory: {
      minStock: 5,
      maxStock: 20,
      reorderLevel: 8,
      currentStock: 12,
    },
    status: "active",
    brand: "Hero",
    model: "Splendor Plus",
    variant: "Standard",
    colors: ["Black", "Red", "Blue", "Silver"],
    images: ["/hero-splendor-plus.png"],
    createdDate: "2024-01-01",
    updatedDate: "2024-01-15",
  },
  {
    id: "PROD-002",
    name: "Hero Passion Pro",
    sku: "HPP-2024-001",
    categoryId: "CAT-002",
    category: "Commuter Bikes",
    description: "Stylish commuter with advanced features",
    specifications: {
      engine: "113.2cc, Single Cylinder, 4-Stroke",
      power: "9.15 PS @ 7500 rpm",
      mileage: "75-80 kmpl",
      fuelTank: "10 liters",
      weight: "118 kg",
    },
    pricing: {
      basePrice: 68000,
      dealerPrice: 64000,
      mrp: 71000,
      gst: 18,
    },
    inventory: {
      minStock: 5,
      maxStock: 15,
      reorderLevel: 7,
      currentStock: 9,
    },
    status: "active",
    brand: "Hero",
    model: "Passion Pro",
    variant: "Standard",
    colors: ["Black", "Red", "Blue"],
    images: ["/hero-passion-pro-motorcycle.jpg"],
    createdDate: "2024-01-01",
    updatedDate: "2024-01-15",
  },
  {
    id: "PROD-003",
    name: "Hero Xtreme 160R",
    sku: "HX160R-2024-001",
    categoryId: "CAT-003",
    category: "Sports Bikes",
    description: "Premium sports motorcycle with advanced features",
    specifications: {
      engine: "163cc, Single Cylinder, 4-Stroke",
      power: "15.2 PS @ 8500 rpm",
      mileage: "45-50 kmpl",
      fuelTank: "12 liters",
      weight: "138.5 kg",
    },
    pricing: {
      basePrice: 115000,
      dealerPrice: 110000,
      mrp: 120000,
      gst: 18,
    },
    inventory: {
      minStock: 3,
      maxStock: 10,
      reorderLevel: 5,
      currentStock: 6,
    },
    status: "active",
    brand: "Hero",
    model: "Xtreme 160R",
    variant: "Standard",
    colors: ["Red", "Black", "White"],
    images: ["/hero-xtreme-160r-sports-motorcycle.jpg"],
    createdDate: "2024-01-01",
    updatedDate: "2024-01-15",
  },
  {
    id: "PROD-004",
    name: "Hero Destini 125",
    sku: "HD125-2024-001",
    categoryId: "CAT-004",
    category: "Scooters",
    description: "Premium automatic scooter",
    specifications: {
      engine: "124.6cc, Single Cylinder, 4-Stroke",
      power: "9 PS @ 7000 rpm",
      mileage: "55-60 kmpl",
      fuelTank: "5.5 liters",
      weight: "111 kg",
    },
    pricing: {
      basePrice: 85000,
      dealerPrice: 80000,
      mrp: 88000,
      gst: 18,
    },
    inventory: {
      minStock: 3,
      maxStock: 12,
      reorderLevel: 5,
      currentStock: 7,
    },
    status: "active",
    brand: "Hero",
    model: "Destini 125",
    variant: "Standard",
    colors: ["White", "Black", "Blue"],
    images: ["/hero-destini-125-scooter.jpg"],
    createdDate: "2024-01-01",
    updatedDate: "2024-01-15",
  },
  // Spare Parts
  {
    id: "PROD-005",
    name: "Brake Pads Set",
    sku: "BP-HERO-001",
    categoryId: "CAT-007",
    category: "Body Parts",
    description: "High-quality brake pads for Hero motorcycles",
    specifications: {
      material: "Semi-metallic",
      compatibility: "Hero Splendor, Passion, Glamour",
      warranty: "6 months",
      brand: "Genuine Hero",
    },
    pricing: {
      basePrice: 800,
      dealerPrice: 720,
      mrp: 850,
      gst: 18,
    },
    inventory: {
      minStock: 20,
      maxStock: 100,
      reorderLevel: 30,
      currentStock: 45,
    },
    status: "active",
    brand: "Hero",
    model: "Universal",
    variant: "Standard",
    colors: ["Black"],
    images: ["/motorcycle-brake-pads.jpg"],
    createdDate: "2024-01-01",
    updatedDate: "2024-01-15",
  },
  {
    id: "PROD-006",
    name: "Air Filter",
    sku: "AF-HERO-001",
    categoryId: "CAT-006",
    category: "Engine Parts",
    description: "High-flow air filter for better engine performance",
    specifications: {
      material: "Paper element",
      compatibility: "Hero Splendor Plus, Passion Pro",
      warranty: "3 months",
      brand: "Genuine Hero",
    },
    pricing: {
      basePrice: 350,
      dealerPrice: 315,
      mrp: 380,
      gst: 18,
    },
    inventory: {
      minStock: 50,
      maxStock: 200,
      reorderLevel: 75,
      currentStock: 120,
    },
    status: "active",
    brand: "Hero",
    model: "Universal",
    variant: "Standard",
    colors: ["White"],
    images: ["/motorcycle-air-filter.jpg"],
    createdDate: "2024-01-01",
    updatedDate: "2024-01-15",
  },
]

export function ProductsManagement() {
  const [activeTab, setActiveTab] = useState("products")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.categoryId === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "discontinued":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStockStatus = (product: any) => {
    const { currentStock, minStock, reorderLevel } = product.inventory
    if (currentStock <= minStock) return { status: "critical", color: "destructive" }
    if (currentStock <= reorderLevel) return { status: "low", color: "secondary" }
    return { status: "good", color: "default" }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Products & Categories Management</h1>
          <p className="text-muted-foreground">Manage your product catalog, categories, and inventory settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Products
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export Catalog
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCategories.length}</div>
            <p className="text-xs text-muted-foreground">Product categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter((p) => p.inventory.currentStock <= p.inventory.reorderLevel).length}
            </div>
            <p className="text-xs text-muted-foreground">Need reorder</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45.2L</div>
            <p className="text-xs text-muted-foreground">Inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {productCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product)
              return (
                <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant={getStatusColor(product.status)}>{product.status}</Badge>
                      </div>
                      <Badge variant={stockStatus.color}>{stockStatus.status}</Badge>
                    </div>
                    <CardDescription>
                      {product.category} • {product.sku}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Brand:</span>
                        <span className="text-sm font-medium">{product.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">MRP:</span>
                        <span className="text-sm font-bold">₹{product.pricing.mrp.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Stock:</span>
                        <span className="text-sm font-medium">
                          {product.inventory.currentStock} / {product.inventory.maxStock}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            stockStatus.status === "critical"
                              ? "bg-red-500"
                              : stockStatus.status === "low"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{
                            width: `${(product.inventory.currentStock / product.inventory.maxStock) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProduct(product)
                          setIsProductDetailsOpen(true)
                        }}
                      >
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
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search categories..." className="pl-10" />
            </div>
            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>

          {/* Categories Tree */}
          <div className="space-y-4">
            {productCategories
              .filter((cat) => !cat.parentId)
              .map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <category.icon className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{category.productCount} products</Badge>
                        <Badge variant={getStatusColor(category.status)}>{category.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Subcategories */}
                    {category.subcategories.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Subcategories:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {category.subcategories.map((subId) => {
                            const subCategory = productCategories.find((cat) => cat.id === subId)
                            if (!subCategory) return null
                            return (
                              <div key={subId} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <subCategory.icon className="h-4 w-4" />
                                  <span className="text-sm font-medium">{subCategory.name}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {subCategory.productCount}
                                </Badge>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Products
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

        <TabsContent value="specifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications Templates</CardTitle>
              <CardDescription>Manage specification templates for different product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    category: "Motorcycles",
                    fields: ["Engine", "Power", "Mileage", "Fuel Tank", "Weight", "Brakes", "Suspension"],
                  },
                  {
                    category: "Spare Parts",
                    fields: ["Material", "Compatibility", "Warranty", "Brand", "Part Number"],
                  },
                  {
                    category: "Accessories",
                    fields: ["Material", "Color", "Size", "Compatibility", "Brand", "Warranty"],
                  },
                ].map((template) => (
                  <div key={template.category} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{template.category}</h3>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Template
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {template.fields.map((field) => (
                        <Badge key={field} variant="outline">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Rules & Margins</CardTitle>
              <CardDescription>Configure pricing rules and profit margins for different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    category: "Motorcycles",
                    baseMargin: 8,
                    dealerDiscount: 5,
                    gst: 18,
                    additionalCharges: ["Registration", "Insurance", "Extended Warranty"],
                  },
                  {
                    category: "Spare Parts",
                    baseMargin: 25,
                    dealerDiscount: 10,
                    gst: 18,
                    additionalCharges: ["Installation", "Labor"],
                  },
                  {
                    category: "Accessories",
                    baseMargin: 30,
                    dealerDiscount: 15,
                    gst: 18,
                    additionalCharges: ["Installation"],
                  },
                ].map((rule) => (
                  <div key={rule.category} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{rule.category}</h3>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Rule
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Base Margin</p>
                        <p className="font-medium">{rule.baseMargin}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dealer Discount</p>
                        <p className="font-medium">{rule.dealerDiscount}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">GST</p>
                        <p className="font-medium">{rule.gst}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Additional Charges</p>
                        <div className="flex flex-wrap gap-1">
                          {rule.additionalCharges.map((charge) => (
                            <Badge key={charge} variant="outline" className="text-xs">
                              {charge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Create a new product in your catalog</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="Hero Splendor Plus" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-sku">SKU</Label>
                  <Input id="product-sku" placeholder="HSP-2024-001" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-brand">Brand</Label>
                  <Input id="product-brand" placeholder="Hero" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea id="product-description" placeholder="Product description..." />
              </div>
            </div>

            <Separator />

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pricing</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base-price">Base Price (₹)</Label>
                  <Input id="base-price" type="number" placeholder="75000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealer-price">Dealer Price (₹)</Label>
                  <Input id="dealer-price" type="number" placeholder="70000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mrp">MRP (₹)</Label>
                  <Input id="mrp" type="number" placeholder="78000" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Inventory Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Inventory Settings</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-stock">Min Stock</Label>
                  <Input id="min-stock" type="number" placeholder="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-stock">Max Stock</Label>
                  <Input id="max-stock" type="number" placeholder="20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorder-level">Reorder Level</Label>
                  <Input id="reorder-level" type="number" placeholder="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-stock">Current Stock</Label>
                  <Input id="current-stock" type="number" placeholder="12" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline">Save Draft</Button>
              <Button onClick={() => setIsAddProductOpen(false)}>Add Product</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new product category</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input id="category-name" placeholder="Sports Bikes" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-category">Parent Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Root Category)</SelectItem>
                    {productCategories
                      .filter((cat) => !cat.parentId)
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-description">Description</Label>
              <Textarea id="category-description" placeholder="Category description..." />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddCategoryOpen(false)}>Add Category</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Details Dialog */}
      <Dialog open={isProductDetailsOpen} onOpenChange={setIsProductDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>
                  {selectedProduct.sku} • {selectedProduct.category}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Product Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Brand:</span>
                          <span>{selectedProduct.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Model:</span>
                          <span>{selectedProduct.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Variant:</span>
                          <span>{selectedProduct.variant}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant={getStatusColor(selectedProduct.status)}>{selectedProduct.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Pricing</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Base Price:</span>
                          <span>₹{selectedProduct.pricing.basePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dealer Price:</span>
                          <span>₹{selectedProduct.pricing.dealerPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">MRP:</span>
                          <span className="font-bold">₹{selectedProduct.pricing.mrp.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">GST:</span>
                          <span>{selectedProduct.pricing.gst}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Inventory</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Stock:</span>
                          <span className="font-bold">{selectedProduct.inventory.currentStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Min Stock:</span>
                          <span>{selectedProduct.inventory.minStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Stock:</span>
                          <span>{selectedProduct.inventory.maxStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reorder Level:</span>
                          <span>{selectedProduct.inventory.reorderLevel}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(selectedProduct.inventory.currentStock / selectedProduct.inventory.maxStock) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Available Colors</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color: string) => (
                          <Badge key={color} variant="outline">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {selectedProduct.specifications && (
                  <div>
                    <h3 className="font-semibold mb-2">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                          <span>{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Product
                  </Button>
                  <Button variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Update Stock
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
