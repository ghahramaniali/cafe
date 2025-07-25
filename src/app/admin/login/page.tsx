"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./login.module.css";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement actual login logic here
      // For now, just simulate a login attempt
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate login validation
      if (formData.username === "admin" && formData.password === "admin123") {
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard";
      } else {
        setError("نام کاربری یا رمز عبور اشتباه است");
      }
    } catch (err) {
      setError("خطا در ورود به سیستم");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.logoSection}>
          <Image
            src="/logo-leon.png"
            alt="Cafe Logo"
            width={80}
            height={80}
            className={styles.logo}
          />
          
           
          <p className={styles.subtitle}>پنل مدیریت کافه</p>
          
         
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="نام کاربری خود را وارد کنید"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="رمز عبور خود را وارد کنید"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingText}>در حال ورود...</span>
            ) : (
              "ورود به سیستم"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/" className={styles.backLink}>
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}
