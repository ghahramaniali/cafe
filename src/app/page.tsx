"use client";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProductItem from "../components/ProductItem";
import CategoriesSection from "../components/CategoriesSection";
import BestsellersSection from "../components/BestsellersSection";
import { productsApi, Product } from "../utils/api";
import Footer from "../components/Footer";

export default function Home() {
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch all available products from the backend
        const products = await productsApi.getAvailable();

        // Randomly select 8 items
        const shuffled = products.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 8);

        setMenuItems(selectedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to empty array if API fails
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <Image src="/logo-leon.png" alt="logo" width={70} height={70} />
            <a href="#">منوی فروشگاه</a>

            <a href="#">ارتباط با ما</a>
            <a href="#">درباره ما</a>
            <a href="/admin/login">ورود ادمین</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={`${styles.heroText} ${styles.gradientText}`}>
              کافه لئون
            </h1>
            <p style={{ color: "#DABB9E" }}>
              تجربه‌ای متفاوت با بهترین قهوه‌ها و نوشیدنی‌های گرم و سرد
            </p>
            <button className={styles.ctaButton}>رفتن به منوی فروشگاه</button>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/images/Cup1.png"
              alt="Hero Image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <CategoriesSection />

      {/* Bestsellers */}
      <BestsellersSection />

      {/* Instant Coffee Promotion */}
      <section className={styles.instantCoffee}>
        <div className={styles.instantContent}>
          <div className={styles.instantImage}>
            <Image
              src="/images/coffee-couple.png"
              alt="logo"
              width={200}
              height={70}
            />
          </div>
          <div className={styles.instantText}>
            <h2>انواع قهوه فوری</h2>
            <p>
              انواع قهوه فوری کلاسیک، کافی میکس، کافی میت، کاپوچینو، لاته،
              موکاچینو، هات چاکلت و نسکافه گلد
            </p>
            <button className={styles.orderButton}>همین حالا خرید کن</button>
          </div>
        </div>
      </section>

      {/* Most Popular */}
      {/* <PopularSection /> */}

      {/* Full Menu */}
      <section className={styles.bestsellers}>
        <h2>منوی کامل</h2>
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>در حال بارگذاری...</p>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {menuItems.map((item) => (
              <ProductItem
                key={item.id}
                image={item.image_url || "/menu-items/coffee.png"}
                name={item.name}
                desc={item.description || ""}
                price={`${item.price.toLocaleString()} تومان`}
                useNextImage={true}
              />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      {/* <TestimonialsSection /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
