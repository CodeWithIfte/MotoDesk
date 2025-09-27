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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Plus,
  Search,
  Filter,
  CalendarIcon,
  Clock,
  User,
  Wrench,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
} from "lucide-react"
import { format } from "date-fns"

// Demo data
const serviceBookings = [
  {
    id: "SRV-001",
    customer: "Vikash Gupta",
    phone: "+91 9876543210",
    bike: "Hero Glamour",
    regNumber: "BR01AB1234",
    service: "General Service",
    description: "Regular maintenance and oil change",
    date: "2024-01-22",
    time: "10:00 AM",
    mechanic: "Ravi Kumar",
    status: "pending",
    estimatedCost: 1500,
    createdAt: "2024-01-20",
  },
  {
    id: "SRV-002",
    customer: "Sunita Devi",
    phone: "+91 9876543211",
    bike: "Hero Destini 125",
    regNumber: "BR01CD5678",
    service: "Oil Change",
    description: "Engine oil and filter replacement",
    date: "2024-01-22",
    time: "11:30 AM",
    mechanic: "Suresh Yadav",
    status: "in-progress",
    estimatedCost: 800,
    createdAt: "2024-01-19",
  },
  {
    id: "SRV-003",
    customer: "Manoj Tiwari",
    phone: "+91 9876543212",
    bike: "Hero Xpulse 200",
    regNumber: "BR01EF9012",
    service: "Brake Repair",
    description: "Front brake pads replacement and brake fluid change",
    date: "2024-01-22",
    time: "2:00 PM",
    mechanic: "Ravi Kumar",
    status: "completed",
    estimatedCost: 2200,
    actualCost: 2150,
    createdAt: "2024-01-18",
  },
  {
    id: "SRV-004",
    customer: "Priya Sharma",
    phone: "+91 9876543213",
    bike: "Hero Xtreme 160R",
    regNumber: "BR01GH3456",
    service: "Chain Maintenance",
    description: "Chain cleaning, lubrication and adjustment",
    date: "2024-01-23",
    time: "9:00 AM",
    mechanic: "Suresh Yadav",
    status: "pending",
    estimatedCost: 600,
    createdAt: "2024-01-21",
  },
  {
    id: "SRV-005",
    customer: "Rajesh Kumar",
    phone: "+91 9876543214",
    bike: "Hero Splendor Plus",
    regNumber: "BR01IJ7890",
    service: "Engine Tune-up",
    description: "Complete engine tuning and carburetor cleaning",
    date: "2024-01-23",
    time: "11:00 AM",
    mechanic: "Ravi Kumar",
    status: "cancelled",
    estimatedCost: 1800,
    createdAt: "2024-01-20",
  },
]

const mechanics = [
  { id: "M001", name: "Ravi Kumar", specialization: "Engine & Transmission", experience: "8 years" },
  { id: "M002", name: "Suresh Yadav", specialization: "Electrical & Brakes", experience: "5 years" },
  { id: "M003", name: "Amit Singh", specialization: "General Service", experience: "3 years" },
]

const serviceTypes = [
  "General Service",
  "Oil Change",
  "Brake Repair",
  "Chain Maintenance",
  "Engine Tune-up",
  "Electrical Repair",
  "Tire Replacement",
  "Battery Service",
  "Carburetor Cleaning",
  "Clutch Repair",
]

export function ServiceBooking() {
  const [activeTab, setActiveTab] = useState("bookings")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false)

  const filteredBookings = serviceBookings.filter((booking) => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bike.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.regNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && booking.date === "2024-01-22") ||
      (dateFilter === "tomorrow" && booking.date === "2024-01-23")
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "in-progress":
        return "default"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const todayBookings = serviceBookings.filter((b) => b.date === "2024-01-22")
  const pendingBookings = serviceBookings.filter((b) => b.status === "pending")
  const inProgressBookings = serviceBookings.filter((b) => b.status === "in-progress")
  const completedToday = serviceBookings.filter((b) => b.status === "completed" && b.date === "2024-01-22")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Service Booking</h1>
          <p className="text-muted-foreground">Manage service appointments and track repair status</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isNewBookingOpen} onOpenChange={setIsNewBookingOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Service Booking</DialogTitle>
                <DialogDescription>Schedule a new service appointment for a customer</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">Customer Name</Label>
                    <Input id="customer-name" placeholder="Enter customer name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-phone">Phone Number</Label>
                    <Input id="customer-phone" placeholder="+91 9876543210" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bike-model">Bike Model</Label>
                    <Input id="bike-model" placeholder="Hero Splendor Plus" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-number">Registration Number</Label>
                    <Input id="reg-number" placeholder="BR01AB1234" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the service requirements..." />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Service Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-time">Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimated-cost">Estimated Cost (₹)</Label>
                    <Input id="estimated-cost" type="number" placeholder="1500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mechanic">Assign Mechanic</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mechanic" />
                    </SelectTrigger>
                    <SelectContent>
                      {mechanics.map((mechanic) => (
                        <SelectItem key={mechanic.id} value={mechanic.name}>
                          {mechanic.name} - {mechanic.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsNewBookingOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsNewBookingOpen(false)}>Create Booking</Button>
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
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayBookings.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBookings.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting service</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressBookings.length}</div>
            <p className="text-xs text-muted-foreground">Being serviced</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday.length}</div>
            <p className="text-xs text-muted-foreground">Services finished</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="bookings">All Bookings</TabsTrigger>
          <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{booking.customer}</h3>
                        <Badge variant={getStatusColor(booking.status)} className="flex items-center space-x-1">
                          {getStatusIcon(booking.status)}
                          <span>{booking.status}</span>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Bike</p>
                          <p className="font-medium">{booking.bike}</p>
                          <p className="text-xs text-muted-foreground">{booking.regNumber}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Service</p>
                          <p className="font-medium">{booking.service}</p>
                          <p className="text-xs text-muted-foreground">{booking.description}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Schedule</p>
                          <p className="font-medium">{booking.date}</p>
                          <p className="text-xs text-muted-foreground">{booking.time}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Mechanic</p>
                          <p className="font-medium">{booking.mechanic}</p>
                          <p className="text-xs text-muted-foreground">
                            ₹{booking.actualCost || booking.estimatedCost}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedBooking(booking)}>
                            Update Status
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Update Service Status</DialogTitle>
                            <DialogDescription>
                              Update the status for {selectedBooking?.customer}'s service
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-status">New Status</Label>
                              <Select defaultValue={selectedBooking?.status}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="actual-cost">Actual Cost (₹)</Label>
                              <Input
                                id="actual-cost"
                                type="number"
                                defaultValue={selectedBooking?.actualCost || selectedBooking?.estimatedCost}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="notes">Notes</Label>
                              <Textarea id="notes" placeholder="Add any notes about the service..." />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => setIsUpdateStatusOpen(false)}>Update Status</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mechanics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mechanics.map((mechanic) => {
              const mechanicBookings = serviceBookings.filter((b) => b.mechanic === mechanic.name)
              const todayBookings = mechanicBookings.filter((b) => b.date === "2024-01-22")
              const inProgress = mechanicBookings.filter((b) => b.status === "in-progress")

              return (
                <Card key={mechanic.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{mechanic.name}</CardTitle>
                        <CardDescription>{mechanic.specialization}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Experience:</span>
                        <span className="text-sm font-medium">{mechanic.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Today's Jobs:</span>
                        <span className="text-sm font-medium">{todayBookings.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">In Progress:</span>
                        <span className="text-sm font-medium">{inProgress.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Jobs:</span>
                        <span className="text-sm font-medium">{mechanicBookings.length}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      View Schedule
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
