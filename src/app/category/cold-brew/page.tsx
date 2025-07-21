import Link from "next/link";

const coldBrewItems = [
  { name: "Iced Cold Brew", slug: "iced-cold-brew" },
  { name: "Nitro Cold Brew", slug: "nitro-cold-brew" },
];

export default function ColdBrewCategory() {
  return (
    <div>
      <h1>Cold Brew</h1>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {coldBrewItems.map((item) => (
          <li key={item.slug} style={{ margin: "1rem 0" }}>
            <Link href={`/item/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
