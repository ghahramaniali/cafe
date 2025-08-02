import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../app/admin/dashboard/dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faCoffee,
  faFolder,
  faCog,
  faHome,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({
  isOpen,
  activeTab,
  onTabChange,
}: SidebarProps) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <Image
          src="/logo-leon.png"
          alt="Cafe Logo"
          width={50}
          height={50}
          className={styles.sidebarLogo}
        />
        <h2>پنل مدیریت</h2>
      </div>

      <nav className={styles.sidebarNav}>
        <button
          className={`${styles.navItem} ${
            activeTab === "overview" ? styles.active : ""
          }`}
          onClick={() => onTabChange("overview")}
        >
          <FontAwesomeIcon icon={faChartBar} />
          نمای کلی
        </button>
        <button
          className={`${styles.navItem} ${
            activeTab === "products" ? styles.active : ""
          }`}
          onClick={() => onTabChange("products")}
        >
          <FontAwesomeIcon icon={faCoffee} />
          محصولات
        </button>
        <button
          className={`${styles.navItem} ${
            activeTab === "categories" ? styles.active : ""
          }`}
          onClick={() => onTabChange("categories")}
        >
          <FontAwesomeIcon icon={faFolder} />
          دسته‌بندی‌ها
        </button>
        <button
          className={`${styles.navItem} ${
            activeTab === "settings" ? styles.active : ""
          }`}
          onClick={() => onTabChange("settings")}
        >
          <FontAwesomeIcon icon={faCog} />
          تنظیمات
        </button>
      </nav>

      <div className={styles.sidebarFooter}>
        <Link href="/" className={styles.backLink}>
          <FontAwesomeIcon icon={faHome} />
          بازگشت به سایت
        </Link>
        <button className={styles.logoutButton}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          خروج
        </button>
      </div>
    </div>
  );
}
