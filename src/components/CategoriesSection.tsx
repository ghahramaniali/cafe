import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Grid, Navigation, Pagination } from "swiper/modules";
import styles from "../app/page.module.css";
import { categoriesApi, Category } from "../utils/api";
import { getImageUrl } from "../utils/imageUtils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={false}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="bestsellers-swiper"
        >
          {[...Array(5)].map((_, idx) => (
            <SwiperSlide key={idx}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>⏳</div>
                <span>در حال بارگذاری...</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.categories}>
        <h2>دسته بندی محصولات</h2>
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
          <SwiperSlide>
            <div className={styles.categoryCard}>
              <div className={styles.categoryIcon}>⚠️</div>
              <span>{error}</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    );
  }

  return (
    <section className={styles.categories}>
      <h2>دسته بندی محصولات</h2>
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
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className={styles.categoryCard}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoriesSection;
