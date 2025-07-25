"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock data for dashboard
  const stats = {
    totalProducts: 24,
    totalCategories: 8,
    totalReviews: 156,
    activeCustomers: 89,
  };

  const recentReviews = [
    {
      id: "#001",
      customer: "علی محمدی",
      product: "کاپوچینو",
      rating: 5,
      comment: "عالی بود! طعم فوق‌العاده‌ای داشت.",
      status: "approved",
    },
    {
      id: "#002",
      customer: "فاطمه احمدی",
      product: "لاته",
      rating: 4,
      comment: "خیلی خوب بود، پیشنهاد می‌کنم.",
      status: "pending",
    },
    {
      id: "#003",
      customer: "محمد رضایی",
      product: "اسپرسو",
      rating: 5,
      comment: "بهترین اسپرسویی که خوردم!",
      status: "approved",
    },
    {
      id: "#004",
      customer: "زهرا کریمی",
      product: "موهیتو",
      rating: 3,
      comment: "قابل قبول بود.",
      status: "processing",
    },
  ];

  const topProducts = [
    { name: "کاپوچینو", sales: 45, revenue: "2,070,000" },
    { name: "لاته", sales: 38, revenue: "1,748,000" },
    { name: "اسپرسو", sales: 32, revenue: "1,472,000" },
    { name: "موهیتو", sales: 28, revenue: "1,400,000" },
  ];

  const renderOverview = () => (
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
          {recentReviews.map((review) => (
            <div key={review.id} className={styles.tableRow}>
              <span>{review.id}</span>
              <span>{review.customer}</span>
              <span>{review.product}</span>
              <span>{review.rating} ⭐</span>
              <span className={`${styles.status} ${styles[review.status]}`}>
                {review.status === "approved" && "تایید شده"}
                {review.status === "pending" && "در انتظار"}
                {review.status === "processing" && "در حال بررسی"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className={styles.topProducts}>
        <h3>محصولات پرفروش</h3>
        <div className={styles.productsList}>
          {topProducts.map((product, index) => (
            <div key={product.name} className={styles.productItem}>
              <div className={styles.productRank}>#{index + 1}</div>
              <div className={styles.productInfo}>
                <h4>{product.name}</h4>
                <p>{product.sales} فروش</p>
              </div>
              <div className={styles.productRevenue}>
                {product.revenue} تومان
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className={styles.productsSection}>
      <div className={styles.sectionHeader}>
        <h2>مدیریت محصولات</h2>
        <button className={styles.addButton}>+ افزودن محصول جدید</button>
      </div>

      <div className={styles.productsGrid}>
        {[
          { name: "کاپوچینو", price: "46,000", category: "قهوه", stock: 50 },
          { name: "لاته", price: "46,000", category: "قهوه", stock: 45 },
          { name: "اسپرسو", price: "46,000", category: "قهوه", stock: 60 },
          { name: "موهیتو", price: "50,000", category: "نوشیدنی", stock: 30 },
          { name: "لیموناد", price: "50,000", category: "نوشیدنی", stock: 25 },
          { name: "کوکتل", price: "50,000", category: "نوشیدنی", stock: 20 },
        ].map((product) => (
          <div key={product.name} className={styles.productCard}>
            <div className={styles.productImage}>
              <div className={styles.imagePlaceholder}>☕</div>
            </div>
            <div className={styles.productDetails}>
              <h3>{product.name}</h3>
              <p className={styles.productCategory}>{product.category}</p>
              <p className={styles.productPrice}>{product.price} تومان</p>
              <p className={styles.productStock}>موجودی: {product.stock}</p>
            </div>
            <div className={styles.productActions}>
              <button className={styles.editButton}>ویرایش</button>
              <button className={styles.deleteButton}>حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className={styles.categoriesSection}>
      <div className={styles.sectionHeader}>
        <h2>مدیریت دسته‌بندی‌ها</h2>
        <button className={styles.addButton}>+ افزودن دسته‌بندی جدید</button>
      </div>

      <div className={styles.categoriesGrid}>
        {[
          { name: "قهوه", count: 12, description: "انواع قهوه‌های داغ" },
          { name: "نوشیدنی", count: 8, description: "نوشیدنی‌های سرد" },
          { name: "پاستری", count: 6, description: "شیرینی و کیک" },
          { name: "کاپوچینو", count: 4, description: "انواع کاپوچینو" },
          { name: "لاته", count: 3, description: "انواع لاته" },
          { name: "اسپرسو", count: 5, description: "انواع اسپرسو" },
        ].map((category) => (
          <div key={category.name} className={styles.categoryCard}>
            <div className={styles.categoryIcon}>📂</div>
            <div className={styles.categoryDetails}>
              <h3>{category.name}</h3>
              <p className={styles.categoryDescription}>
                {category.description}
              </p>
              <p className={styles.categoryCount}>{category.count} محصول</p>
            </div>
            <div className={styles.categoryActions}>
              <button className={styles.editButton}>ویرایش</button>
              <button className={styles.deleteButton}>حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className={styles.reviewsSection}>
      <h2>مدیریت نظرات</h2>
      <div className={styles.reviewsTable}>
        <div className={styles.tableHeader}>
          <span>شماره نظر</span>
          <span>تاریخ</span>
          <span>مشتری</span>
          <span>محصول</span>
          <span>امتیاز</span>
          <span>نظر</span>
          <span>وضعیت</span>
          <span>عملیات</span>
        </div>
        {recentReviews.map((review) => (
          <div key={review.id} className={styles.tableRow}>
            <span>{review.id}</span>
            <span>۱۴۰۲/۱۰/۱۵</span>
            <span>{review.customer}</span>
            <span>{review.product}</span>
            <span>{review.rating} ⭐</span>
            <span className={styles.reviewComment}>{review.comment}</span>
            <span className={`${styles.status} ${styles[review.status]}`}>
              {review.status === "approved" && "تایید شده"}
              {review.status === "pending" && "در انتظار"}
              {review.status === "processing" && "در حال بررسی"}
            </span>
            <div className={styles.reviewActions}>
              <button className={styles.viewButton}>مشاهده</button>
              <button className={styles.approveButton}>تایید</button>
              <button className={styles.rejectButton}>رد</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className={styles.settingsSection}>
      <h2>تنظیمات</h2>
      <div className={styles.settingsGrid}>
        <div className={styles.settingCard}>
          <h3>تنظیمات عمومی</h3>
          <div className={styles.settingItem}>
            <label>نام کافه</label>
            <input type="text" defaultValue="کافه لئون" />
          </div>
          <div className={styles.settingItem}>
            <label>آدرس</label>
            <input type="text" defaultValue="تهران، خیابان ولیعصر" />
          </div>
          <div className={styles.settingItem}>
            <label>شماره تماس</label>
            <input type="tel" defaultValue="۰۲۱-۱۲۳۴۵۶۷۸" />
          </div>
          <button className={styles.saveButton}>ذخیره تغییرات</button>
        </div>

        <div className={styles.settingCard}>
          <h3>تنظیمات امنیتی</h3>
          <div className={styles.settingItem}>
            <label>رمز عبور فعلی</label>
            <input type="password" />
          </div>
          <div className={styles.settingItem}>
            <label>رمز عبور جدید</label>
            <input type="password" />
          </div>
          <div className={styles.settingItem}>
            <label>تکرار رمز عبور</label>
            <input type="password" />
          </div>
          <button className={styles.saveButton}>تغییر رمز عبور</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <Image
            src="/logo-leon.png"
            alt="Cafe Logo"
            width={50}
            height={50}
            className={styles.sidebarLogo}
          />
          <h2>پنل مدیریت</h2>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${
              activeTab === "overview" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            📊 نمای کلی
          </button>
          <button
            className={`${styles.navItem} ${
              activeTab === "products" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            ☕ محصولات
          </button>
          <button
            className={`${styles.navItem} ${
              activeTab === "categories" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("categories")}
          >
            📂 دسته‌بندی‌ها
          </button>
          <button
            className={`${styles.navItem} ${
              activeTab === "reviews" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            ⭐ نظرات
          </button>
          <button
            className={`${styles.navItem} ${
              activeTab === "settings" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ تنظیمات
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backLink}>
            🏠 بازگشت به سایت
          </Link>
          <button className={styles.logoutButton}>🚪 خروج</button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button
            className={styles.menuToggle}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <div className={styles.headerTitle}>
            {activeTab === "overview" && "نمای کلی"}
            {activeTab === "products" && "مدیریت محصولات"}
            {activeTab === "categories" && "مدیریت دسته‌بندی‌ها"}
            {activeTab === "reviews" && "مدیریت نظرات"}
            {activeTab === "settings" && "تنظیمات"}
          </div>
          <div className={styles.userInfo}>
            <span>👤 ادمین</span>
          </div>
        </header>

        <main className={styles.content}>
          {activeTab === "overview" && renderOverview()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "categories" && renderCategories()}
          {activeTab === "reviews" && renderReviews()}
          {activeTab === "settings" && renderSettings()}
        </main>
      </div>
    </div>
  );
}
