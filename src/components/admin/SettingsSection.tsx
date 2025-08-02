import React from "react";
import styles from "../../app/admin/dashboard/dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faStore,
  faMapMarkerAlt,
  faPhone,
  faSave,
  faShieldAlt,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

export default function SettingsSection() {
  return (
    <div className={styles.settingsSection}>
      <h2>
        <FontAwesomeIcon icon={faCog} />
        تنظیمات
      </h2>
      <div className={styles.settingsGrid}>
        <div className={styles.settingCard}>
          <h3>
            <FontAwesomeIcon icon={faStore} />
            تنظیمات عمومی
          </h3>
          <div className={styles.settingItem}>
            <label>
              <FontAwesomeIcon icon={faStore} />
              نام کافه
            </label>
            <input type="text" defaultValue="کافه لئون" />
          </div>
          <div className={styles.settingItem}>
            <label>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              آدرس
            </label>
            <input
              type="text"
              defaultValue="خیابان امام،جنب شیرینی سرای معینی،کافه لئون"
            />
          </div>
          <div className={styles.settingItem}>
            <label>
              <FontAwesomeIcon icon={faPhone} />
              شماره تماس
            </label>
            <input type="tel" defaultValue="۰۲۱-۱۲۳۴۵۶۷۸" />
          </div>
          <button className={styles.saveButton}>
            <FontAwesomeIcon icon={faSave} />
            ذخیره تغییرات
          </button>
        </div>

        <div className={styles.settingCard}>
          <h3>
            <FontAwesomeIcon icon={faShieldAlt} />
            تنظیمات امنیتی
          </h3>
          <div className={styles.settingItem}>
            <label>
              <FontAwesomeIcon icon={faKey} />
              رمز عبور فعلی
            </label>
            <input type="password" />
          </div>
          <div className={styles.settingItem}>
            <label>
              <FontAwesomeIcon icon={faKey} />
              رمز عبور جدید
            </label>
            <input type="password" />
          </div>
          <div className={styles.settingItem}>
            <label>
              <FontAwesomeIcon icon={faKey} />
              تکرار رمز عبور
            </label>
            <input type="password" />
          </div>
          <button className={styles.saveButton}>
            <FontAwesomeIcon icon={faSave} />
            تغییر رمز عبور
          </button>
        </div>
      </div>
    </div>
  );
}
