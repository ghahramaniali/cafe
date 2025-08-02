"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Main Sidebar */}
      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-300px",
          width: "300px",
          height: "100vh",
          background: "linear-gradient(135deg, #54372b 0%, #654321 100%)",
          zIndex: 999,
          transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.3)",
          direction: "rtl",
          fontFamily: '"IRANSansX Medium", "Tahoma", "Arial", sans-serif',
          overflowY: "auto",
        }}
      >
        <div className={styles.sidebarHeader}>
          <Image src="/logo-leon.png" alt="logo" width={50} height={50} />
          <button className={styles.closeButton} onClick={onClose}>
            <span>×</span>
          </button>
        </div>

        <nav
          className={`${styles.sidebarNav} ${isVisible ? styles.visible : ""}`}
        >
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
