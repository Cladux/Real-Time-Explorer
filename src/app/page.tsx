import Background from "@/components/background/Background";
import Nav from "@/components/header/Nav";
import MainLayout from "@/components/main/MainLayout";

export default function Home() {
  return (
    <main className="relative">
      <Background />
      <header>
        <Nav />
      </header>
      <section>
        <MainLayout />
      </section>
    </main>
  );
}
