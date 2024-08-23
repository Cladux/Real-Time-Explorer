"use client";

import { useStore } from "@/lib/store";
import type { BgImage } from "@/types";
import { Image, Skeleton } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { memo, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BgImageSlider from "./BgImageSlider";

const options = {
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
};

const Background = () => {
  const { city } = useStore();
  const [images, setImages] = useState<BgImage[]>();

  const { mutate, isPending } = useMutation({
    mutationFn: () => axios.get(`https://api.unsplash.com/search/photos?query=${city}&orientation=landscape`, options),
    onSuccess: (res: AxiosResponse) => setImages(res.data.results),
    onError: (e: AxiosError) => console.error(e.response?.data),
  });
  useEffect(() => {
    city && mutate();
  }, [mutate, city]);

  return (
    <Skeleton
      isLoaded={!isPending}
      className="w-full h-screen absolute top-0 left-0 overflow-hidden flex justify-center"
    >
      <BgImageSlider images={images}/>
    </Skeleton>
  );
};

export default memo(Background);
