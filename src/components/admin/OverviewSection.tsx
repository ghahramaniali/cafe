import React from "react";
import styles from "../../app/admin/dashboard/dashboard.module.css";
import { Product, Review, Stats } from "../../types/admin";

interface OverviewSectionProps {
  products: Product[];
  reviews: Review[];
  stats: Stats;
}

export default function OverviewSection({
  products,
  reviews,
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

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statContent}>
            <h3>{stats.totalReviews}</h3>
            <p>نظرات</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statContent}>
            <h3>{stats.activeCustomers}</h3>
            <p>مشتریان فعال</p>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className={styles.recentReviews}>
        <h3>نظرات اخیر</h3>
        <div className={styles.reviewsTable}>
          <div className={styles.tableHeader}>
            <span>شماره نظر</span>
            <span>مشتری</span>
            <span>محصول</span>
            <span>امتیاز</span>
            <span>وضعیت</span>
          </div>
          {reviews.slice(0, 5).map((review) => (
            <div key={review.id} className={styles.tableRow}>
              <span>#{review.id}</span>
              <span>
                {review.first_name} {review.last_name}
              </span>
              <span>{review.product_name || "نامشخص"}</span>
              <span>{review.rating || 0} ⭐</span>
              <span
                className={`${styles.status} ${
                  styles[review.is_approved ? "approved" : "pending"]
                }`}
              >
                {review.is_approved ? "تایید شده" : "در انتظار"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className={styles.topProducts}>
        <h3>محصولات پرفروش</h3>
        <div className={styles.productsList}>
          {products.slice(0, 4).map((product, index) => (
            <div key={product.id} className={styles.productItem}>
              <div className={styles.productRank}>#{index + 1}</div>
              <div className={styles.productInfo}>
                <h4>{product.name}</h4>
                <p>{product.category_name}</p>
              </div>
              <div className={styles.productRevenue}>
                {product.price?.toLocaleString()} تومان
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
