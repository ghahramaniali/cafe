"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { productsApi, Product } from "../../utils/api";
import ProductItem from "../../components/ProductItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./page.module.css";

export default function ShopMenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "همه محصولات", icon: "☕" },
    { id: "coffee", name: "انواع قهوه", icon: "🫘" },
    { id: "espresso", name: "اسپرسو", icon: "☕" },
    { id: "latte", name: "لاته", icon: "🥛" },
    { id: "cappuccino", name: "کاپوچینو", icon: "☕" },
    { id: "cold", name: "نوشیدنی سرد", icon: "🧊" },
    { id: "pastry", name: "شیرینی", icon: "🥐" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productsApi.getAvailable();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) =>
          product.category_name
            ?.toLowerCase()
            .includes(selectedCategory.toLowerCase())
        );

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header variant="transparent" />

      {/* Page Title */}
      <div className={styles.pageTitle}>
        <h1>منوی فروشگاه کافه لئون</h1>
        <p>بهترین قهوه‌ها و نوشیدنی‌های گرم و سرد را تجربه کنید</p>
      </div>

      {/* Category Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "3rem",
          padding: "0 2rem",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              backgroundColor:
                selectedCategory === category.id ? "#54372B" : "#DABB9E",
              color: selectedCategory === category.id ? "#F8E4BE" : "#25181A",
              border: "none",
              borderRadius: "25px",
              padding: "0.75rem 1.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "0.9rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category.id) {
                e.currentTarget.style.backgroundColor = "#C4A484";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category.id) {
                e.currentTarget.style.backgroundColor = "#DABB9E";
              }
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div style={{ padding: "0 2rem" }}>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "#54372B",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              ☕
            </div>
            <p style={{ fontSize: "1.1rem" }}>در حال بارگذاری محصولات...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "#54372B",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              😔
            </div>
            <p style={{ fontSize: "1.1rem" }}>
              محصولی در این دسته‌بندی یافت نشد
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
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
      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
          padding: "0 2rem",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <button
            style={{
              backgroundColor: "#54372B",
              color: "#F8E4BE",
              border: "none",
              borderRadius: "25px",
              padding: "1rem 2rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "1rem",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#775142";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#54372B";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            بازگشت به صفحه اصلی
          </button>
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
