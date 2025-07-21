import Link from "next/link";

const items = [
  { name: "Classic Espresso", slug: "classic-espresso" },
  { name: "Vanilla Latte", slug: "vanilla-latte" },
  { name: "Iced Cold Brew", slug: "iced-cold-brew" },
  { name: "Chocolate Croissant", slug: "chocolate-croissant" },
];

export default function MenuPage() {
  return (
    <div>
      <h1>Menu</h1>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {items.map((item) => (
          <li key={item.slug} style={{ margin: "1rem 0" }}>
            <Link href={`/item/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
