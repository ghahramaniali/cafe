import React, { useState, useCallback } from "react";
import Image from "next/image";
import styles from "../../app/admin/dashboard/dashboard.module.css";
import { Product, Category } from "../../types/admin";
import { getImageUrl } from "../../utils/imageUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCoffee,
  faEdit,
  faTrash,
  faTimes,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

interface ProductsSectionProps {
  products: Product[];
  categories: Category[];
  onProductUpdate: (products: Product[]) => void;
  onError: (error: string) => void;
}

// API Base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://leoncafe.ir/backend/api";

export default function ProductsSection({
  products,
  categories,
  onProductUpdate,
  onError,
}: ProductsSectionProps) {
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
    image_url: "",
    is_available: true,
    is_favorite: false,
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // API Service Functions
  const apiService = {
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

    async updateProductWithImage(
      id: string,
      productData: Partial<Product>,
      imageFile?: File
    ): Promise<Product> {
      const formData = new FormData();

      // Add product data
      Object.entries(productData).forEach(([key, value]) => {
        console.warn(key, value);

        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Add image file if provided
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(
        `${API_BASE_URL}/products/${id}/with-image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: formData,
        }
      );
      if (!response.ok) throw new Error("Failed to update product with image");
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
  };

  // Product modal handlers
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      category_id: "",
      price: "",
      description: "",
      image_url: "",
      is_available: true,
      is_favorite: false,
    });
    setSelectedImageFile(null);
    setImagePreview(null);
    setShowProductModal(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category_id: product.category_id,
      price: product.price.toString(),
      description: product.description || "",
      image_url: product.image_url || "",
      is_available: product.is_available,
      is_favorite: product.is_favorite,
    });
    setSelectedImageFile(null);
    setImagePreview(product.image_url || null);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm({
      name: "",
      category_id: "",
      price: "",
      description: "",
      image_url: "",
      is_available: true,
      is_favorite: false,
    });
    setSelectedImageFile(null);
    setImagePreview(null);
  };

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      setProductForm((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    []
  );

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Prevent form submission on Enter key
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const handleProductSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Validate form data
      if (
        !productForm.name.trim() ||
        !productForm.category_id ||
        !productForm.price
      ) {
        onError("لطفاً تمام فیلدهای ضروری را پر کنید");
        return;
      }

      try {
        const productData = {
          ...productForm,
          price: parseFloat(productForm.price),
        };

        if (editingProduct) {
          // For editing, use the image upload endpoint if an image is selected
          if (selectedImageFile) {
            const updatedProduct = await apiService.updateProductWithImage(
              editingProduct.id,
              productData,
              selectedImageFile
            );
            const updatedProducts = products.map((p) =>
              p.id === editingProduct.id ? updatedProduct : p
            );
            onProductUpdate(updatedProducts);
          } else {
            const updatedProduct = await apiService.updateProduct(
              editingProduct.id,
              productData
            );
            const updatedProducts = products.map((p) =>
              p.id === editingProduct.id ? updatedProduct : p
            );
            onProductUpdate(updatedProducts);
          }
        } else {
          // For new products, use the image upload endpoint if an image is selected
          if (selectedImageFile) {
            const newProduct = await apiService.createProductWithImage(
              productData,
              selectedImageFile
            );
            onProductUpdate([...products, newProduct]);
          } else {
            const newProduct = await apiService.createProduct(productData);
            onProductUpdate([...products, newProduct]);
          }
        }

        closeProductModal();
      } catch (err) {
        onError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    },
    [
      productForm,
      editingProduct,
      selectedImageFile,
      products,
      onProductUpdate,
      onError,
    ]
  );

  // Product handlers
  const handleDeleteProduct = async (id: string) => {
    try {
      await apiService.deleteProduct(id);
      const updatedProducts = products.filter((p) => p.id !== id);
      onProductUpdate(updatedProducts);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  };

  return (
    <div className={styles.productsSection}>
      <div className={styles.sectionHeader}>
        <h2>مدیریت محصولات</h2>
        <button className={styles.addButton} onClick={openAddProductModal}>
          <FontAwesomeIcon icon={faPlus} />
          افزودن محصول جدید
        </button>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              {product.image_url ? (
                <Image
                  src={getImageUrl(product.image_url) || ""}
                  alt={product.name}
                  width={80}
                  height={80}
                  className={styles.productImage}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <FontAwesomeIcon icon={faCoffee} />
                </div>
              )}
            </div>
            <div className={styles.productDetails}>
              <h3>{product.name}</h3>
              <p className={styles.productCategory}>{product.category_name}</p>
              <p className={styles.productPrice}>
                {product.price?.toLocaleString("fa-IR")}
              </p>
              <p className={styles.productStock}>
                موجودی: {product.is_available ? "موجود" : "ناموجود"}
              </p>
              {product.is_favorite && (
                <p className={styles.productFavorite}>
                  <FontAwesomeIcon icon={faStar} />
                  محبوب
                </p>
              )}
            </div>
            <div className={styles.productActions}>
              <button
                className={styles.editButton}
                onClick={() => openEditProductModal(product)}
              >
                <FontAwesomeIcon icon={faEdit} />
                ویرایش
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteProduct(product.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}</h3>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeProductModal();
                }}
                className={styles.closeButton}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form
              onSubmit={handleProductSubmit}
              onKeyDown={handleFormKeyDown}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className={styles.modalForm}
            >
              <div className={styles.formGroup}>
                <label>نام محصول</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  required
                  placeholder="نام محصول را وارد کنید"
                />
              </div>

              <div className={styles.formGroup}>
                <label>دسته‌بندی</label>
                <select
                  name="category_id"
                  value={productForm.category_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>قیمت ()</label>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="قیمت محصول"
                />
              </div>

              <div className={styles.formGroup}>
                <label>توضیحات</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleInputChange}
                  placeholder="توضیحات محصول"
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>تصویر محصول</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  placeholder="انتخاب تصویر محصول"
                />
                {imagePreview && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}
                {editingProduct && !selectedImageFile && (
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    تصویر فعلی: {productForm.image_url || "بدون تصویر"}
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={productForm.is_available}
                    onChange={handleInputChange}
                  />
                  محصول موجود است
                </label>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="is_favorite"
                    checked={productForm.is_favorite}
                    onChange={handleInputChange}
                  />
                  محصول محبوب است
                </label>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeProductModal();
                  }}
                  className={styles.cancelButton}
                >
                  انصراف
                </button>
                <button type="submit" className={styles.submitButton}>
                  {editingProduct ? "ویرایش" : "افزودن"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
