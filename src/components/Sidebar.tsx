import React from "react";
import Link from "next/link";

const Sidebar = () => (
  <aside
    style={{
      width: "220px",
      background: "#fafafa",
      borderRight: "1px solid #eee",
      height: "100vh",
      padding: "2rem 1rem",
      position: "fixed",
      top: 0,
      left: 0,
    }}
  >
    <nav>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/menu">Menu</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li style={{ marginTop: "2rem", fontWeight: "bold", color: "#888" }}>
          Categories
        </li>
        <li>
          <Link href="/category/espresso">Espresso</Link>
        </li>
        <li>
          <Link href="/category/latte">Latte</Link>
        </li>
        <li>
          <Link href="/category/cappuccino">Cappuccino</Link>
        </li>
        <li>
          <Link href="/category/cold-brew">Cold Brew</Link>
        </li>
        <li>
          <Link href="/category/pastries">Pastries</Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
