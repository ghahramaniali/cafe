import React from "react";
import styles from "../../app/admin/dashboard/dashboard.module.css";
import { Product, Category } from "../../types/admin";

interface ProductModalProps {
  show: boolean;
  editingProduct: Product | null;
  productForm: {
    name: string;
    category_id: string;
    price: string;
    description: string;
    image_url: string;
    is_available: boolean;
  };
  categories: Category[];
  imagePreview: string | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormKeyDown: (e: React.KeyboardEvent) => void;
}

export default function ProductModal({
  show,
  editingProduct,
  productForm,
  categories,
  imagePreview,
  onClose,
  onSubmit,
  onInputChange,
  onImageFileChange,
  onFormKeyDown,
}: ProductModalProps) {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}</h3>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className={styles.closeButton}
          >
            ✕
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          onKeyDown={onFormKeyDown}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
              placeholder="توضیحات محصول"
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label>تصویر محصول</label>
            <input
              type="file"
              accept="image/*"
              onChange={onImageFileChange}
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
            {editingProduct && !imagePreview && (
              <div
                style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}
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
                onChange={onInputChange}
              />
              محصول موجود است
            </label>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
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
  );
}
