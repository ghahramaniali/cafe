"use client";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTelegram,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Header from "../../components/Header";
import styles from "./page.module.css";

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header variant="solid" />

      <div className={styles.content}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: isMobile ? "2rem" : "4rem",
          }}
        >
          {/* Contact Information */}
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "16px",
              padding: isMobile ? "1.5rem" : "3rem",
              color: "white",
              maxWidth: "1000px",
              width: "100%",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "1.25rem" : "1.5rem",
                fontWeight: "500",
                margin: isMobile ? "0 0 2rem 0" : "0 0 3rem 0",
                textAlign: "center",
              }}
            >
              اطلاعات تماس
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: isMobile ? "1.5rem" : "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "40px" : "48px",
                    height: isMobile ? "40px" : "48px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "1rem" : "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "500",
                    }}
                  >
                    تلفن تماس
                  </h4>
                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      color: "#e5e7eb",
                    }}
                  >
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: isMobile ? "0.8rem" : "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    شنبه تا چهارشنبه: ۸ صبح تا ۸ شب
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "40px" : "48px",
                    height: isMobile ? "40px" : "48px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "1rem" : "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "500",
                    }}
                  >
                    ایمیل
                  </h4>
                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      color: "#e5e7eb",
                    }}
                  >
                    info@cafeleon.ir
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: isMobile ? "0.8rem" : "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    پاسخگویی در کمتر از ۲۴ ساعت
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "40px" : "48px",
                    height: isMobile ? "40px" : "48px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "1rem" : "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "500",
                    }}
                  >
                    آدرس
                  </h4>
                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      color: "#e5e7eb",
                    }}
                  >
                    تهران، خیابان ولیعصر
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: isMobile ? "0.8rem" : "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    پلاک ۱۲۳، طبقه همکف
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "40px" : "48px",
                    height: isMobile ? "40px" : "48px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "1rem" : "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "500",
                    }}
                  >
                    ساعات کاری
                  </h4>
                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      color: "#e5e7eb",
                    }}
                  >
                    شنبه تا چهارشنبه: ۸ صبح تا ۸ شب
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: isMobile ? "0.8rem" : "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    پنجشنبه: ۸ صبح تا ۶ عصر
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div
              style={{
                marginTop: isMobile ? "2rem" : "3rem",
                paddingTop: isMobile ? "1.5rem" : "2rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  fontWeight: "500",
                  margin: isMobile ? "0 0 1rem 0" : "0 0 1.5rem 0",
                  textAlign: "center",
                }}
              >
                ما را در شبکه‌های اجتماعی دنبال کنید
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: isMobile ? "0.75rem" : "1rem",
                }}
              >
                {[
                  { icon: faTelegram, label: "تلگرام" },
                  { icon: faInstagram, label: "اینستاگرام" },
                  { icon: faWhatsapp, label: "واتساپ" },
                ].map((social, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      width: isMobile ? "48px" : "56px",
                      height: isMobile ? "48px" : "56px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontSize: isMobile ? "1.25rem" : "1.5rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.2)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                    title={social.label}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: isMobile ? "1.5rem" : "3rem",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid #f0f0f0",
            marginBottom: isMobile ? "2rem" : "0",
          }}
        >
          <h2
            style={{
              color: "#1a1a1a",
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              fontWeight: "500",
              margin: isMobile ? "0 0 1.5rem 0" : "0 0 2rem 0",
            }}
          >
            موقعیت ما روی نقشه
          </h2>
          <div
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              padding: isMobile ? "2rem 1rem" : "4rem 2rem",
              color: "#64748b",
              fontSize: isMobile ? "0.9rem" : "1rem",
              border: "2px dashed #cbd5e1",
              minHeight: isMobile ? "200px" : "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            نقشه گوگل در اینجا نمایش داده خواهد شد
            <br />
            <span
              style={{
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                color: "#94a3b8",
                marginTop: "0.5rem",
                display: "inline-block",
              }}
            >
              تهران، خیابان ولیعصر، پلاک ۱۲۳
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
