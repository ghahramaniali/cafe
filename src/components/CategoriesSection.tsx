import React from "react";
import styles from "../app/page.module.css";

const categories = [
  { icon: "\u2615", name: "تجهیزات" },
  { icon: "\uD83E\uDD64", name: "میکس های اسپرسو" },
  { icon: "\uD83D\uDCE6", name: "بیرون بر" },
  { icon: "\uD83E\uDED8", name: "انواع قهوه" },
  { icon: "\uD83E\uDD50", name: "شیرینی" },
];

const CategoriesSection: React.FC = () => (
  <section className={styles.categories}>
    <h2>دسته بندی محصولات</h2>
    <div className={styles.categoryGrid}>
      {categories.map((cat, idx) => (
        <div className={styles.categoryCard} key={idx}>
          <div className={styles.categoryIcon}>{cat.icon}</div>
          <span>{cat.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default CategoriesSection;
