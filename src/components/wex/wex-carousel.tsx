import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * WexCarousel - WEX Design System Carousel Component
 *
 * Slideshow for cycling through elements.
 * Uses namespace pattern: WexCarousel.Content, WexCarousel.Item, etc.
 *
 * @example
 * <WexCarousel>
 *   <WexCarousel.Content>
 *     <WexCarousel.Item>Slide 1</WexCarousel.Item>
 *     <WexCarousel.Item>Slide 2</WexCarousel.Item>
 *     <WexCarousel.Item>Slide 3</WexCarousel.Item>
 *   </WexCarousel.Content>
 *   <WexCarousel.Previous />
 *   <WexCarousel.Next />
 * </WexCarousel>
 */

export const WexCarousel = Object.assign(Carousel, {
  Content: CarouselContent,
  Item: CarouselItem,
  Next: CarouselNext,
  Previous: CarouselPrevious,
});

