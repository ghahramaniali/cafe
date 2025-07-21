"use client";
import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  const coffeeItems = [
    {
      src: "/public/placeholder-cup1.svg",
      name: "Mochaccino",
      subtitle: "Dalgona",
      price: 20.5,
      desc: "Dalgona coffee Korean is a beverage made by whipping equal proportions of instant coffee powder, sugar, and hot water until it becomes creamy and then adding it to cold or hot milk.",
    },
    {
      src: "/public/placeholder-cup2.svg",
      name: "Espresso",
      subtitle: "Classic",
      price: 18.0,
      desc: "Classic espresso is a full-flavored, concentrated form of coffee served in shots. It is made by forcing pressurized hot water through very finely ground coffee beans.",
    },
    // Add more items as needed
  ];

  return (
    <div className={styles.heroBg}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <img
          src="/public/placeholder-logo.svg"
          alt="Logo"
          className={styles.logo}
        />
        <div className={styles.topIcons}>
          <span className={styles.icon}>🔍</span>
          <span className={styles.icon + " p-10 m-4 bg-red-500"}>☰</span>
          <span className="text-red-500">Hello</span>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.heroContent}>
        {/* Sidebar Pagination Navigation (global class, outside Swiper) */}
        <div className="swiper-sidebar-pagination"></div>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<div class='${styles.navItem} ${className}'>${(index + 1)
                .toString()
                .padStart(2, "0")}</div>`;
            },
            // el: ".swiper-sidebar-pagination",
          }}
        >
          {coffeeItems.map((item, idx) => (
            <SwiperSlide key={idx}>
              {/* Text and Actions */}
              <div className={styles.textBlock}>
                <h1 className={styles.title}>{item.name}</h1>
                <h2 className={styles.subtitle}>{item.subtitle}</h2>
                <p className={styles.desc}>{item.desc}</p>
                <div className={styles.infoRow}>
                  <span className={styles.price}>Price: ${item.price}</span>
                  <a href="#" className={styles.knowRecipe}>
                    Know Recipe &rarr;
                  </a>
                </div>
                <button className={styles.addToOrder}>
                  <span className={styles.cartIcon}>🛒</span> Add To Order
                </button>
              </div>
              {/* Coffee Cups */}
              <div className={styles.cupsBlock}>
                <img
                  src={item.src}
                  alt="Coffee Cup"
                  className={styles.cupImg}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Social Links */}
      <div className={styles.socialLinks}>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Google</a>
      </div>
      {/* Optional: fallback style for sidebar pagination */}
      <style>{`
        .swiper-sidebar-pagination {
          display: flex;
          flex-direction: column;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
