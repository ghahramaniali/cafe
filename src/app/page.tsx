"use client";
import styles from "./page.module.css";
import React from "react";
import Image from "next/image";
import ProductItem from "../components/ProductItem";
import CategoriesSection from "../components/CategoriesSection";
import BestsellersSection from "../components/BestsellersSection";
import PopularSection from "../components/PopularSection";
import Footer from "../components/Footer";
import TestimonialsSection from "../components/TestimonialsSection";

export default function Home() {
  const menuItems = [
    {
      name: "موهیتو",
      desc: "نوشیدنی خنک و خوشمزه",
      price: "50000 تومان",
      image: "/menu-items/mojito.png",
    },
    {
      name: "لیموناد",
      desc: "نوشیدنی لیمویی تازه",
      price: "50000 تومان",
      image: "/menu-items/limonade.png",
    },
    {
      name: "کوکتل",
      desc: "نوشیدنی ترکیبی میوه",
      price: "50000 تومان",
      image: "/menu-items/coctail.png",
    },
    {
      name: "آب پرتقال",
      desc: "آب پرتقال طبیعی",
      price: "50000 تومان",
      image: "/menu-items/orange-juice.png",
    },
    {
      name: "آبمیوه ها",
      desc: "انواع آبمیوه تازه",
      price: "50000 تومان",
      image: "/menu-items/juices.png",
    },
    {
      name: "اسپرسو",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/espresso.png",
    },
    {
      name: "قهوه",
      desc: "قهوه تازه دم",
      price: "50000 تومان",
      image: "/menu-items/coffee.png",
    },
    {
      name: "لاته",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/latte.png",
    },
    {
      name: "کاپوچینو",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/cappuccino.png",
    },
    {
      name: "آیس کاپوچینو",
      desc: "کاپوچینو سرد و خوشمزه",
      price: "55000 تومان",
      image: "/menu-items/ice-cappuccino.png",
    },
  ];

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
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={`${styles.heroText} ${styles.gradientText}`}>
              خرید آنلاین انواع قهوه
            </h1>
            <p style={{ color: "#DABB9E" }}>
              فروشگاه اینترنتی قهوه، خرید انواع پودر و دان قهوه با قیمت مناسب
            </p>
            <button className={styles.ctaButton}>خرید و مشاوره</button>
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
          <Image src="/images/coffee-couple.png" alt="logo" width={200} height={70} />
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
      <PopularSection />

      {/* Full Menu */}
      <section className={styles.bestsellers}>
        <h2>منوی کامل</h2>
        <div className={styles.productGrid}>
          {menuItems.map((item, index) => (
            <ProductItem
              key={index}
              image={item.image}
              name={item.name}
              desc={item.desc}
              price={item.price}
              useNextImage={true}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
