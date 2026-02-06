export default function CredibilityScore({ score }: { score: number }) {
  const color =
    score > 70 ? "text-lime-400" :
    score > 40 ? "text-yellow-400" :
    "text-red-400";

  const label =
    score > 70 ? "High Credibility" :
    score > 40 ? "Medium Credibility" :
    "Low Credibility";

  return (
    <div className="mt-8 p-6 bg-[#111827] rounded-lg border border-gray-700">
      <p className="text-gray-400 text-sm mb-2">ANN Credibility Index</p>
      <p className={`text-6xl font-bold ${color} mb-2`}>{score}</p>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  );
}
