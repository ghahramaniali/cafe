import Link from "next/link";

const pastryItems = [
  { name: "Chocolate Croissant", slug: "chocolate-croissant" },
  { name: "Almond Danish", slug: "almond-danish" },
];

export default function PastriesCategory() {
  return (
    <div>
      <h1>Pastries</h1>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {pastryItems.map((item) => (
          <li key={item.slug} style={{ margin: "1rem 0" }}>
            <Link href={`/item/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
