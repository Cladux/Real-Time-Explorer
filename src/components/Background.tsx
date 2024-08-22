"use client";

import { useStore } from "@/lib/store";
import type { BgImage } from "@/types";
import { Skeleton } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const options = {
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
};

const Background = () => {
  const { city } = useStore();
  useEffect(() => {
    console.log("city: ", city);
  }, [city]);

  const [data, setData] = useState<BgImage>();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios.get(`https://api.unsplash.com/search/photos?query=${city}&orientation=landscape`, options),
    onSuccess: (res: AxiosResponse) => setData(res.data.results[0]),
    onError: (e: AxiosError) => console.error(e.response?.data),
  });
  useEffect(() => {
    mutate();
  }, [mutate, city]);

  return (
    <Skeleton isLoaded={!isPending} className="w-screen h-screen absolute top-0 left-0">
      <div
        className="w-screen h-screen absolute top-0 left-0 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${data?.urls.full})` }}
      ></div>
    </Skeleton>
  );
};

export default Background;
