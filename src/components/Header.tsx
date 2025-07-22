import React from "react";
import Link from "next/link";

const categories = [
  { name: "Espresso", path: "/category/espresso" },
  { name: "Latte", path: "/category/latte" },
  { name: "Cappuccino", path: "/category/cappuccino" },
  { name: "Cold Brew", path: "/category/cold-brew" },
  { name: "Pastries", path: "/category/pastries" },
];

const Header = () => (
  <header
    style={{
      background: "#fff",
      borderBottom: "1px solid #eee",
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
    }}
  >
    <Link
      href="/"
      style={{
        fontWeight: "bold",
        fontSize: "1.5rem",
        textDecoration: "none",
        color: "#333",
        fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
      }}
    >
      Cafe
    </Link>
    <nav>
      <ul
        style={{
          display: "flex",
          gap: "1.5rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
        }}
      >
        {categories.map((cat) => (
          <li key={cat.path}>
            <Link
              href={cat.path}
              style={{
                textDecoration: "none",
                color: "#333",
                fontWeight: 500,
                fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
              }}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Header;
