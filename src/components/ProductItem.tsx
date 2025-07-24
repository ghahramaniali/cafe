import React from "react";
import Image from "next/image";
import styles from "./ProductItem.module.css";

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
  return (
    <div className={styles.productCard}>
      {useNextImage ? (
        <Image
          className={styles.productImage}
          src={image}
          alt={name}
          width={200}
          height={200}
        />
      ) : (
        <img className={styles.productImage} src={image} alt={name} />
      )}
      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productDesc}>{desc}</p>
     
     { <button className={styles.orderButton} onClick={onOrderClick}>
     {price}
      </button>}
    </div>
  );
};

export default ProductItem;
