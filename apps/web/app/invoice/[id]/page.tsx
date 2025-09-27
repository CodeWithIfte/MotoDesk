"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Demo invoice data - in real app this would come from database
const invoiceData = {
  "INV-001": {
    id: "INV-001",
    date: "2024-01-20",
    customer: {
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      address: "123 Main Street, Dhaka, Bangladesh",
      nid: "1234567890123",
    },
    bike: {
      model: "Hero Xtreme 160R",
      engineNo: "JC51E1234567",
      chassisNo: "ME4PC41A5JK123457",
      color: "Red",
      year: 2024,
    },
    amount: 115000,
    paymentMethod: "Cash",
    vat: 11500,
    total: 126500,
  },
  "INV-002": {
    id: "INV-002",
    date: "2024-01-19",
    customer: {
      name: "Amit Singh",
      phone: "+91 9876543211",
      address: "456 Park Avenue, Dhaka, Bangladesh",
      nid: "9876543210987",
    },
    bike: {
      model: "Hero Passion Pro",
      engineNo: "JC51E7654321",
      chassisNo: "ME4PC41A5JK123458",
      color: "Blue",
      year: 2024,
    },
    amount: 68000,
    paymentMethod: "Bkash",
    vat: 6800,
    total: 74800,
  },
  "INV-003": {
    id: "INV-003",
    date: "2024-01-18",
    customer: {
      name: "Sunita Devi",
      phone: "+91 9876543212",
      address: "789 Garden Road, Dhaka, Bangladesh",
      nid: "5432167890123",
    },
    bike: {
      model: "Hero Destini 125",
      engineNo: "JC51E9876543",
      chassisNo: "ME4PC41A5JK123459",
      color: "Silver",
      year: 2024,
    },
    amount: 85000,
    paymentMethod: "Nagad",
    vat: 8500,
    total: 93500,
  },
}

export default function InvoicePage() {
  const params = useParams()
  const invoiceId = params.id as string
  const invoice = invoiceData[invoiceId as keyof typeof invoiceData]

  if (!invoice) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invoice Not Found</h1>
          <Link href="/bikes">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sales
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Actions - Hidden in print */}
      <div className="p-6 print:hidden">
        <div className="flex items-center justify-between mb-6">
          <Link href="/bikes">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sales
            </Button>
          </Link>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print Invoice
          </Button>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto p-6 print:p-0 print:max-w-none">
        <Card className="print:shadow-none print:border-none">
          <CardContent className="p-8 print:p-6">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-8">
              {/* Left Side - Company Logo and Name */}
              <div className="flex items-center space-x-4">
                {/* Motorcycle Logo */}
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-white fill-current">
                    <path d="M5 11h2v2H5zm12 0h2v2h-2zm-6-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6.5-2.5L19 8l-1.5-1.5L16 8l1.5 1.5zM7.5 6.5L6 8l1.5 1.5L9 8 7.5 6.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">SKY MOTORS</h1>
                  <p className="text-sm text-muted-foreground">Hero Honda Authorized Dealer</p>
                </div>
              </div>

              {/* Right Side - Invoice Info */}
              <div className="bg-red-600 text-white p-4 rounded-lg min-w-[200px]">
                <div className="text-center">
                  <div className="w-8 h-8 bg-white text-red-600 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                    A
                  </div>
                  <p className="font-semibold">Alm Ahmed Sagar</p>
                  <p className="text-sm opacity-90">Authorized Dealer</p>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Date:</span>
                    <span className="font-medium border-b border-dotted border-muted-foreground flex-1 pb-1">
                      {invoice.date}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Name (MR):</span>
                    <span className="font-medium border-b border-dotted border-muted-foreground flex-1 pb-1">
                      {invoice.customer.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">NIC Card:</span>
                    <span className="font-medium border-b border-dotted border-muted-foreground flex-1 pb-1">
                      {invoice.customer.nid}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Address:</span>
                    <span className="font-medium border-b border-dotted border-muted-foreground flex-1 pb-1">
                      {invoice.customer.address}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Mobile:</span>
                    <span className="font-medium border-b border-dotted border-muted-foreground flex-1 pb-1">
                      {invoice.customer.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold">S.N</th>
                    <th className="border border-border p-3 text-left font-semibold">Description</th>
                    <th className="border border-border p-3 text-left font-semibold">Model No</th>
                    <th className="border border-border p-3 text-right font-semibold">Amount (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3">1</td>
                    <td className="border border-border p-3">{invoice.bike.model}</td>
                    <td className="border border-border p-3">{invoice.bike.year}</td>
                    <td className="border border-border p-3 text-right font-medium">
                      ₹{invoice.amount.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3"></td>
                    <td className="border border-border p-3 text-muted-foreground">Engine No</td>
                    <td className="border border-border p-3">{invoice.bike.engineNo}</td>
                    <td className="border border-border p-3"></td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3"></td>
                    <td className="border border-border p-3 text-muted-foreground">Chassis No</td>
                    <td className="border border-border p-3">{invoice.bike.chassisNo}</td>
                    <td className="border border-border p-3"></td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3"></td>
                    <td className="border border-border p-3 text-muted-foreground">Color</td>
                    <td className="border border-border p-3">{invoice.bike.color}</td>
                    <td className="border border-border p-3"></td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3"></td>
                    <td className="border border-border p-3"></td>
                    <td className="border border-border p-3 font-semibold">VAT</td>
                    <td className="border border-border p-3 text-right font-medium">₹{invoice.vat.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-muted">
                    <td className="border border-border p-3"></td>
                    <td className="border border-border p-3"></td>
                    <td className="border border-border p-3 font-bold">Total</td>
                    <td className="border border-border p-3 text-right font-bold text-lg">
                      ₹{invoice.total.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Payment Method:</span>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <input type="radio" checked={invoice.paymentMethod === "Cash"} readOnly className="w-4 h-4" />
                    <span>Cash</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" checked={invoice.paymentMethod === "Card"} readOnly className="w-4 h-4" />
                    <span>Card</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" checked={invoice.paymentMethod === "Bank"} readOnly className="w-4 h-4" />
                    <span>Bank</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" checked={invoice.paymentMethod === "Nagad"} readOnly className="w-4 h-4" />
                    <span>Nagad</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" checked={invoice.paymentMethod === "Others"} readOnly className="w-4 h-4" />
                    <span>Others</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="border-b border-dotted border-muted-foreground pb-2 mb-2 h-16"></div>
                <p className="text-center font-medium">Customer Signature</p>
              </div>
              <div>
                <div className="border-b border-dotted border-muted-foreground pb-2 mb-2 h-16"></div>
                <p className="text-center font-medium">Authorized Signature</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between">
              {/* Motorcycle Graphic */}
              <div className="w-24 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-12 h-8 text-white fill-current">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>

              {/* Contact Information */}
              <div className="text-right space-y-1">
                <div className="flex items-center justify-end space-x-2">
                  <div className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">📞</span>
                  </div>
                  <span className="text-sm">01740-000000</span>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <div className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">✉</span>
                  </div>
                  <span className="text-sm">skymotors@gmail.com</span>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <div className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">📍</span>
                  </div>
                  <span className="text-sm">Dhanmondi Road</span>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <div className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">🌐</span>
                  </div>
                  <span className="text-sm">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:p-6 {
            padding: 1.5rem !important;
          }
          .print\\:max-w-none {
            max-width: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
        }
      `}</style>
    </div>
  )
}
