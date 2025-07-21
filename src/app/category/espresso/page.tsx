import Link from "next/link";

const espressoItems = [
  { name: "Classic Espresso", slug: "classic-espresso" },
  { name: "Double Espresso", slug: "double-espresso" },
];

export default function EspressoCategory() {
  return (
    <div>
      <h1>Espresso</h1>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {espressoItems.map((item) => (
          <li key={item.slug} style={{ margin: "1rem 0" }}>
            <Link href={`/item/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
