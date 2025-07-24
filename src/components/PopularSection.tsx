import React from "react";
import ProductItem from "./ProductItem";
import styles from "../app/page.module.css";

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

const PopularSection: React.FC = () => (
  <section className={styles.popular}>
    <h2>محبوب ترین ها</h2>
    <div className={styles.productGrid}>
      {popularProducts.map((product, index) => (
        <ProductItem
          key={index}
          image={product.image}
          name={product.name}
          desc={product.desc}
          price={product.price}
          useNextImage={false}
        />
      ))}
    </div>
  </section>
);

export default PopularSection;
