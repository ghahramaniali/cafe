"use client";
import React from "react";

import styles from "./ProductItem.module.css";
import { getImageUrl } from "../utils/imageUtils";

interface ProductItemProps {
  image: string;
  name: string;
  desc: string;
  price: string;
  onOrderClick?: () => void;
  useNextImage?: boolean; // fallback for <img> vs <Image>
}

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  name,
  desc,
  price,
  onOrderClick,
  useNextImage = false,
}) => {
  const processedImage = getImageUrl(image);
  console.warn(processedImage);

  // Check if the image URL is valid (not localhost or empty)
  const isValidImage =
    processedImage &&
    !processedImage.includes("localhost") &&
    !processedImage.includes("127.0.0.1") &&
    processedImage.trim() !== "";

  return (
    <div className={styles.productCard}>
      {isValidImage ? (
        <img
          className={styles.productImage}
          src={processedImage}
          alt={name}
          width={200}
          height={200}
        />
      ) : (
        <img
          className={styles.productImage}
          src={"/logo-leon.png"}
          alt={name}
        />
      )}
      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productDesc}>{desc}</p>

      {
        <button className={styles.orderButton} onClick={onOrderClick}>
          {price}
        </button>
      }
    </div>
  );
};

export default ProductItem;
