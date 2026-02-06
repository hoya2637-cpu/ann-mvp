export default function AboutPage() {
  return (
    <div className="p-8 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">About ANN</h1>
      <div className="max-w-3xl">
        <p className="text-gray-300 mb-4">
          AI News Network (ANN) is a revolutionary fact-checking platform that combines
          AI analysis with community verification and expert opinions.
        </p>
        <p className="text-gray-300 mb-4">
          Our credibility scoring system considers:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>AI Analysis (35%)</li>
          <li>Expert Opinion (35%)</li>
          <li>Community Discussion (20%)</li>
          <li>Time Stability (10%)</li>
        </ul>
      </div>
    </div>
  );
}
