import React, { memo } from "react";
import { Carousel } from "react-responsive-carousel";
import type { BgImage } from "@/types";
import { Image } from "@nextui-org/react";

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
    >
      {images?.map((item: BgImage, i: number) => (
        <div key={i} className="h-screen w-full overflow-hidden -z-10">
          <Image
            key={i}
            src={item.urls.full}
            className="h-screen w-full xl:h-full object-cover rounded-none"
            alt={item.slug}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default memo(BgImageSlider);
