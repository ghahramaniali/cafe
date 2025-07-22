"use client";
import styles from "./page.module.css";
import React from "react";
import Image from "next/image";

export default function Home() {
  const bestsellers = [
    {
      name: "لاته",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/latte.png",
    },
    {
      name: "ماکیاتو",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/cappuccino.png",
    },
    {
      name: "اسپرسو",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/espresso.png",
    },
    {
      name: "کاپوچینو",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/cappuccino.png",
    },
  ];

  const popularProducts = [
    {
      name: "اسپرسو",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/espresso.png",
    },
    {
      name: "کاپوچینو",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/cappuccino.png",
    },
    {
      name: "ماکیاتو",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/cappuccino.png",
    },
    {
      name: "لاته",
      desc: "قهوه 50% | شیر 50%",
      price: "46000 تومان",
      image: "/menu-items/latte.png",
    },
  ];

  const testimonials = [
    {
      name: "امین وطن پرست",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    },
    {
      name: "اشکان محمدی",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    },
    {
      name: "صالح بهرامی",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
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
      <section className={styles.categories}>
        <h2>دسته بندی محصولات</h2>
        <div className={styles.categoryGrid}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>☕</div>
            <span>تجهیزات</span>
          </div>
          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>🥤</div>
            <span>میکس های اسپرسو</span>
          </div>
          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>📦</div>
            <span>بیرون بر</span>
          </div>
          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>🫘</div>
            <span>انواع قهوه</span>
          </div>
          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>🥐</div>
            <span>شیرینی</span>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className={styles.bestsellers}>
        <h2>پرفروش ترین ها</h2>
        <div className={styles.productGrid}>
          {bestsellers.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <div className={styles.productPrice}>{product.price}</div>
              <button className={styles.orderButton}>سفارش</button>
            </div>
          ))}
        </div>
      </section>

      {/* Instant Coffee Promotion */}
      <section className={styles.instantCoffee}>
        <div className={styles.instantContent}>
          <div className={styles.instantImage}>
            <div className={styles.cupsIllustration}>
              <div className={styles.cup1}></div>
              <div className={styles.cup2}></div>
              <div className={styles.spillingCoffee}></div>
            </div>
          </div>
          <div className={styles.instantText}>
            <h2>انواع قهوه فوری</h2>
            <p>
              انواع قهوه فوری کلاسیک، کافی میکس، کافی میت، کاپوچینو، لاته،
              موکاچینو، هات چاکلت و نسکافه گلد
            </p>
            <button className={styles.buyNowButton}>همین حالا خرید کن</button>
          </div>
        </div>
      </section>

      {/* Most Popular */}
      <section className={styles.popular}>
        <h2>محبوب ترین ها</h2>
        <div className={styles.productGrid}>
          {popularProducts.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <div className={styles.productPrice}>{product.price}</div>
              <button className={styles.orderButton}>سفارش</button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2>نظرات مشتریان</h2>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>{testimonial.text}</p>
              <h4>{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <div className={styles.logoIcon}>☕</div>
              <span>CAFENA</span>
            </div>
            <div className={styles.contactInfo}>
              <p>شنبه تا پنج شنبه ۱۰ صبح تا ۱۷ بعد از ظهر</p>
              <p>جمعه ۱۰ صبح تا ۱۴ بعد از ظهر</p>
              <p>مشهد خیابان مطهری، مطهری 36، پلاک 10</p>
              <p>cafena@coffee.com</p>
              <p>02192024359</p>
            </div>
          </div>

          <div className={styles.footerSection}>
            <div className={styles.quickLinks}>
              <h4>دسترسی سریع</h4>
              <a href="#">قهوه</a>
              <a href="#">نوشیدنی پودری و فوری</a>
              <a href="#">چای و دمنوش</a>
              <a href="#">خوشمزه ها</a>
              <a href="#">تجهیزات قهوه</a>
            </div>
            <div className={styles.contactLinks}>
              <h4>ارتباط با ما</h4>
              <a href="#">درباره ما</a>
              <a href="#">پشتیبانی</a>
              <a href="#">ارتباط با ما</a>
              <a href="#">قوانین و مقررات</a>
              <a href="#">راهنمای خرید آنلاین</a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <div className={styles.companyDesc}>
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.newsletter}>
          <h4>اطلاع رسانی</h4>
          <p>ایمیلتان را وارد کنید تا از تخفیف ها باخبر شوید.</p>
          <div className={styles.newsletterForm}>
            <input type="email" placeholder="ایمیل خود را وارد کنید." />
            <button>ارسال</button>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>کلیه حقوق این سایت متعلق به قهوه کافینا می باشد.</p>
          <div className={styles.socialIcons}>
            <span>📘</span>
            <span>🐦</span>
            <span>📷</span>
            <span>📌</span>
            <span>🔍</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
