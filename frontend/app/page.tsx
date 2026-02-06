import Header from "@/components/Header";
import FactCheckSearch from "@/components/FactCheckSearch";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <FactCheckSearch />
      </main>
    </>
  );
}
