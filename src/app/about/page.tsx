"use client";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <div
      style={{
        fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
        direction: "rtl",
        backgroundColor: "#F8E4BE",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "4rem",
          padding: "0 2rem",
        }}
      >
        <h1
          style={{
            color: "#25181A",
            fontSize: "2.5rem",
            fontWeight: "bold",
            margin: "0 0 1rem 0",
          }}
        >
          درباره کافه لئون
        </h1>
        <p
          style={{
            color: "#54372B",
            fontSize: "1.1rem",
            margin: 0,
          }}
        >
          داستان ما و تعهدمان به ارائه بهترین تجربه قهوه
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Story Section */}
        <div
          style={{
            backgroundColor: "#DABB9E",
            borderRadius: "20px",
            padding: "3rem",
            marginBottom: "3rem",
            boxShadow: "0 8px 32px rgba(37, 24, 26, 0.1)",
          }}
        >
          <h2
            style={{
              color: "#25181A",
              fontSize: "1.8rem",
              fontWeight: "bold",
              margin: "0 0 1.5rem 0",
              textAlign: "center",
            }}
          >
            داستان ما
          </h2>
          <p
            style={{
              color: "#54372B",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              textAlign: "justify",
              margin: "0 0 1.5rem 0",
            }}
          >
            کافه لئون در سال ۱۳۹۵ با هدف ارائه بهترین تجربه قهوه و ایجاد فضایی
            گرم و دوستانه برای مشتریان عزیز تاسیس شد. ما معتقدیم که هر فنجان
            قهوه باید داستانی داشته باشد و هر جرعه آن خاطره‌ای خوش را تداعی کند.
          </p>
          <p
            style={{
              color: "#54372B",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              textAlign: "justify",
              margin: 0,
            }}
          >
            از همان ابتدا، تیم ما متعهد به استفاده از بهترین دانه‌های قهوه و
            تکنیک‌های بروز تهیه قهوه بوده است. ما با دقت فراوان، دانه‌های قهوه
            را از بهترین مزارع جهان انتخاب کرده و با مهارت و عشق، آنها را به
            نوشیدنی‌های خوشمزه تبدیل می‌کنیم.
          </p>
        </div>

        {/* Values Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#54372B",
              borderRadius: "15px",
              padding: "2rem",
              textAlign: "center",
              color: "#F8E4BE",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              ☕
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                margin: "0 0 1rem 0",
              }}
            >
              کیفیت برتر
            </h3>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              ما متعهد به ارائه بهترین کیفیت در تمام محصولات خود هستیم. از
              انتخاب دانه‌های قهوه تا تکنیک‌های تهیه، همه چیز با دقت و وسواس
              انجام می‌شود.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#54372B",
              borderRadius: "15px",
              padding: "2rem",
              textAlign: "center",
              color: "#F8E4BE",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              🌱
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                margin: "0 0 1rem 0",
              }}
            >
              پایداری محیطی
            </h3>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              ما به محیط زیست احترام می‌گذاریم و از محصولات سازگار با محیط زیست
              استفاده می‌کنیم. بسته‌بندی‌های ما قابل بازیافت و دوستدار طبیعت
              هستند.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#54372B",
              borderRadius: "15px",
              padding: "2rem",
              textAlign: "center",
              color: "#F8E4BE",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              ❤️
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                margin: "0 0 1rem 0",
              }}
            >
              عشق به مشتری
            </h3>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              رضایت مشتریان ما اولویت اول ماست. ما با عشق و دقت، هر فنجان قهوه
              را آماده کرده و تجربه‌ای منحصر به فرد برای شما فراهم می‌کنیم.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div
          style={{
            backgroundColor: "#DABB9E",
            borderRadius: "20px",
            padding: "3rem",
            marginBottom: "3rem",
            boxShadow: "0 8px 32px rgba(37, 24, 26, 0.1)",
          }}
        >
          <h2
            style={{
              color: "#25181A",
              fontSize: "1.8rem",
              fontWeight: "bold",
              margin: "0 0 1.5rem 0",
              textAlign: "center",
            }}
          >
            تیم ما
          </h2>
          <p
            style={{
              color: "#54372B",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              textAlign: "justify",
              margin: "0 0 1.5rem 0",
            }}
          >
            تیم کافه لئون متشکل از متخصصان با تجربه و علاقه‌مند به قهوه است. هر
            عضو تیم ما با عشق و مهارت، در ارائه بهترین تجربه به مشتریان مشارکت
            می‌کند.
          </p>
          <p
            style={{
              color: "#54372B",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              textAlign: "justify",
              margin: 0,
            }}
          >
            ما به طور مداوم در حال یادگیری و بهبود مهارت‌های خود هستیم تا
            بتوانیم جدیدترین تکنیک‌های تهیه قهوه را فرا گرفته و به مشتریان خود
            ارائه دهیم.
          </p>
        </div>

        {/* Contact Info */}
        <div
          style={{
            backgroundColor: "#54372B",
            borderRadius: "20px",
            padding: "3rem",
            textAlign: "center",
            color: "#F8E4BE",
            marginBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              margin: "0 0 1.5rem 0",
            }}
          >
            با ما در ارتباط باشید
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📞</div>
              <h4 style={{ margin: "0 0 0.5rem 0" }}>تلفن تماس</h4>
              <p style={{ margin: 0 }}>۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
            <div>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📧</div>
              <h4 style={{ margin: "0 0 0.5rem 0" }}>ایمیل</h4>
              <p style={{ margin: 0 }}>info@cafeleon.ir</p>
            </div>
            <div>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📍</div>
              <h4 style={{ margin: "0 0 0.5rem 0" }}>آدرس</h4>
              <p style={{ margin: 0 }}>تهران، خیابان ولیعصر</p>
            </div>
          </div>
          <Link
            href="/contact"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <button
              style={{
                backgroundColor: "#DABB9E",
                color: "#25181A",
                border: "none",
                borderRadius: "25px",
                padding: "1rem 2rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C4A484";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#DABB9E";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              تماس با ما
            </button>
          </Link>
        </div>
      </div>

      {/* Back to Home */}
      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
          padding: "0 2rem",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <button
            style={{
              backgroundColor: "#54372B",
              color: "#F8E4BE",
              border: "none",
              borderRadius: "25px",
              padding: "1rem 2rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "1rem",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#775142";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#54372B";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            بازگشت به صفحه اصلی
          </button>
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
