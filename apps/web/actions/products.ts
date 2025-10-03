'use server';

import { ProductSchema } from '@/app/admin/inventory/products/schema';
import { ProductWithCategory } from '@/app/admin/inventory/products/types';
import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

export const getProductsWithCategory = async (): Promise<ProductWithCategory[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:category_id(*)
    `)
    .returns<ProductWithCategory[]>();

  if (error) {
    throw new Error(`Error fetching products with categories: ${error.message}`);
  }

  return data || [];
};


export const createProduct = async (newProduct: ProductSchema) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('products').insert(newProduct);

  if (error) throw new Error(`Error creating product: ${error.message}`);

  revalidatePath('/admin/inventory');

  return data;
};


export const updateProduct = async (product: ProductSchema & { id: string }) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", product.id);

  if (error) throw new Error(`Error updating product: ${error.message}`);

  // revalidate the inventory page so updated data is visible
  revalidatePath("/admin/inventory");

  return data;
};