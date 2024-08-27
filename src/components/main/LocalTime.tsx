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

  //getting city details. lat, long, timeZone ,....
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

  //start Clock after getting city details successfully
  useEffect(() => {
    if (gotCityDetails) {
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gotCityDetails]);

  const localTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: cityDetails?.timezone.name,
  }).format(time);
  
  const localDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: cityDetails?.timezone.name,
  }).format(time);

  return (
    <Card className="shadow bg-opacity-50 w-full h-24 sm:w-96 lg:w-72">
      <CardBody className="flex justify-center">
        <span className="mt-1 text-xs text-neutral-300 text-center">
          Current Time in <span className="font-semibold text-sm">{city}</span>
        </span>
        <div className="font-black text-4xl text-neutral-200 text-center">{localTime}</div>
      <div className="text-center text-xs text-neutral-300">{localDate}</div>  
      </CardBody>
    </Card>
  );
};

export default LocalTime;
