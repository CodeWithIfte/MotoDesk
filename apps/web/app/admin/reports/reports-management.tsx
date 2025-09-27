"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  FileText,
  DollarSign,
  Package,
  Users,
  Wrench,
  Eye,
  RefreshCw,
  Settings,
} from "lucide-react"

// Sample data for reports
const salesReports = [
  {
    id: "SR001",
    name: "Monthly Sales Summary",
    type: "Sales",
    period: "January 2024",
    status: "Generated",
    lastRun: "2024-01-31",
  },
  {
    id: "SR002",
    name: "Model-wise Performance",
    type: "Sales",
    period: "Q4 2023",
    status: "Scheduled",
    lastRun: "2024-01-15",
  },
  {
    id: "SR003",
    name: "Customer Analysis",
    type: "Customer",
    period: "December 2023",
    status: "Generated",
    lastRun: "2024-01-30",
  },
  {
    id: "SR004",
    name: "Service Revenue Report",
    type: "Service",
    period: "January 2024",
    status: "Generated",
    lastRun: "2024-01-31",
  },
]

const inventoryReports = [
  {
    id: "IR001",
    name: "Stock Movement Report",
    type: "Inventory",
    period: "January 2024",
    status: "Generated",
    lastRun: "2024-01-31",
  },
  {
    id: "IR002",
    name: "Low Stock Alert",
    type: "Inventory",
    period: "Current",
    status: "Generated",
    lastRun: "2024-02-01",
  },
  {
    id: "IR003",
    name: "Parts Consumption",
    type: "Parts",
    period: "Q4 2023",
    status: "Generated",
    lastRun: "2024-01-30",
  },
  {
    id: "IR004",
    name: "Damage Stock Report",
    type: "Inventory",
    period: "January 2024",
    status: "Generated",
    lastRun: "2024-01-31",
  },
]

const financialReports = [
  {
    id: "FR001",
    name: "Profit & Loss Statement",
    type: "Financial",
    period: "January 2024",
    status: "Generated",
    lastRun: "2024-01-31",
  },
  {
    id: "FR002",
    name: "Balance Sheet",
    type: "Financial",
    period: "January 2024",
    status: "Generated",
    lastRun: "2024-01-31",
  },
  {
    id: "FR003",
    name: "Cash Flow Statement",
    type: "Financial",
    period: "Q4 2023",
    status: "Generated",
    lastRun: "2024-01-30",
  },
  {
    id: "FR004",
    name: "Expense Analysis",
    type: "Financial",
    period: "January 2024",
    status: "Generated",
    lastRun: "2024-01-31",
  },
]

const kpiData = [
  { name: "Total Sales", value: "₹45,67,890", change: "+12.5%", trend: "up" },
  { name: "Units Sold", value: "156", change: "+8.2%", trend: "up" },
  { name: "Service Revenue", value: "₹8,45,670", change: "+15.3%", trend: "up" },
  { name: "Customer Satisfaction", value: "4.8/5", change: "+0.2", trend: "up" },
  { name: "Inventory Turnover", value: "6.2x", change: "-0.3", trend: "down" },
  { name: "Profit Margin", value: "18.5%", change: "+2.1%", trend: "up" },
]

