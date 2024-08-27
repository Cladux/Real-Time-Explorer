"use client";
import { useStore } from "@/lib/store";
import { Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

const options = {
  method: "GET",
};
const WeatherCard = () => {
  const { cityDetails } = useStore();
  const {
    data: Weather,
    isPending: gettingWeather,
    isSuccess: gotWeather,
  } = useQuery({
    queryKey: ["weather", cityDetails],
    queryFn: async () =>
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityDetails?.lat}&lon=${cityDetails?.lon}&appid=${process.env.OPENWEATHER_API}`,
        options
      ).then((res) => res.json()),
  });
  return <Skeleton isLoaded={gotWeather}>WeatherCard</Skeleton>;
};

export default WeatherCard;
