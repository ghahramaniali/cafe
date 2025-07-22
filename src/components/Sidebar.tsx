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
      fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
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
          fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
        }}
      >
        <li>
          <Link
            href="/"
            style={{
              fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/menu"
            style={{
              fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
            }}
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            style={{
              fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
            }}
          >
            About
          </Link>
        </li>
        <li
          style={{
            marginTop: "2rem",
            fontWeight: "bold",
            color: "#888",
            fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
          }}
        >
          Categories
        </li>
        <li>
          <Link
            href="/category/espresso"
            style={{
              fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
            }}
          >
            Espresso
          </Link>
        </li>
        <li>
          <Link
            href="/category/latte"
            style={{
              fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
            }}
          >
            Latte
          </Link>
        </li>
        <li>
          <Link
            href="/category/cappuccino"
            style={{
              fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
            }}
          >
            Cappuccino
          </Link>
        </li>
        <li>
          <Link
            href="/category/cold-brew"
            style={{
              fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
            }}
          >
            Cold Brew
          </Link>
        </li>
        <li>
          <Link
            href="/category/pastries"
            style={{
              fontFamily: "IRANSansX Medium, Tahoma, Arial, sans-serif",
            }}
          >
            Pastries
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
