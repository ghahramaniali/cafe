import Link from "next/link";

const categories = [
  {
    name: "تجهیزات",
    slug: "equipment",
    icon: "☕",
    description: "Equipment",
  },
  {
    name: "میکس های اسپرسو",
    slug: "espresso-mixes",
    icon: "🫖",
    description: "Espresso Mixes",
  },
  {
    name: "بیرون بر",
    slug: "takeaway",
    icon: "🥤",
    description: "Takeaway",
  },
  {
    name: "انواع قهوه",
    slug: "coffee-types",
    icon: "🫘",
    description: "Types of Coffee",
  },
  {
    name: "شیرینی",
    slug: "pastry",
    icon: "🥐",
    description: "Pastry",
  },
];

const items = [
  { name: "Classic Espresso", slug: "classic-espresso" },
  { name: "Vanilla Latte", slug: "vanilla-latte" },
  { name: "Iced Cold Brew", slug: "iced-cold-brew" },
  { name: "Chocolate Croissant", slug: "chocolate-croissant" },
];

export default function MenuPage() {
  return (
    <div
      style={{
        fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
        padding: "2rem",
        backgroundColor: "#F8E4BE",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "right",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            color: "#25181A",
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          دسته بندی محصولات
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "3rem",
        }}
      >
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                backgroundColor: "#54372B",
                borderRadius: "12px",
                padding: "1.5rem",
                width: "120px",
                height: "120px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease",
                boxShadow: "0 4px 8px rgba(37, 24, 26, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "#775142";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#54372B";
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.5rem",
                  color: "#F8E4BE",
                }}
              >
                {category.icon}
              </div>
              <div
                style={{
                  color: "#F8E4BE",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  lineHeight: "1.2",
                }}
              >
                {category.name}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          textAlign: "right",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            color: "#25181A",
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          منو
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/item/${item.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <div
              style={{
                backgroundColor: "#54372B",
                borderRadius: "12px",
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 8px rgba(37, 24, 26, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.backgroundColor = "#7D5647";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#54372B";
              }}
            >
              <div
                style={{
                  color: "#F8E4BE",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {item.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
