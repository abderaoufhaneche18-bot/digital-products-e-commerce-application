export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  coverImage: string;
  downloadLink: string;
  rating: number;
  reviewCount: number;
  status: 'published' | 'draft';
  features: string[];
  createdAt: string;
}

export type Category = 'ebooks' | 'templates' | 'courses';

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  status: 'completed' | 'pending';
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
