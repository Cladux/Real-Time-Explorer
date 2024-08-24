"use client";
import { memo } from "react";
import { Carousel } from "react-responsive-carousel";
import type { BgImage } from "@/types";

const BgImageSlider = ({ images }: { images?: BgImage[] }) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      emulateTouch={false}
      showIndicators={false}
      swipeable={false}
      animationHandler="fade"
      transitionTime={3000}
      interval={60000}
      className="h-screen w-screen overflow-hidden -z-10"
    >
      {images?.map((item: BgImage, i: number) => (
        <div
          key={i}
          className="h-screen w-screen bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${item.urls.full})` }}
        >
        </div>
      ))}
    </Carousel>
  );
};

export default memo(BgImageSlider);
