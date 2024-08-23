'use client'
import { useStore } from "@/lib/store";
import NewsSection from "./NewsSection";

const MainLayout = () => {
  const { country, city } = useStore();
  return (
    <div className=" h-[calc(100vh-4rem)] flex justify-between items-center p-5">
      {country && city && <NewsSection />}
    </div>
  );
};

export default MainLayout;
