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

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category_id === selectedCategory);

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header variant="solid" />

      {/* Page Title */}
      <div className={styles.pageTitle}></div>

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
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={false}
            loop={true}
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
            className="category-swiper py-2"
          >
            {/* All Categories Option */}
            <SwiperSlide className="py-2 my-2 md:p-0 md:m-0 sm:p-0!important sm:m-0!important">
              <div
                className={`${styles.categoryCard} ${
                  selectedCategory === "all" ? styles.activeCategory : ""
                } py-2 my-2 md:p-0 md:m-0 sm:p-0 sm:m-0`}
                onClick={() => handleCategoryClick("all")}
              >
                <div className={styles.categoryIcon}>🍽️</div>
                <h3 className={styles.categoryName}>همه آیتم ها</h3>
              </div>
            </SwiperSlide>

            {/* Individual Categories */}
            {categories.map((category) => (
              <SwiperSlide
                key={category.id}
                className="py-2 my-2 md:p-0 md:m-0 sm:p-0 sm:m-0"
              >
                <div
                  className={`${
                    styles.categoryCard
                  } py-2 my-2 md:p-0 md:m-0 sm:p-0 sm:m-0 ${
                    selectedCategory === category.id.toString()
                      ? styles.activeCategory
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id.toString())}
                >
                  <div
                    className={styles.categoryIcon}
                    style={{ backgroundColor: getCategoryColor(category.name) }}
                  >
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                </div>
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
                price={`${product.price.toLocaleString("fa-IR")} `}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
