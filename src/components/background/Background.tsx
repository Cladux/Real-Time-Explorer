"use client";

import { useStore } from "@/lib/store";
import type { BgImage } from "@/types";
import { Skeleton } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BgImageSlider from "./BgImageSlider";

const options = {
  headers: {
    method: "GET",
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
};

const Background = () => {
  const { city } = useStore();
  const [images, setImages] = useState<BgImage[]>();

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await fetch(
        `https://api.unsplash.com/search/photos?query=${city}&orientation=landscape&content_filter=high`,
        options
      ).then((res) => res.json()),
    onSuccess: (res) => setImages(res.results),
  });
  useEffect(() => {
    city && mutate();
  }, [mutate, city]);

  return (
    <Skeleton
      isLoaded={!isPending}
      className="w-full h-screen absolute top-0 left-0 overflow-hidden flex justify-center"
    >
      {images ? (
        <BgImageSlider images={images} />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center text-neutral-800 font-bold text-8xl px-40 text-center">
          For watching real time news, weather and more, Search your City
        </div>
      )}
    </Skeleton>
  );
};

export default memo(Background);
