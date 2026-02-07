export function CircularProgress({ value }: { value: number }) {
  return (
    <svg width="120" height="120">
      <circle cx="60" cy="60" r="54" stroke="#1f2937" strokeWidth="10" fill="none" />
      <circle
        cx="60"
        cy="60"
        r="54"
        stroke="#a3e635"
        strokeWidth="10"
        fill="none"
        strokeDasharray={339}
        strokeDashoffset={339 - (339 * value) / 100}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white">
        {value}%
      </text>
    </svg>
  );
}
