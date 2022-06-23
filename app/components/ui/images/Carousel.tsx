import { useEffect, useState } from "react";

interface Props {
  images: { group: string; title: string; route?: string; src: string }[];
}
export default function Carousel({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<{ group: string; title: string; route?: string; src: string } | undefined>(undefined);

  useEffect(() => {
    if (images.length > currentIndex) {
      setCurrentImage(images[currentIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  function nextImage() {
    if (images.length > currentIndex + 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  function previousImage() {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <div className="relative mx-auto w-full">
      <div className="text-left flex space-y-3 flex-col mb-2">
        <h3 className="text-lg font-bold">{currentImage?.group}</h3>
        <div className=" dark:bg-gray-900 italic text-sm font-medium flex space-x-1">
          <span className=" ">
            {currentIndex + 1}/{images.length}
          </span>
          <span>&rarr;</span>
          {/* {currentImage?.route ? (
            <Link to={currentImage?.route} className=" border-b border-dashed border-b-theme-300 hover:border-dotted">
              <span>{currentImage?.title} 🔗</span>
            </Link>
          ) : ( */}
          <span className="border-b border-transparent">{currentImage?.title}</span>
          {/* )} */}
        </div>
      </div>
      <div className="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-600 border-4 border-dotted border-gray-500 lg:h-[32rem]">
        <div className="absolute top-0 mt-3 ml-2">
          <button
            onClick={previousImage}
            type="button"
            className="absolute bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-theme-600 opacity-90 border border-gray-500 text-gray-300 rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute right-2 mr-10 top-0 mt-3 w-full text-right">
          <button
            onClick={nextImage}
            type="button"
            className="absolute bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-theme-600 opacity-90 border border-gray-500 text-gray-300 rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <img loading="lazy" className="w-full min-h-full object-cover" src={currentImage?.src} alt={currentImage?.title} />
      </div>
    </div>
  );
}
