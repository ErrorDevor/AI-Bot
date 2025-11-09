import { useRef, useState } from "react";

export function useImagesLoaded(images: string[]) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadedCount = useRef(0);

  const handleImageLoad = () => {
    loadedCount.current += 1;
    if (loadedCount.current === images.length) setImagesLoaded(true);
  };

  return { imagesLoaded, handleImageLoad };
}
