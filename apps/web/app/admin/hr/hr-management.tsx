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
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Users,
  Clock,
  DollarSign,
  Calendar,
  Award,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Calculator,
} from "lucide-react"

// Sample data
const employees = [
  {
    id: "EMP001",
    name: "Rajesh Kumar",
    position: "Sales Manager",
    department: "Sales",
    email: "rajesh@herohonda.com",
    phone: "+91 9876543210",
    joinDate: "2022-01-15",
    salary: 45000,
    status: "Active",
    attendance: 95,
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    position: "Service Advisor",
    department: "Service",
    email: "priya@herohonda.com",
    phone: "+91 9876543211",
    joinDate: "2022-03-20",
    salary: 35000,
    status: "Active",
    attendance: 92,
  },
  {
    id: "EMP003",
    name: "Amit Singh",
    position: "Mechanic",
    department: "Service",
    email: "amit@herohonda.com",
    phone: "+91 9876543212",
    joinDate: "2021-11-10",
    salary: 28000,
    status: "Active",
    attendance: 88,
  },
  {
    id: "EMP004",
    name: "Sunita Devi",
    position: "Accountant",
    department: "Finance",
    email: "sunita@herohonda.com",
    phone: "+91 9876543213",
    joinDate: "2023-02-01",
    salary: 40000,
    status: "Active",
    attendance: 97,
  },
]

const attendanceRecords = [
  {
    id: "ATT001",
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    date: "2024-01-31",
    checkIn: "09:00",
    checkOut: "18:00",
    status: "Present",
    hours: 9,
  },
  {
    id: "ATT002",
    employeeId: "EMP002",
    employeeName: "Priya Sharma",
    date: "2024-01-31",
    checkIn: "09:15",
    checkOut: "18:15",
    status: "Present",
    hours: 9,
  },
  {
    id: "ATT003",
    employeeId: "EMP003",
    employeeName: "Amit Singh",
    date: "2024-01-31",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
    hours: 0,
  },
  {
    id: "ATT004",
    employeeId: "EMP004",
    employeeName: "Sunita Devi",
    date: "2024-01-31",
    checkIn: "08:45",
    checkOut: "17:45",
    status: "Present",
    hours: 9,
  },
]

const payrollRecords = [
  {
    id: "PAY001",
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    month: "January 2024",
    basicSalary: 45000,
    allowances: 5000,
    deductions: 2000,
    netSalary: 48000,
    status: "Processed",
  },
  {
    id: "PAY002",
    employeeId: "EMP002",
    employeeName: "Priya Sharma",
    month: "January 2024",
    basicSalary: 35000,
    allowances: 3500,
    deductions: 1500,
    netSalary: 37000,
    status: "Processed",
  },
  {
    id: "PAY003",
    employeeId: "EMP003",
    employeeName: "Amit Singh",
    month: "January 2024",
    basicSalary: 28000,
    allowances: 2800,
    deductions: 1200,
    netSalary: 29600,
    status: "Pending",
  },
  {
    id: "PAY004",
    employeeId: "EMP004",
    employeeName: "Sunita Devi",
    month: "January 2024",
    basicSalary: 40000,
    allowances: 4000,
    deductions: 1800,
    netSalary: 42200,
    status: "Processed",
  },
]

const leaveRequests = [
  {
    id: "LR001",
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    type: "Sick Leave",
    from: "2024-02-05",
    to: "2024-02-07",
    days: 3,
    status: "Approved",
    reason: "Fever and cold",
  },
  {
    id: "LR002",
    employeeId: "EMP002",
    employeeName: "Priya Sharma",
    type: "Casual Leave",
    from: "2024-02-10",
    to: "2024-02-12",
    days: 3,
    status: "Pending",
    reason: "Personal work",
  },
  {
    id: "LR003",
    employeeId: "EMP003",
    employeeName: "Amit Singh",
    type: "Annual Leave",
    from: "2024-02-15",
    to: "2024-02-20",
    days: 6,
    status: "Approved",
    reason: "Family vacation",
  },
]

