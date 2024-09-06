"use client";
import { useStore } from "@/lib/store";
import type { CurrentWeather } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Image,
  Skeleton,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import WeatherDetails from "./WeatherDetails";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh, FaTemperatureLow, FaWind } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { useEffect, useState } from "react";
import WeatherForecast from "./WeatherForecast";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuArrowUpFromDot } from "react-icons/lu";

const options = {
  method: "GET",
};
const WeatherSection = () => {
  const { cityDetails } = useStore();
  const [value, setValue] = useState<number>(0);
  const [toggleWeather, setToggleWeather] = useState<boolean>(true);

  const { data, isSuccess, isFetching } = useQuery<CurrentWeather>({
    queryKey: ["weather", cityDetails],
    queryFn: async () =>
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityDetails?.lat}&lon=${cityDetails?.lon}&units=metric&appid=${process.env.OPENWEATHER_API}`,
        options
      ).then((res) => res.json()),
    enabled: toggleWeather,
    refetchInterval: 1200000,
  });

  //refreshing news every 60 seconds
  useEffect(() => {
    if (isSuccess && toggleWeather) {
      const interval = setInterval(() => {
        setValue((v) => (v >= 120 ? 0 : v + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSuccess, toggleWeather]);
  return (
    <Skeleton isLoaded={isSuccess} className="rounded-xl">
      <Card className="bg-opacity-70">
        <CardHeader className="flex justify-between pb-0">
          <h2 className="font-semibold text-lg self-start">
            {data?.name},<span className="font-thin text-sm"> {data?.sys.country}</span>
          </h2>
          {toggleWeather ? (
            <CircularProgress
              aria-label="refresh news"
              size="sm"
              value={value}
              maxValue={120}
              color="default"
              showValueLabel={false}
              label={isFetching && "refreshing..."}
              className="mx-3"
              classNames={{ label: "text-xs" }}
            />
          ) : (
            "Weather section"
          )}
        </CardHeader>
        {toggleWeather && (
          <CardBody className="items-center">
            <div className="flex items-center">
              <Image
                src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                alt={data?.weather[0].description}
                className="object-cover size-32"
              />
              <div className="text-center">
                <p className="text-3xl font-bold">{data?.weather[0].main}</p>
                <p className="text-sm font-thin">{data?.weather[0].description}</p>
              </div>
            </div>
            <div className="text-center space-y-3 mb-5">
              <p className="text-2xl font-semibold">{data && Math.round(data?.main.temp)}°C</p>
              <div className="flex gap-x-5">
                <span className="flex items-center gap-x-0.5 text-sm">
                  <FaTemperatureHigh /> {data && Math.ceil(data?.main.temp_max)}°C
                </span>
                <span className="flex items-center gap-x-0.5 text-sm">
                  <FaTemperatureLow /> {data && Math.floor(data?.main.temp_min)}°C
                </span>
              </div>
            </div>
            <div className="flex gap-1 flex-wrap">
              <WeatherDetails icon={<WiHumidity size={25} />} description={data?.main.humidity + "%"} />
              <WeatherDetails
                icon={
                  <div className="flex gap-x-1">
                    <FaWind size={25} />
                    <Chip
                      size="sm"
                      startContent={<LuArrowUpFromDot style={{ transform: `rotate(${data?.wind.deg}deg)` }} />}
                    >
                      {data?.wind.deg}°
                    </Chip>
                  </div>
                }
                description={data?.visibility && data.visibility / 1000 + "km/h"}
              />
              <WeatherDetails
                icon={<MdOutlineVisibility size={25} />}
                description={data?.visibility && data.visibility / 1000 + " km/h"}
              />
            </div>
            {toggleWeather && <WeatherForecast />}
          </CardBody>
        )}

        <CardFooter className="flex flex-col">
          <Divider className="mb-1" />
          <Button
            fullWidth
            size="sm"
            variant="light"
            onPress={() => {
              setToggleWeather(!toggleWeather);
              !toggleWeather && setValue(0);
            }}
          >
            {toggleWeather ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </CardFooter>
      </Card>
    </Skeleton>
  );
};

export default WeatherSection;
