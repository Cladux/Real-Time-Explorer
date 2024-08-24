"use client";
import { useStore } from "@/lib/store";
import NewsSection from "./NewsSection";
import LocalTime from "./LocalTime";

const MainLayout = () => {
  const { country, city } = useStore();
  return (
    <div className=" h-[calc(100vh-4rem)] flex justify-between items-center px-5 py-4 relative">
      {country && city && <NewsSection />}
      {country && city && <LocalTime />}
    </div>
  );
};

export default MainLayout;
