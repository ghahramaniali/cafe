import React, { useState, useCallback } from "react";
import styles from "../../app/admin/dashboard/dashboard.module.css";
import { Product, Category } from "../../types/admin";

interface CategoriesSectionProps {
  categories: Category[];
  products: Product[];
  onCategoryUpdate: (categories: Category[]) => void;
  onError: (error: string) => void;
}

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function CategoriesSection({
  categories,
  products,
  onCategoryUpdate,
  onError,
}: CategoriesSectionProps) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  // API Service Functions
  const apiService = {
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

  // Category modal handlers
  const openAddCategoryModal = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: "",
      description: "",
      image_url: "",
    });
    setShowCategoryModal(true);
  };

  const openEditCategoryModal = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || "",
      image_url: category.image_url || "",
    });
    setShowCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryForm({
      name: "",
      description: "",
      image_url: "",
    });
  };

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setCategoryForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleCategorySubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Validate form data
      if (!categoryForm.name.trim()) {
        onError("لطفاً نام دسته‌بندی را وارد کنید");
        return;
      }

      try {
        const categoryData = {
          ...categoryForm,
        };

        if (editingCategory) {
          const updatedCategory = await apiService.updateCategory(
            editingCategory.id,
            categoryData
          );
          const updatedCategories = categories.map((c) => 
            c.id === editingCategory.id ? updatedCategory : c
          );
          onCategoryUpdate(updatedCategories);
        } else {
          const newCategory = await apiService.createCategory(categoryData);
          onCategoryUpdate([...categories, newCategory]);
        }

        closeCategoryModal();
      } catch (err) {
        onError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    },
    [categoryForm, editingCategory, categories, onCategoryUpdate, onError]
  );

  // Category handlers
  const handleDeleteCategory = async (id: string) => {
    try {
      await apiService.deleteCategory(id);
      const updatedCategories = categories.filter((c) => c.id !== id);
      onCategoryUpdate(updatedCategories);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  };

  return (
    <div className={styles.categoriesSection}>
      <div className={styles.sectionHeader}>
        <h2>مدیریت دسته‌بندی‌ها</h2>
        <button className={styles.addButton} onClick={openAddCategoryModal}>
          + افزودن دسته‌بندی جدید
        </button>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <div className={styles.categoryIcon}>📂</div>
            <div className={styles.categoryDetails}>
              <h3>{category.name}</h3>
              <p className={styles.categoryDescription}>
                {category.description || "بدون توضیحات"}
              </p>
              <p className={styles.categoryCount}>
                {products.filter((p) => p.category_id === category.id).length}{" "}
                محصول
              </p>
            </div>
            <div className={styles.categoryActions}>
              <button 
                className={styles.editButton}
                onClick={() => openEditCategoryModal(category)}
              >
                ویرایش
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteCategory(category.id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className={styles.modalOverlay} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}</h3>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeCategoryModal();
                }}
                className={styles.closeButton}
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleCategorySubmit}
              className={styles.modalForm}
            >
              <div className={styles.formGroup}>
                <label>نام دسته‌بندی</label>
                <input
                  type="text"
                  name="name"
                  value={categoryForm.name}
                  onChange={handleInputChange}
                  required
                  placeholder="نام دسته‌بندی را وارد کنید"
                />
              </div>

              <div className={styles.formGroup}>
                <label>توضیحات</label>
                <textarea
                  name="description"
                  value={categoryForm.description}
                  onChange={handleInputChange}
                  placeholder="توضیحات دسته‌بندی"
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>آدرس تصویر</label>
                <input
                  type="text"
                  name="image_url"
                  value={categoryForm.image_url}
                  onChange={handleInputChange}
                  placeholder="آدرس تصویر دسته‌بندی"
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeCategoryModal();
                  }}
                  className={styles.cancelButton}
                >
                  انصراف
                </button>
                <button type="submit" className={styles.submitButton}>
                  {editingCategory ? "ویرایش" : "افزودن"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
