"use client";
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import styles from "./Header.module.css";

interface HeaderProps {
  variant?: "transparent" | "solid";
}

const Header: React.FC<HeaderProps> = ({ variant = "transparent" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className={`${styles.header} ${styles[variant]}`}>
        <nav className={styles.nav}>
          <div className={styles.logoContainer}>
            <Image src="/logo-leon.png" alt="logo" width={70} height={70} />
          </div>

         

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {" "}
            <a href="/">صفحه اصلی</a>
            <a href="/menu">منوی فروشگاه</a>
            <a href="/contact">ارتباط با ما</a>
            <a href="/admin/login">ورود ادمین</a>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className={styles.hamburgerButton}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
