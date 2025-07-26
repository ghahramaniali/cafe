"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { productsApi, categoriesApi, Product, Category } from "../../utils/api";
import ProductItem from "../../components/ProductItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./page.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

export default function ShopMenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Category icons mapping
  const categoryIcons: { [key: string]: string } = {
    coffee: "🫘",
    espresso: "☕",
    latte: "🥛",
    cappuccino: "☕",
    cold: "🧊",
    pastry: "🥐",
    juice: "🍹",
    tea: "🫖",
    default: "☕",
  };

  // Category colors mapping
  const categoryColors: { [key: string]: string } = {
    coffee: "#8B4513",
    espresso: "#654321",
    latte: "#DEB887",
    cappuccino: "#D2691E",
    cold: "#4682B4",
    pastry: "#DAA520",
    juice: "#FF6347",
    tea: "#228B22",
    default: "#54372B",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setCategoriesLoading(true);

        // Fetch categories and products in parallel
        const [categoriesData, productsData] = await Promise.all([
          categoriesApi.getAll(),
          productsApi.getAvailable(),
        ]);

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategories([]);
        setProducts([]);
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (categoryName: string): string => {
    const lowerName = categoryName.toLowerCase();
    for (const [key, icon] of Object.entries(categoryIcons)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }
    return categoryIcons.default;
  };

  const getCategoryColor = (categoryName: string): string => {
    const lowerName = categoryName.toLowerCase();
    for (const [key, color] of Object.entries(categoryColors)) {
      if (lowerName.includes(key)) {
        return color;
      }
    }
    return categoryColors.default;
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category_id === selectedCategory);

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header variant="transparent" />

      {/* Page Title */}
      <div className={styles.pageTitle}>
        <h1>منوی کافه لئون</h1>
        <p>بهترین قهوه‌ها و نوشیدنی‌های گرم و سرد</p>
      </div>

      {/* Category Swiper */}
      <div className={styles.categorySwiperContainer}>
        {categoriesLoading ? (
          <div className={styles.categoriesLoading}>
            <div className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>در حال بارگذاری دسته‌بندی‌ها...</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, FreeMode]}
            spaceBetween={16}
            slidesPerView="auto"
            navigation={true}
            dir="rtl"
            pagination={{ clickable: true }}
            freeMode={true}
            className={styles.categorySwiper}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
          >
            {/* All Categories Option */}
            <SwiperSlide className={styles.categorySlide}>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`${styles.categoryButton} ${
                  selectedCategory === "all" ? styles.active : ""
                }`}
                style={
                  {
                    "--category-color": "#54372B",
                  } as React.CSSProperties
                }
              >
                <span className={styles.categoryIcon}>☕</span>
                <span className={styles.categoryName}>همه محصولات</span>
              </button>
            </SwiperSlide>

            {/* Dynamic Categories from Backend */}
            {categories.map((category) => (
              <SwiperSlide key={category.id} className={styles.categorySlide}>
                <button
                  onClick={() => setSelectedCategory(category.id.toString())}
                  className={`${styles.categoryButton} ${
                    selectedCategory === category.id.toString()
                      ? styles.active
                      : ""
                  }`}
                  style={
                    {
                      "--category-color": getCategoryColor(category.name),
                    } as React.CSSProperties
                  }
                >
                  <span className={styles.categoryIcon}>
                    {getCategoryIcon(category.name)}
                  </span>
                  <span className={styles.categoryName}>{category.name}</span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Products Section */}
      <div className={styles.productsSection}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingIcon}>☕</div>
            <p>در حال بارگذاری محصولات...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>😔</div>
            <p>محصولی در این دسته‌بندی یافت نشد</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductItem
                key={product.id}
                image={product.image_url || "/menu-items/coffee.png"}
                name={product.name}
                desc={product.description || ""}
                price={`${product.price.toLocaleString()} تومان`}
                useNextImage={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Back to Home */}
      <div className={styles.backToHome}>
        <Link href="/" className={styles.backButton}>
          بازگشت به صفحه اصلی
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
