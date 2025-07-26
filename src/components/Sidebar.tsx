"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <Image src="/logo-leon.png" alt="logo" width={50} height={50} />
          <button className={styles.closeButton} onClick={onClose}>
            <span>×</span>
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <a href="/" onClick={onClose}>
            صفحه اصلی
          </a>
          <a href="/menu" onClick={onClose}>
            منوی فروشگاه
          </a>
          <a href="/contact" onClick={onClose}>
            ارتباط با ما
          </a>
          <a href="/admin/login" onClick={onClose}>
            ورود ادمین
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
