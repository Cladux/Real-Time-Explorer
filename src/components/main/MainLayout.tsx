"use client";
import { useStore } from "@/lib/store";
import NewsSection from "./news/NewsSection";
import LocalTime from "./LocalTime";
import WeatherSection from "./weather/WeatherSection";

const MainLayout = () => {
  const { country, city, cityDetails } = useStore();
  return (
    <div className="overflow-y-auto h-[calc(100vh-4rem)] flex flex-col gap-2 sm:grid sm:grid-col-2 sm:grid-row-4 lg:grid-cols-5 lg:grid-rows-2 p-3">
      <section className="col-span-2 row-span-1 lg:col-start-2 lg:col-end-5 lg:row-start-1 lg:row-end-2 flex justify-center">
        {country && city && <LocalTime />}
      </section>
      <section className="col-span-1 row-start-1 row-end-3 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
        {country && city && <NewsSection />}
      </section>
      <section className="col-span-2 lg:col-start-5 lg:row-start-1 lg:row-end-4">
        {country && city && cityDetails && <WeatherSection />}
      </section>
      <section className="col-start-1 col-end-4 row-span-3 lg:col-start-2 lg:col-end-5 lg:row-span-2"></section>
    </div>
  );
};

export default MainLayout;
