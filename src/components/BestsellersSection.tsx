import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import styles from "../app/page.module.css";
import { productsApi, Product } from "../utils/api";
import { getImageUrl } from "../utils/imageUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BestsellersSection: React.FC = () => {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        const favorites = await productsApi.getFavorites();

        // Shuffle the array and take first 4 items
        const shuffled = favorites.sort(() => 0.5 - Math.random());
        const randomFour = shuffled.slice(0, 4);

        setBestsellers(randomFour);
      } catch (err) {
        console.error("Error fetching bestsellers:", err);
        setError("Failed to load bestsellers");
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  if (loading) {
    return (
      <section className={styles.bestsellers}>
        <h2>محبوب ترین های این ماه</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="bestsellers-swiper"
        >
          {[1, 2, 3, 4].map((i) => (
            <SwiperSlide key={i}>
              <div className={styles.productCard}>
                <div
                  className={styles.productImage}
                  style={{ backgroundColor: "#f0f0f0", height: "200px" }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    height: "20px",
                    margin: "10px 0",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    height: "16px",
                    margin: "5px 0",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    height: "40px",
                    margin: "10px 0",
                  }}
                ></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.bestsellers}>
        <h2>محبوب ترین های این ماه</h2>
        <p style={{ textAlign: "center", color: "#666" }}>{error}</p>
      </section>
    );
  }

  return (
    <section className={styles.bestsellers}>
      <h2>محبوب ترین های این ماه</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={false}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="bestsellers-swiper"
      >
        {bestsellers.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem
              image={getImageUrl(product.image_url) || "/menu-items/coffee.png"}
              name={product.name}
              desc={product.description || ""}
              price={`${product.price.toLocaleString()} تومان`}
              useNextImage={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BestsellersSection;
