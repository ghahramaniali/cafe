"use client";
import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { Product, Category, Stats } from "../../../types/admin";
import OverviewSection from "../../../components/admin/OverviewSection";
import ProductsSection from "../../../components/admin/ProductsSection";
import CategoriesSection from "../../../components/admin/CategoriesSection";
import SettingsSection from "../../../components/admin/SettingsSection";
import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";

// API Base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// API Service Functions
const apiService = {
  // Products
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
  },

  async createProductWithImage(
    productData: Partial<Product>,
    imageFile?: File
  ): Promise<Product> {
    const formData = new FormData();

    // Add product data
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Add image file if provided
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/products/with-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create product with image");
    return response.json();
  },

  async updateProduct(
    id: string,
    productData: Partial<Product>
  ): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to update product");
    return response.json();
  },

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    if (!response.ok) throw new Error("Failed to delete product");
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error("Failed to create category");
    return response.json();
  },

  async updateCategory(
    id: string,
    categoryData: Partial<Category>
  ): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error("Failed to update category");
    return response.json();
  },

  async deleteCategory(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    if (!response.ok) throw new Error("Failed to delete category");
  },
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Stats calculation - memoized to prevent unnecessary recalculations
  const stats: Stats = React.useMemo(
    () => ({
      totalProducts: products.length,
      totalCategories: categories.length,
    }),
    [products.length, categories.length]
  );

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsData, categoriesData] = await Promise.all([
        apiService.getProducts(),
        apiService.getCategories(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handler functions for data updates
  const handleProductUpdate = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  const handleCategoryUpdate = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>🔄</div>
          <p>در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>❌</div>
          <h3>خطا در بارگذاری داده‌ها</h3>
          <p>{error}</p>
          <button onClick={fetchData} className={styles.retryButton}>
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <Header
          isSidebarOpen={isSidebarOpen}
          activeTab={activeTab}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className={styles.content}>
          {activeTab === "overview" && (
            <OverviewSection products={products} stats={stats} />
          )}
          {activeTab === "products" && (
            <ProductsSection
              products={products}
              categories={categories}
              onProductUpdate={handleProductUpdate}
              onError={handleError}
            />
          )}
          {activeTab === "categories" && (
            <CategoriesSection
              categories={categories}
              products={products}
              onCategoryUpdate={handleCategoryUpdate}
              onError={handleError}
            />
          )}
          {activeTab === "settings" && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}
