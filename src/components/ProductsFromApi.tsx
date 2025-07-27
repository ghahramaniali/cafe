import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { getImageUrl } from "../utils/imageUtils";
import styles from "../app/page.module.css";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_name: string;
  is_available: boolean;
  is_favorite: boolean;
}

const ProductsFromApi: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${API_BASE_URL}/products?available=true`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("خطا در بارگذاری محصولات");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className={styles.bestsellers}>
        <h2>محصولات از دیتابیس</h2>
        <div className={styles.productGrid}>
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className={styles.productCard}>
              <div
                style={{
                  height: "200px",
                  background: "#f0f0f0",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ⏳ در حال بارگذاری...
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.bestsellers}>
        <h2>محصولات از دیتابیس</h2>
        <div className={styles.productGrid}>
          <div className={styles.productCard}>
            <div
              style={{
                height: "200px",
                background: "#f0f0f0",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ⚠️ {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.bestsellers}>
      <h2>محصولات از دیتابیس</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            image={getImageUrl(product.image_url) || "menu-items/coffee.png"} // fallback image
            name={product.name}
            desc={product.description || "بدون توضیحات"}
            price={`${product.price.toLocaleString()} `}
            useNextImage={true}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsFromApi;
