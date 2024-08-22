import Background from "@/components/Background";
import Nav from "@/components/Nav";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="relative">
      <header>
        <Nav />
      </header>
      <section>
        <Background />
      </section>
    </main>
  );
}
