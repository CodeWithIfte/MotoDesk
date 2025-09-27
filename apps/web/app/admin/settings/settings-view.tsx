"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Settings, User, Bell, Shield, Database, Printer, Mail } from "lucide-react"

export function SettingsView() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Settings</h1>
          <p className="text-muted-foreground">Manage your dealership settings and preferences</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Dealership Information</span>
              </CardTitle>
              <CardDescription>Update your dealership details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealership-name">Dealership Name</Label>
                  <Input id="dealership-name" defaultValue="Hero Honda Showroom - Patna" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Owner Name</Label>
                  <Input id="owner-name" defaultValue="Rajesh Kumar Singh" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="123 Gandhi Maidan, Patna, Bihar - 800001" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+91 9876543210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="info@herohondapatna.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gst">GST Number</Label>
                  <Input id="gst" defaultValue="10AABCH9692R1Z5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealer-code">Dealer Code</Label>
                  <Input id="dealer-code" defaultValue="HH-PAT-001" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your operating hours and working days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="opening-time">Opening Time</Label>
                  <Input id="opening-time" type="time" defaultValue="09:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closing-time">Closing Time</Label>
                  <Input id="closing-time" type="time" defaultValue="18:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Working Days</Label>
                <div className="flex space-x-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Switch id={day} defaultChecked={day !== "Sun"} />
                      <Label htmlFor={day}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button>Update Hours</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Low Stock Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified when parts are running low</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Service Reminders</h4>
                    <p className="text-sm text-muted-foreground">Remind customers about upcoming services</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Daily Sales Report</h4>
                    <p className="text-sm text-muted-foreground">Receive daily sales summary via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Customer Registration</h4>
                    <p className="text-sm text-muted-foreground">Get notified when new customers register</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input id="notification-email" type="email" defaultValue="admin@herohondapatna.com" />
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Admin User</h4>
                    <p className="text-sm text-muted-foreground">admin@herohondapatna.com • Full Access</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Disable
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Sales Manager</h4>
                    <p className="text-sm text-muted-foreground">sales@herohondapatna.com • Sales & Customer Access</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Disable
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Service Manager</h4>
                    <p className="text-sm text-muted-foreground">service@herohondapatna.com • Service Access Only</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Disable
                    </Button>
                  </div>
                </div>
              </div>
              <Button>Add New User</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Data Backup</span>
              </CardTitle>
              <CardDescription>Manage your data backups and restore points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automatic Backup</h4>
                    <p className="text-sm text-muted-foreground">Automatically backup data daily at 2:00 AM</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Recent Backups</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Backup_2024-01-22_02-00.sql</p>
                        <p className="text-sm text-muted-foreground">Size: 2.4 MB • Created: Jan 22, 2024</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Backup_2024-01-21_02-00.sql</p>
                        <p className="text-sm text-muted-foreground">Size: 2.3 MB • Created: Jan 21, 2024</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button>Create Backup Now</Button>
                <Button variant="outline">Restore from Backup</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Integrations</span>
              </CardTitle>
              <CardDescription>Connect with external services and tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Printer className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Thermal Printer</h4>
                      <p className="text-sm text-muted-foreground">Print invoices and receipts</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Email Service</h4>
                      <p className="text-sm text-muted-foreground">Send automated emails to customers</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">SMS Gateway</h4>
                      <p className="text-sm text-muted-foreground">Send SMS notifications to customers</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
