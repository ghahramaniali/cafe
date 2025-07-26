import React from "react";
import styles from "../../app/admin/dashboard/dashboard.module.css";

interface HeaderProps {
  isSidebarOpen: boolean;
  activeTab: string;
  onToggleSidebar: () => void;
}

export default function Header({
  isSidebarOpen,
  activeTab,
  onToggleSidebar,
}: HeaderProps) {
  const getTabTitle = () => {
    switch (activeTab) {
      case "overview":
        return "نمای کلی";
      case "products":
        return "مدیریت محصولات";
      case "categories":
        return "مدیریت دسته‌بندی‌ها";

      case "settings":
        return "تنظیمات";
      default:
        return "پنل مدیریت";
    }
  };

  return (
    <header className={styles.header}>
      <button className={styles.menuToggle} onClick={onToggleSidebar}>
        ☰
      </button>
      <div className={styles.headerTitle}>{getTabTitle()}</div>
      <div className={styles.userInfo}>
        <span>👤 ادمین</span>
      </div>
    </header>
  );
}