export function ReportsManagement() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [isCustomReportDialogOpen, setIsCustomReportDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-4">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kpiData.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className={`text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {kpi.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Reports */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Sales Analytics</CardTitle>
                </div>
                <CardDescription>Comprehensive sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>This Month</span>
                    <span className="font-medium">₹45,67,890</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground">75% of monthly target</p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">Inventory Status</CardTitle>
                </div>
                <CardDescription>Stock levels and movement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Stock Value</span>
                    <span className="font-medium">₹25,00,000</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-muted-foreground">12 items low stock</p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">Customer Insights</CardTitle>
                </div>
                <CardDescription>Customer behavior analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Customers</span>
                    <span className="font-medium">1,245</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground">+15% new customers</p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Wrench className="h-5 w-5 text-orange-600" />
                  <CardTitle className="text-lg">Service Performance</CardTitle>
                </div>
                <CardDescription>Service department metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Service Revenue</span>
                    <span className="font-medium">₹8,45,670</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  <p className="text-xs text-muted-foreground">4.8/5 satisfaction</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Latest generated reports across all modules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...salesReports.slice(0, 2), ...inventoryReports.slice(0, 1), ...financialReports.slice(0, 2)].map(
                    (report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{report.lastRun}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === "Generated" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Reports Tab */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sales Reports</CardTitle>
                  <CardDescription>Comprehensive sales performance and analysis reports</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Current Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="current-quarter">Current Quarter</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="current-year">Current Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Sales Report</CardTitle>
                    <CardDescription>Day-wise sales breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Model Performance</CardTitle>
                    <CardDescription>Bike model sales analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <PieChart className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Salesperson Performance</CardTitle>
                    <CardDescription>Individual sales performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Users className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Analysis</CardTitle>
                    <CardDescription>Customer buying patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Analysis</CardTitle>
                    <CardDescription>Payment method breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Sales</CardTitle>
                    <CardDescription>Geographic sales distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{report.lastRun}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "Generated" ? "default" : "secondary"}>{report.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
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

        {/* Inventory Reports Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Reports</CardTitle>
              <CardDescription>Stock management and inventory analysis reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Stock Valuation</CardTitle>
                    <CardDescription>Current inventory value</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Package className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Stock Movement</CardTitle>
                    <CardDescription>Inventory in/out tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Aging Analysis</CardTitle>
                    <CardDescription>Stock age and turnover</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{report.lastRun}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "Generated" ? "default" : "secondary"}>{report.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
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

        {/* Financial Reports Tab */}
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Comprehensive financial analysis and statements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">P&L Statement</CardTitle>
                    <CardDescription>Profit and loss analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Balance Sheet</CardTitle>
                    <CardDescription>Financial position statement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <PieChart className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Cash Flow</CardTitle>
                    <CardDescription>Cash flow analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{report.lastRun}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "Generated" ? "default" : "secondary"}>{report.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
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

        {/* Custom Reports Tab */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Custom Reports</CardTitle>
                  <CardDescription>Create custom reports with specific parameters</CardDescription>
                </div>
                <Dialog open={isCustomReportDialogOpen} onOpenChange={setIsCustomReportDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      Create Custom Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create Custom Report</DialogTitle>
                      <DialogDescription>Configure your custom report parameters</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="report-name">Report Name</Label>
                        <Input id="report-name" placeholder="Enter report name" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="report-type">Report Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sales">Sales Report</SelectItem>
                              <SelectItem value="inventory">Inventory Report</SelectItem>
                              <SelectItem value="financial">Financial Report</SelectItem>
                              <SelectItem value="customer">Customer Report</SelectItem>
                              <SelectItem value="service">Service Report</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="report-format">Format</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="csv">CSV</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date-from">From Date</Label>
                          <Input id="date-from" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date-to">To Date</Label>
                          <Input id="date-to" type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="filters">Additional Filters</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select filters" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="model">By Model</SelectItem>
                            <SelectItem value="customer">By Customer</SelectItem>
                            <SelectItem value="salesperson">By Salesperson</SelectItem>
                            <SelectItem value="location">By Location</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCustomReportDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsCustomReportDialogOpen(false)}>Generate Report</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Custom Reports Yet</h3>
                <p className="text-muted-foreground mb-4">Create your first custom report to get started</p>
                <Button onClick={() => setIsCustomReportDialogOpen(true)}>Create Custom Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Reports Tab */}
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Manage automated report generation schedules</CardDescription>
                </div>
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Schedule New Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Monthly Sales Summary</TableCell>
                    <TableCell>
                      <Badge variant="outline">Sales</Badge>
                    </TableCell>
                    <TableCell>Monthly</TableCell>
                    <TableCell>2024-02-01</TableCell>
                    <TableCell>admin@herohonda.com</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Weekly Inventory Alert</TableCell>
                    <TableCell>
                      <Badge variant="outline">Inventory</Badge>
                    </TableCell>
                    <TableCell>Weekly</TableCell>
                    <TableCell>2024-01-29</TableCell>
                    <TableCell>manager@herohonda.com</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
