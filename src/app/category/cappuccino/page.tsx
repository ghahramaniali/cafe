import Link from "next/link";

const cappuccinoItems = [
  { name: "Classic Cappuccino", slug: "classic-cappuccino" },
  { name: "Iced Cappuccino", slug: "iced-cappuccino" },
];

export default function CappuccinoCategory() {
  return (
    <div>
      <h1>Cappuccino</h1>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {cappuccinoItems.map((item) => (
          <li key={item.slug} style={{ margin: "1rem 0" }}>
            <Link href={`/item/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
