"use client";
import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import React, { useRef } from "react";

export default function Home() {
  const paginationRef = useRef(null);
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
    <div className={styles.heroBg + " w-screen"}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <img
          src="/public/placeholder-logo.svg"
          alt="Logo"
          className={styles.logo}
        />
        <div className={styles.topIcons}>
          <span className={styles.icon}>🔍</span>
          <span className={styles.icon}>☰</span>
        </div>
      </div>

      {/* Main Content */}
      <div className=" w-full">
        {/* Sidebar Pagination Navigation */}
        <div ref={paginationRef} className="swiper-sidebar-pagination"></div>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<div class='${styles.navItem} ${className}'>${
                index + 1
              }</div>`;
            },
          }}
        >
          {coffeeItems.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-gray-900 rounded-2xl mx-auto mx-8 p-8  shadow-lg flex flex-col items-center w-[90%]">
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
          flex-direction: row;
          position: absolute;
         
         
         
        
       
          z-index: 10;
        }
        /* Remove default Swiper bullet styles and show only numbers */
        .swiper-pagination-bullet {
          background: none !important;
          color: #fff !important; /* or your preferred color */
          width: auto !important;
          height: auto !important;
          opacity: 1 !important;
          border-radius: 0 !important;
          font-size: 1.2rem; /* adjust as needed */
          margin: 4px 0 !important;
          box-shadow: none !important;
          border: none !important;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .swiper-pagination-bullet-active {
          font-weight: bold;
          color: #ffd700 !important; /* highlight active number */
        }
        .swiper-pagination {
          display: flex !important;
          flex-direction: row !important;
          justify-content: center;
          align-items: center;
          position: static !important; /* or adjust as needed */
          margin-top: 16px; /* optional */
        }
      `}</style>
    </div>
  );
}
