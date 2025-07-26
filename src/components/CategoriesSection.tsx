import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../app/page.module.css";
import { categoriesApi, Category } from "../utils/api";
import { getImageUrl } from "../utils/imageUtils";

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("خطا در بارگذاری دسته‌بندی‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className={styles.categories}>
        <h2>دسته بندی محصولات</h2>
        <div className={styles.categoryGrid}>
          {[...Array(5)].map((_, idx) => (
            <div className={styles.categoryCard} key={idx}>
              <div className={styles.categoryIcon}>⏳</div>
              <span>در حال بارگذاری...</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.categories}>
        <h2>دسته بندی محصولات</h2>
        <div className={styles.categoryGrid}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>⚠️</div>
            <span>{error}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.categories}>
      <h2>دسته بندی محصولات</h2>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <div className={styles.categoryCard} key={category.id}>
            <div className={styles.categoryIcon}>
              <img
                src={getImageUrl(category.image_url) || "/logo-leon.png"}
                alt={category.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                }}
              />
            </div>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
