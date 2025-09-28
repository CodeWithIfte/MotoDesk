export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      branches: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          dealer_id: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          dealer_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          dealer_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branches_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_communications: {
        Row: {
          communication_type: string
          customer_id: string | null
          id: string
          message: string | null
          sent_at: string | null
          sent_by: string | null
        }
        Insert: {
          communication_type: string
          customer_id?: string | null
          id?: string
          message?: string | null
          sent_at?: string | null
          sent_by?: string | null
        }
        Update: {
          communication_type?: string
          customer_id?: string | null
          id?: string
          message?: string | null
          sent_at?: string | null
          sent_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_communications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_communications_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_ledger: {
        Row: {
          amount: number
          balance: number | null
          created_at: string | null
          customer_id: string | null
          id: string
          invoice_id: string | null
          paid_amount: number | null
          status: string | null
        }
        Insert: {
          amount: number
          balance?: number | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          paid_amount?: number | null
          status?: string | null
        }
        Update: {
          amount?: number
          balance?: number | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          paid_amount?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_ledger_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_ledger_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          branch_id: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          nid_number: string | null
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          branch_id?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          nid_number?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          branch_id?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          nid_number?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      damage_stock: {
        Row: {
          branch_id: string | null
          id: string
          product_id: string | null
          quantity: number
          reason: string | null
          reported_at: string | null
          reported_by: string | null
        }
        Insert: {
          branch_id?: string | null
          id?: string
          product_id?: string | null
          quantity: number
          reason?: string | null
          reported_at?: string | null
          reported_by?: string | null
        }
        Update: {
          branch_id?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          reason?: string | null
          reported_at?: string | null
          reported_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "damage_stock_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "damage_stock_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dealers: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          owner_name: string | null
          phone: string | null
          subscription_plan: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          owner_name?: string | null
          phone?: string | null
          subscription_plan?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          owner_name?: string | null
          phone?: string | null
          subscription_plan?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      delivery_challans: {
        Row: {
          created_at: string | null
          customer_id: string | null
          delivery_date: string
          id: string
          invoice_id: string | null
          product_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          delivery_date?: string
          id?: string
          invoice_id?: string | null
          product_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          delivery_date?: string
          id?: string
          invoice_id?: string | null
          product_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_challans_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_challans_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_challans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      emi_plans: {
        Row: {
          created_at: string | null
          down_payment: number
          emi_amount: number
          emi_months: number
          id: string
          invoice_id: string | null
          next_due_date: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          down_payment: number
          emi_amount: number
          emi_months: number
          id?: string
          invoice_id?: string | null
          next_due_date: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          down_payment?: number
          emi_amount?: number
          emi_months?: number
          id?: string
          invoice_id?: string | null
          next_due_date?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emi_plans_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          expense_date: string
          id: string
          note: string | null
          payment_mode: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          expense_date?: string
          id?: string
          note?: string | null
          payment_mode: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          expense_date?: string
          id?: string
          note?: string | null
          payment_mode?: string
        }
        Relationships: []
      }
      gate_passes: {
        Row: {
          created_at: string | null
          delivery_challan_id: string | null
          gate_out_time: string | null
          id: string
          issued_by: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_challan_id?: string | null
          gate_out_time?: string | null
          id?: string
          issued_by?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_challan_id?: string | null
          gate_out_time?: string | null
          id?: string
          issued_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gate_passes_delivery_challan_id_fkey"
            columns: ["delivery_challan_id"]
            isOneToOne: false
            referencedRelation: "delivery_challans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gate_passes_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          invoice_date: string
          paid_amount: number | null
          payment_status: string | null
          sales_order_id: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          invoice_date?: string
          paid_amount?: number | null
          payment_status?: string | null
          sales_order_id?: string | null
          total_amount: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          invoice_date?: string
          paid_amount?: number | null
          payment_status?: string | null
          sales_order_id?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_sales_order_id_fkey"
            columns: ["sales_order_id"]
            isOneToOne: false
            referencedRelation: "sales_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      motorcycles: {
        Row: {
          chassis_number: string
          color: string | null
          created_at: string | null
          engine_number: string
          id: string
          insurance_expiry: string | null
          insurance_number: string | null
          product_id: string | null
          registration_number: string | null
          status: string | null
          updated_at: string | null
          warranty_expiry: string | null
          year: number | null
        }
        Insert: {
          chassis_number: string
          color?: string | null
          created_at?: string | null
          engine_number: string
          id?: string
          insurance_expiry?: string | null
          insurance_number?: string | null
          product_id?: string | null
          registration_number?: string | null
          status?: string | null
          updated_at?: string | null
          warranty_expiry?: string | null
          year?: number | null
        }
        Update: {
          chassis_number?: string
          color?: string | null
          created_at?: string | null
          engine_number?: string
          id?: string
          insurance_expiry?: string | null
          insurance_number?: string | null
          product_id?: string | null
          registration_number?: string | null
          status?: string | null
          updated_at?: string | null
          warranty_expiry?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "motorcycles_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          invoice_id: string | null
          payment_date: string | null
          payment_mode: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          payment_date?: string | null
          payment_mode: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          payment_date?: string | null
          payment_mode?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          parent_category: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          parent_category?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_category?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          branch_id: string | null
          brand: string | null
          category_id: string | null
          cost_price: number
          created_at: string | null
          id: string
          min_stock: number | null
          model: string | null
          name: string
          selling_price: number
          sku: string | null
          status: string | null
          taxable: boolean | null
          unit: string | null
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          branch_id?: string | null
          brand?: string | null
          category_id?: string | null
          cost_price: number
          created_at?: string | null
          id?: string
          min_stock?: number | null
          model?: string | null
          name: string
          selling_price: number
          sku?: string | null
          status?: string | null
          taxable?: boolean | null
          unit?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          branch_id?: string | null
          brand?: string | null
          category_id?: string | null
          cost_price?: number
          created_at?: string | null
          id?: string
          min_stock?: number | null
          model?: string | null
          name?: string
          selling_price?: number
          sku?: string | null
          status?: string | null
          taxable?: boolean | null
          unit?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_order_items: {
        Row: {
          id: string
          product_id: string | null
          purchase_order_id: string | null
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          id?: string
          product_id?: string | null
          purchase_order_id?: string | null
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          id?: string
          product_id?: string | null
          purchase_order_id?: string | null
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          branch_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          order_date: string | null
          status: string | null
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          order_date?: string | null
          status?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          order_date?: string | null
          status?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      quotations: {
        Row: {
          branch_id: string | null
          created_at: string | null
          created_by: string | null
          customer_id: string | null
          discount: number | null
          final_price: number
          id: string
          price: number
          product_id: string | null
          status: string | null
          validity_date: string | null
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          discount?: number | null
          final_price: number
          id?: string
          price: number
          product_id?: string | null
          status?: string | null
          validity_date?: string | null
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          discount?: number | null
          final_price?: number
          id?: string
          price?: number
          product_id?: string | null
          status?: string | null
          validity_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          order_date: string
          payment_terms: string
          product_id: string | null
          quotation_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          order_date?: string
          payment_terms: string
          product_id?: string | null
          quotation_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          order_date?: string
          payment_terms?: string
          product_id?: string | null
          quotation_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_orders_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      stock: {
        Row: {
          branch_id: string | null
          id: string
          product_id: string | null
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          branch_id?: string | null
          id?: string
          product_id?: string | null
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          branch_id?: string | null
          id?: string
          product_id?: string | null
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          branch_id: string | null
          created_at: string | null
          dealer_id: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          branch_id?: string | null
          created_at?: string | null
          dealer_id?: string | null
          email: string
          full_name?: string | null
          id: string
          is_active?: boolean | null
          last_login?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          branch_id?: string | null
          created_at?: string | null
          dealer_id?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_ledger: {
        Row: {
          amount: number
          balance: number | null
          created_at: string | null
          id: string
          paid_amount: number | null
          purchase_order_id: string | null
          status: string | null
          vendor_id: string | null
        }
        Insert: {
          amount: number
          balance?: number | null
          created_at?: string | null
          id?: string
          paid_amount?: number | null
          purchase_order_id?: string | null
          status?: string | null
          vendor_id?: string | null
        }
        Update: {
          amount?: number
          balance?: number | null
          created_at?: string | null
          id?: string
          paid_amount?: number | null
          purchase_order_id?: string | null
          status?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_ledger_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_ledger_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          branch_id: string | null
          company_name: string
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          branch_id?: string | null
          company_name: string
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          branch_id?: string | null
          company_name?: string
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendors_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      warranties: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          product_id: string | null
          status: string | null
          warranty_end: string
          warranty_start: string
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          status?: string | null
          warranty_end: string
          warranty_start: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          status?: string | null
          warranty_end?: string
          warranty_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "warranties_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "warranties_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      categories_with_counts: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          name: string | null
          parent_category: string | null
          product_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
