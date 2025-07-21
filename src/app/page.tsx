import Link from "next/link";

const categories = [
  { name: "Espresso", path: "/category/espresso" },
  { name: "Latte", path: "/category/latte" },
  { name: "Cappuccino", path: "/category/cappuccino" },
  { name: "Cold Brew", path: "/category/cold-brew" },
  { name: "Pastries", path: "/category/pastries" },
];

const featuredItems = [
  {
    name: "Classic Espresso",
    slug: "classic-espresso",
    desc: "Rich, bold espresso shot.",
    price: "$3.00",
  },
  {
    name: "Vanilla Latte",
    slug: "vanilla-latte",
    desc: "Smooth espresso with vanilla.",
    price: "$4.50",
  },
  {
    name: "Iced Cold Brew",
    slug: "iced-cold-brew",
    desc: "Chilled, slow-brewed coffee.",
    price: "$4.00",
  },
  {
    name: "Chocolate Croissant",
    slug: "chocolate-croissant",
    desc: "Flaky pastry with chocolate.",
    price: "$3.50",
  },
];

export default function Home() {
  return (
    <div>
      <h1>Welcome to Cafe</h1>
      <p>Enjoy the best coffee and pastries in town!</p>
      <section style={{ margin: "2rem 0" }}>
        <h2>Shop by Category</h2>
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            padding: 0,
          }}
        >
          {categories.map((cat) => (
            <li key={cat.path}>
              <Link
                href={cat.path}
                style={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "#333",
                }}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section style={{ margin: "2rem 0" }}>
        <h2>Featured Items</h2>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {featuredItems.map((item) => (
            <div
              key={item.slug}
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 8,
                padding: "1rem",
                minWidth: 220,
              }}
            >
              <h3>
                <Link href={`/item/${item.slug}`}>{item.name}</Link>
              </h3>
              <p>{item.desc}</p>
              <p style={{ fontWeight: "bold" }}>{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
