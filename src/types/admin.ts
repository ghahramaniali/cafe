export interface Product {
  id: string;
  name: string;
  category_id: string;
  category_name: string;
  price: number;
  description?: string;
  image_url?: string;
  is_available: boolean;
  is_favorite: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Stats {
  totalProducts: number;
  totalCategories: number;
}
