// components/Stat.tsx
interface StatProps {
  label: string;
  value: number;
}

export default function Stat({ label, value }: StatProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-lime-400/30 transition-all">
      <div className="text-3xl font-bold text-lime-400 mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}
