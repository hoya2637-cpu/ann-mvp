"use client";

export default function AdminDashboard() {
  return (
    <div className="p-8 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">ANN Admin Dashboard</h1>

      <section className="mb-8 p-6 bg-[#111827] rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Expert Approval</h2>
        <p className="text-gray-400 mb-4">Manage and verify expert accounts</p>
        <button className="bg-lime-400 text-black px-6 py-2 rounded font-semibold hover:bg-lime-500">
          Approve Expert
        </button>
      </section>

      <section className="mb-8 p-6 bg-[#111827] rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Credibility Weights</h2>
        <p className="text-gray-400 mb-4">Configure scoring algorithm</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-300">AI Analysis: 35%</p>
            <p className="text-gray-300">Expert Opinion: 35%</p>
          </div>
          <div>
            <p className="text-gray-300">Discussion: 20%</p>
            <p className="text-gray-300">Stability: 10%</p>
          </div>
        </div>
      </section>

      <section className="p-6 bg-[#111827] rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Research Export</h2>
        <p className="text-gray-400 mb-4">Download fact-check data for research</p>
        <button className="border border-lime-400 text-lime-400 px-6 py-2 rounded font-semibold hover:bg-lime-400 hover:text-black">
          Download CSV
        </button>
      </section>
    </div>
  );
}