export function HRManagement() {
  const [activeTab, setActiveTab] = useState("employees")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false)
  const [isPayrollDialogOpen, setIsPayrollDialogOpen] = useState(false)

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || employee.department.toLowerCase() === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">91.7% attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,45,000</div>
            <p className="text-xs text-muted-foreground">January 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="leaves">Leave Management</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reports">HR Reports</TabsTrigger>
        </TabsList>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Management</CardTitle>
                  <CardDescription>Manage employee information and records</CardDescription>
                </div>
                <Dialog open={isEmployeeDialogOpen} onOpenChange={setIsEmployeeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Employee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Employee</DialogTitle>
                      <DialogDescription>Enter employee details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emp-name">Full Name</Label>
                          <Input id="emp-name" placeholder="Enter full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emp-position">Position</Label>
                          <Input id="emp-position" placeholder="Enter position" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emp-department">Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="admin">Administration</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emp-salary">Basic Salary</Label>
                          <Input id="emp-salary" type="number" placeholder="Enter salary" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emp-email">Email</Label>
                          <Input id="emp-email" type="email" placeholder="Enter email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emp-phone">Phone</Label>
                          <Input id="emp-phone" placeholder="Enter phone number" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emp-join-date">Join Date</Label>
                        <Input id="emp-join-date" type="date" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEmployeeDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsEmployeeDialogOpen(false)}>Add Employee</Button>
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
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="admin">Administration</SelectItem>
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
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{employee.department}</Badge>
                      </TableCell>
                      <TableCell>₹{employee.salary.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={employee.attendance} className="w-16 h-2" />
                          <span className="text-sm">{employee.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Attendance Management</CardTitle>
                  <CardDescription>Track employee attendance and working hours</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Input type="date" className="w-[150px]" />
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">22</div>
                    <p className="text-xs text-muted-foreground">Present Today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <p className="text-xs text-muted-foreground">Absent Today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-orange-600">1</div>
                    <p className="text-xs text-muted-foreground">Late Arrivals</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">91.7%</div>
                    <p className="text-xs text-muted-foreground">Overall Attendance</p>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employeeName}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.hours}h</TableCell>
                      <TableCell>
                        <Badge variant={record.status === "Present" ? "default" : "destructive"}>{record.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
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

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payroll Management</CardTitle>
                  <CardDescription>Process employee salaries and manage payroll</CardDescription>
                </div>
                <Dialog open={isPayrollDialogOpen} onOpenChange={setIsPayrollDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Calculator className="mr-2 h-4 w-4" />
                      Process Payroll
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Process Monthly Payroll</DialogTitle>
                      <DialogDescription>Generate payroll for selected month</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="payroll-month">Month</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="january">January 2024</SelectItem>
                              <SelectItem value="february">February 2024</SelectItem>
                              <SelectItem value="march">March 2024</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="payroll-department">Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Departments</SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Payroll Summary</Label>
                        <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
                          <div className="text-center">
                            <div className="text-2xl font-bold">₹8,45,000</div>
                            <p className="text-sm text-muted-foreground">Total Gross</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">₹1,25,000</div>
                            <p className="text-sm text-muted-foreground">Total Deductions</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">₹7,20,000</div>
                            <p className="text-sm text-muted-foreground">Net Payable</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsPayrollDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsPayrollDialogOpen(false)}>Process Payroll</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">₹8,45,000</div>
                    <p className="text-xs text-muted-foreground">Total Gross Salary</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">₹1,25,000</div>
                    <p className="text-xs text-muted-foreground">Total Deductions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">₹7,20,000</div>
                    <p className="text-xs text-muted-foreground">Net Payable</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">Employees Processed</p>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Basic Salary</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employeeName}</TableCell>
                      <TableCell>{record.month}</TableCell>
                      <TableCell>₹{record.basicSalary.toLocaleString()}</TableCell>
                      <TableCell>₹{record.allowances.toLocaleString()}</TableCell>
                      <TableCell>₹{record.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">₹{record.netSalary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === "Processed" ? "default" : "secondary"}>{record.status}</Badge>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave Management Tab */}
        <TabsContent value="leaves" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
              <CardDescription>Manage employee leave requests and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <p className="text-xs text-muted-foreground">Pending Requests</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <p className="text-xs text-muted-foreground">Approved This Month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <p className="text-xs text-muted-foreground">Rejected This Month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">Approval Rate</p>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>From Date</TableHead>
                    <TableHead>To Date</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.employeeName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.type}</Badge>
                      </TableCell>
                      <TableCell>{request.from}</TableCell>
                      <TableCell>{request.to}</TableCell>
                      <TableCell>{request.days}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "Approved"
                              ? "default"
                              : request.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {request.status === "Pending" && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
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

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Management</CardTitle>
              <CardDescription>Track employee performance and evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <CardTitle className="text-lg">Performance Reviews</CardTitle>
                    </div>
                    <CardDescription>Annual performance evaluations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Reviews
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">Goal Tracking</CardTitle>
                    </div>
                    <CardDescription>Employee goals and objectives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      View Goals
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-lg">Training Records</CardTitle>
                    </div>
                    <CardDescription>Employee training and development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Training
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      <CardTitle className="text-lg">Disciplinary Actions</CardTitle>
                    </div>
                    <CardDescription>Employee disciplinary records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <FileText className="mr-2 h-4 w-4" />
                      View Records
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center py-8">
                <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Performance Management Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced performance tracking features will be available soon
                </p>
                <Button variant="outline">Set Up Performance Reviews</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HR Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>HR Reports</CardTitle>
              <CardDescription>Generate comprehensive HR and payroll reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Employee Report</CardTitle>
                    <CardDescription>Complete employee information</CardDescription>
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
                    <CardTitle className="text-lg">Attendance Report</CardTitle>
                    <CardDescription>Attendance analysis and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Clock className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Payroll Report</CardTitle>
                    <CardDescription>Salary and payroll analysis</CardDescription>
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
                    <CardTitle className="text-lg">Leave Report</CardTitle>
                    <CardDescription>Leave patterns and analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Report</CardTitle>
                    <CardDescription>Employee performance metrics</CardDescription>
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
                    <CardTitle className="text-lg">Department Report</CardTitle>
                    <CardDescription>Department-wise analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Users className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
