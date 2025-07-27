import React from "react";
import styles from "../../app/admin/dashboard/dashboard.module.css";

export default function SettingsSection() {
  return (
    <div className={styles.settingsSection}>
      <h2>تنظیمات</h2>
      <div className={styles.settingsGrid}>
        <div className={styles.settingCard}>
          <h3>تنظیمات عمومی</h3>
          <div className={styles.settingItem}>
            <label>نام کافه</label>
            <input type="text" defaultValue="کافه لئون" />
          </div>
          <div className={styles.settingItem}>
            <label>آدرس</label>
            <input type="text" defaultValue="خیابان امام،جنب شیرینی سرای معینی،کافه لئون" />
          </div>
          <div className={styles.settingItem}>
            <label>شماره تماس</label>
            <input type="tel" defaultValue="۰۲۱-۱۲۳۴۵۶۷۸" />
          </div>
          <button className={styles.saveButton}>ذخیره تغییرات</button>
        </div>

        <div className={styles.settingCard}>
          <h3>تنظیمات امنیتی</h3>
          <div className={styles.settingItem}>
            <label>رمز عبور فعلی</label>
            <input type="password" />
          </div>
          <div className={styles.settingItem}>
            <label>رمز عبور جدید</label>
            <input type="password" />
          </div>
          <div className={styles.settingItem}>
            <label>تکرار رمز عبور</label>
            <input type="password" />
          </div>
          <button className={styles.saveButton}>تغییر رمز عبور</button>
        </div>
      </div>
    </div>
  );
}
