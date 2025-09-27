"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ChevronLeft,
    ChevronRight,
    CalendarIcon,
    Clock,
    User,
} from "lucide-react";
import { format, isSameDay } from "date-fns";

// Demo appointments data
const appointments = [
    {
        id: "APT-001",
        title: "General Service - Hero Glamour",
        customer: "Vikash Gupta",
        time: "10:00 AM",
        duration: "1 hour",
        type: "service",
        mechanic: "Ravi Kumar",
        date: new Date(2024, 0, 22), // Jan 22, 2024
    },
    {
        id: "APT-002",
        title: "Oil Change - Hero Destini 125",
        customer: "Sunita Devi",
        time: "11:30 AM",
        duration: "30 mins",
        type: "service",
        mechanic: "Suresh Yadav",
        date: new Date(2024, 0, 22),
    },
    {
        id: "APT-003",
        title: "Brake Repair - Hero Xpulse 200",
        customer: "Manoj Tiwari",
        time: "2:00 PM",
        duration: "2 hours",
        type: "service",
        mechanic: "Ravi Kumar",
        date: new Date(2024, 0, 22),
    },
    {
        id: "APT-004",
        title: "Chain Maintenance - Hero Xtreme 160R",
        customer: "Priya Sharma",
        time: "9:00 AM",
        duration: "45 mins",
        type: "service",
        mechanic: "Suresh Yadav",
        date: new Date(2024, 0, 23), // Jan 23, 2024
    },
    {
        id: "APT-005",
        title: "Engine Tune-up - Hero Splendor Plus",
        customer: "Rajesh Kumar",
        time: "11:00 AM",
        duration: "2 hours",
        type: "service",
        mechanic: "Ravi Kumar",
        date: new Date(2024, 0, 23),
    },
    {
        id: "APT-006",
        title: "Bike Delivery - Hero Passion Pro",
        customer: "Amit Singh",
        time: "3:00 PM",
        duration: "30 mins",
        type: "delivery",
        mechanic: "Suresh Yadav",
        date: new Date(2024, 0, 24), // Jan 24, 2024
    },
];

export function CalendarView() {
    const [selectedDate, setSelectedDate] = useState<Date>(
        new Date(2024, 0, 22)
    );
    const [viewMode, setViewMode] = useState("day");

    const selectedDateAppointments = appointments.filter((apt) =>
        isSameDay(apt.date, selectedDate)
    );

    const getAppointmentTypeColor = (type: string) => {
        switch (type) {
            case "service":
                return "default";
            case "delivery":
                return "secondary";
            default:
                return "outline";
        }
    };

    const getDaysWithAppointments = () => {
        return appointments.map((apt) => apt.date);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-balance">
                        Calendar
                    </h1>
                    <p className="text-muted-foreground">
                        View and manage service appointments and deliveries
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Select value={viewMode} onValueChange={setViewMode}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Day View</SelectItem>
                            <SelectItem value="week">Week View</SelectItem>
                            <SelectItem value="month">Month View</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Today
                    </Button>
                </div>
            </div>

            {/* Calendar Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Calendar</span>
                            <div className="flex items-center space-x-1">
                                <Button variant="ghost" size="sm">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => date && setSelectedDate(date)}
                            modifiers={{
                                hasAppointments: getDaysWithAppointments(),
                            }}
                            modifiersStyles={{
                                hasAppointments: {
                                    backgroundColor: "hsl(var(--primary))",
                                    color: "hsl(var(--primary-foreground))",
                                    borderRadius: "6px",
                                },
                            }}
                            className="rounded-md border"
                        />
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <div className="w-3 h-3 bg-primary rounded-full"></div>
                                <span>Has appointments</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Appointments for Selected Date */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>
                            Appointments for{" "}
                            {format(selectedDate, "EEEE, MMMM d, yyyy")}
                        </CardTitle>
                        <CardDescription>
                            {selectedDateAppointments.length} appointment
                            {selectedDateAppointments.length !== 1 ? "s" : ""}{" "}
                            scheduled
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {selectedDateAppointments.length > 0 ? (
                            <div className="space-y-4">
                                {selectedDateAppointments
                                    .sort((a, b) =>
                                        a.time.localeCompare(b.time)
                                    )
                                    .map((appointment) => (
                                        <div
                                            key={appointment.id}
                                            className="p-4 border rounded-lg"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-2 h-8 bg-primary rounded-full"></div>
                                                    <div>
                                                        <h3 className="font-semibold">
                                                            {appointment.title}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            Customer:{" "}
                                                            {
                                                                appointment.customer
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={getAppointmentTypeColor(
                                                        appointment.type
                                                    )}
                                                >
                                                    {appointment.type}
                                                </Badge>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <span>
                                                        {appointment.time} (
                                                        {appointment.duration})
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span>
                                                        {appointment.mechanic}
                                                    </span>
                                                </div>
                                                <div className="flex justify-end">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">
                                    No appointments scheduled
                                </h3>
                                <p className="text-muted-foreground">
                                    Select a different date or create a new
                                    appointment.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            This Week
                        </CardTitle>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            Total appointments
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Services
                        </CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10</div>
                        <p className="text-xs text-muted-foreground">
                            Service bookings
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Deliveries
                        </CardTitle>
                        <User className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">
                            Bike deliveries
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Available Slots
                        </CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            Open time slots
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
