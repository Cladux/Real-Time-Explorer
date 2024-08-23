import Background from "@/components/background/Background";
import Nav from "@/components/header/Nav";
import MainLayout from "@/components/main/MainLayout";

export default function Home() {
  return (
    <main className="relative">
      <header>
        <Nav />
      </header>
      <section>
        <Background />
        <MainLayout />
      </section>
    </main>
  );
}
