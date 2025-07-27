import React from "react";
import styles from "../../app/admin/dashboard/dashboard.module.css";
import { Product, Stats } from "../../types/admin";

interface OverviewSectionProps {
  products: Product[];
  stats: Stats;
}

export default function OverviewSection({
  products,
  stats,
}: OverviewSectionProps) {
  return (
    <div className={styles.overviewSection}>
      <h2 className={styles.sectionTitle}>نمای کلی</h2>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>☕</div>
          <div className={styles.statContent}>
            <h3>{stats.totalProducts}</h3>
            <p>محصولات</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📂</div>
          <div className={styles.statContent}>
            <h3>{stats.totalCategories}</h3>
            <p>دسته‌بندی‌ها</p>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className={styles.topProducts}>
        <h3>محبوب ترین های این ماه </h3>
        <div className={styles.productsList}>
          {products.slice(0, 4).map((product, index) => (
            <div key={product.id} className={styles.productItem}>
              <div className={styles.productRank}>#{index + 1}</div>
              <div className={styles.productInfo}>
                <h4>{product.name}</h4>
                <p>{product.category_name}</p>
              </div>
              <div className={styles.productRevenue}>
                {product.price?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
