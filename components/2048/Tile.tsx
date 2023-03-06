export default function Tile({ value }: { value: number }) {
  return <div className="transition-transform scale-100">{value}</div>;
}
