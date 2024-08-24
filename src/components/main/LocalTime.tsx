"use client";

import { useStore } from "@/lib/store";
import type { CityDetails } from "@/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
};

const LocalTime = () => {
  const { city, cityDetails, updateCityDetails } = useStore();
  const [time, setTime] = useState(new Date());

  const { data: cityDetailsResult, isSuccess: gotCityDetails } = useQuery<{ results: CityDetails[] }>({
    queryKey: ["countries", city],
    queryFn: async () =>
      await fetch(
        `https://api.geoapify.com/v1/geocode/search?city=${city}&format=json&apiKey=${process.env.GEOAPIFY_API}`,
        options
      ).then((res) => res.json()),
  });

  useEffect(() => {
    gotCityDetails && updateCityDetails(cityDetailsResult.results[0]);
  }, [, updateCityDetails, cityDetailsResult, gotCityDetails]);

  useEffect(() => {
    if (gotCityDetails) {
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gotCityDetails]);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: cityDetails?.timezone.name,
  }).format(time);
  return (
    <Card className="shadow bg-opacity-70 w-full md:w-72 absolute top-3 left-1/2 -translate-x-1/2">
      <CardBody className="flex justify-center">
        <div className="font-black text-4xl text-neutral-200 text-center">{formattedTime}</div>
        <span className="mt-1 text-xs text-neutral-400 text-center">
          Current Time in <span className="font-semibold text-sm">{city}</span>
        </span>
      </CardBody>
    </Card>
  );
};

export default LocalTime;