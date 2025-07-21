import Link from "next/link";

const latteItems = [
  { name: "Vanilla Latte", slug: "vanilla-latte" },
  { name: "Caramel Latte", slug: "caramel-latte" },
];

export default function LatteCategory() {
  return (
    <div>
      <h1>Latte</h1>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {latteItems.map((item) => (
          <li key={item.slug} style={{ margin: "1rem 0" }}>
            <Link href={`/item/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
