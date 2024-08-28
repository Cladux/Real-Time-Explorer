"use client";
import { useStore } from "@/lib/store";
import type { CurrentWeather } from "@/types";
import { Card, CardBody, CardFooter, CardHeader, Image, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import WeatherDetails from "./WeatherDetails";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh, FaTemperatureLow, FaWind } from "react-icons/fa";

const options = {
  method: "GET",
};
const WeatherCard = () => {
  const { cityDetails } = useStore();

  const { data, isSuccess } = useQuery<CurrentWeather>({
    queryKey: ["weather", cityDetails],
    queryFn: async () =>
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityDetails?.lat}&lon=${cityDetails?.lon}&units=metric&appid=${process.env.OPENWEATHER_API}`,
        options
      ).then((res) => res.json()),
  });
  return (
    <Skeleton isLoaded={isSuccess} className="rounded-xl opacity-60">
      <Card className="bg-opacity-70">
        <CardHeader className="flex justify-between">
          <h2 className="font-semibold text-lg self-start">
            {data?.name},<span className="font-thin text-sm"> {data?.sys.country}</span>
          </h2>
          <p>{data && Math.round(data?.main.temp)}°C</p>
        </CardHeader>
        <CardBody>
          <div className="flex justify-around items-center">
            <Image
              src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
              alt={data?.weather[0].description}
              className="object-cover size-28"
            />
            <div>
              <p className="text-lg font-semibold">
                {data?.weather[0].main} <span className="text-xs font-thin">{data?.weather[0].description}</span>
              </p>

              <p className="flex items-center gap-x-1">
                <FaTemperatureHigh /> {data && Math.ceil(data?.main.temp_max)}°C
              </p>
              <p className="flex items-center gap-x-1">
                <FaTemperatureLow /> {data && Math.floor(data?.main.temp_min)}°C
              </p>
            </div>
          </div>
          <div className="flex gap-x-1">
            <WeatherDetails icon={<WiHumidity size={25} />} description={data?.main.humidity + "%"} />
            <WeatherDetails icon={<FaWind size={25} />} description={data?.wind.speed + " km/h"} />
          </div>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </Skeleton>
  );
};

export default WeatherCard;
