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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Don't render mobile-specific styles until client-side hydration is complete
  const mobileStyles = isClient ? isMobile : false;

  // Contact data from Footer component
  const contactData = {
    phone: "09109705203",
    address: "خیابان امام، جنب شیرینی سرای معینی ",
    workingHours: {
      weekdays: "شنبه تا پنجشنبه: ۹:۰۰ - ۲۱:۰۰",
      friday: "جمعه: ۱۰:۰۰ - ۲۱:۰۰",
    },
    socialMedia: {
      instagram: "https://instagram.com/_leon_coffee",
      telegram: "https://t.me/a_vlz",
      whatsapp: "https://wa.me/989109705203",
    },
  };

  // Map coordinates
  const mapCoordinates = {
    lat: 36.399327,
    lng: 47.112999,
    zoom: 16,
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header variant="solid" />

      <div className={styles.content}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: mobileStyles ? "2rem" : "4rem",
          }}
        >
          {/* Contact Information */}
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "16px",
              padding: mobileStyles ? "1.5rem" : "3rem",
              color: "white",
              maxWidth: "1000px",
              width: "100%",
            }}
          >
            <h2
              style={{
                fontSize: mobileStyles ? "1.25rem" : "1.5rem",
                fontWeight: "500",
                margin: mobileStyles ? "0 0 2rem 0" : "0 0 3rem 0",
                textAlign: "center",
              }}
            >
              اطلاعات تماس
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: mobileStyles ? "1fr" : "repeat(2, 1fr)",
                gap: mobileStyles ? "1.5rem" : "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: mobileStyles ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    width: mobileStyles ? "40px" : "48px",
                    height: mobileStyles ? "40px" : "48px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: mobileStyles ? "1rem" : "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: mobileStyles ? "0.9rem" : "1rem",
                      fontWeight: "500",
                    }}
                  >
                    تلفن تماس
                  </h4>
                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: mobileStyles ? "0.9rem" : "1rem",
                      color: "#e5e7eb",
                    }}
                  >
                    {contactData.phone}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: mobileStyles ? "0.8rem" : "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    پاسخگویی در تمام ساعات کاری
                  </p>
                </div>
              </div>

              {/* <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: mobileStyles ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    width: mobileStyles ? "40px" : "48px",
                    height: mobileStyles ? "40px" : "48px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: mobileStyles ? "1rem" : "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: mobileStyles ? "0.9rem" : "1rem",
                      fontWeight: "500",
                    }}
                  >
                    ایمیل
                  </h4>
                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: mobileStyles ? "0.9rem" : "1rem",
                      color: "#e5e7eb",
                    }}
                  >
                    info@cafeleon.ir
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: mobileStyles ? "0.8rem" : "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    پاسخگویی در کمتر از ۲۴ ساعت
                  </p>
                </div> 
              </div> */}

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: mobileStyles ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    width: mobileStyles ? "40px" : "48px",
                    height: mobileStyles ? "40px" : "48px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: mobileStyles ? "1rem" : "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: mobileStyles ? "0.9rem" : "1rem",
                      fontWeight: "500",
                    }}
                  >
                    آدرس
                  </h4>
                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: mobileStyles ? "0.9rem" : "1rem",
                      color: "#e5e7eb",
                    }}
                  >
                    {contactData.address}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: mobileStyles ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    width: mobileStyles ? "40px" : "48px",
                    height: mobileStyles ? "40px" : "48px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: mobileStyles ? "1rem" : "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: mobileStyles ? "0.9rem" : "1rem",
                      fontWeight: "500",
                    }}
                  >
                    ساعات کاری
                  </h4>
                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: mobileStyles ? "0.9rem" : "1rem",
                      color: "#e5e7eb",
                    }}
                  >
                    {contactData.workingHours.weekdays}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: mobileStyles ? "0.8rem" : "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    {contactData.workingHours.friday}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div
              style={{
                marginTop: mobileStyles ? "2rem" : "3rem",
                paddingTop: mobileStyles ? "1.5rem" : "2rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: mobileStyles ? "1rem" : "1.1rem",
                  fontWeight: "500",
                  margin: mobileStyles ? "0 0 1rem 0" : "0 0 1.5rem 0",
                  textAlign: "center",
                }}
              >
                ما را در شبکه‌های اجتماعی دنبال کنید
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: mobileStyles ? "0.75rem" : "1rem",
                }}
              >
                {[
                  {
                    icon: faTelegram,
                    label: "تلگرام",
                    url: contactData.socialMedia.telegram,
                  },
                  {
                    icon: faInstagram,
                    label: "اینستاگرام",
                    url: contactData.socialMedia.instagram,
                  },
                  {
                    icon: faWhatsapp,
                    label: "واتساپ",
                    url: contactData.socialMedia.whatsapp,
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      width: mobileStyles ? "48px" : "56px",
                      height: mobileStyles ? "48px" : "56px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontSize: mobileStyles ? "1.25rem" : "1.5rem",
                      textDecoration: "none",
                      color: "white",
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
                  </a>
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
            padding: mobileStyles ? "1.5rem" : "3rem",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid #f0f0f0",
            marginBottom: mobileStyles ? "2rem" : "0",
          }}
        >
          <h2
            style={{
              color: "#1a1a1a",
              fontSize: mobileStyles ? "1.25rem" : "1.5rem",
              fontWeight: "500",
              margin: mobileStyles ? "0 0 1.5rem 0" : "0 0 2rem 0",
            }}
          >
            موقعیت ما روی نقشه
          </h2>
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid #e5e7eb",
              minHeight: mobileStyles ? "300px" : "400px",
              position: "relative",
            }}
          >
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                mapCoordinates.lng - 0.01
              },${mapCoordinates.lat - 0.01},${mapCoordinates.lng + 0.01},${
                mapCoordinates.lat + 0.01
              }&layer=mapnik&marker=${mapCoordinates.lat},${
                mapCoordinates.lng
              }`}
              style={{
                width: "100%",
                height: "100%",
                minHeight: mobileStyles ? "300px" : "400px",
                border: "none",
              }}
              title="موقعیت کافه لئون روی نقشه"
              allowFullScreen
              loading="lazy"
            />
            <div
              style={{
                /* position: "absolute", */
                bottom: "10px",
                left: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                color: "#374151",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(4px)",
              }}
            >
              <strong>کافه لئون</strong>
              <br />
              {contactData.address}
            </div>
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <a
              href={`https://maps.google.com/maps?q=${mapCoordinates.lat},${mapCoordinates.lng}&ll=${mapCoordinates.lat},${mapCoordinates.lng}&z=${mapCoordinates.zoom}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#1a1a1a",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#374151";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1a1a1a";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FontAwesomeIcon icon={faLocationDot} />
              مشاهده در گوگل مپ
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
