import React from "react";
import styles from "../app/page.module.css";

const Footer = () => (
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
);

export default Footer; 