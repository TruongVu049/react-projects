import React, { useEffect, useState } from "react";

type imageType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const ImageSlider: React.FC = () => {
  const [images, setImages] = useState<imageType[]>([]);
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setImages(data as imageType[]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

    return () => {
      ignore = true;
    };
  }, []);

  function handleChangeCurrentSlider(currentId: number) {
    currentSlider !== currentId && setCurrentSlider(currentId);
  }

  function findIndexOfCurrentSlider(): number {
    const cpyImages = [...images] as imageType[];
    return cpyImages.map((item) => item.id).indexOf(currentSlider.toString());
  }

  function handlePrivious() {
    const indexImageOfCurrentSlider: number = findIndexOfCurrentSlider();
    if (indexImageOfCurrentSlider === 0) {
      setCurrentSlider(parseInt(images[images.length - 1].id));
    } else {
      setCurrentSlider(parseInt(images[indexImageOfCurrentSlider - 1].id));
    }
  }
  function handleNext() {
    const indexImageOfCurrentSlider: number = findIndexOfCurrentSlider();
    if (indexImageOfCurrentSlider === images.length - 1) {
      setCurrentSlider(parseInt(images[0].id));
    } else {
      setCurrentSlider(parseInt(images[indexImageOfCurrentSlider + 1].id));
    }
  }
  return (
    <div>
      <div
        style={{
          backgroundImage: `${
            images && images.length
              ? `url("${images[currentSlider].download_url}")`
              : "bg-rose-500"
          }`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={"relative w-full h-40  p-3 rounded-md"}
      >
        <div className={`absolute inset-0  ${!isLoading && "hidden"}`}>
          <div className="relative animate-pulse bg-gray-200 w-full h-full"></div>
        </div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <div className=" flex gap-2">
            {images && images.length
              ? images.map((item: imageType) => (
                  <span
                    key={item.id}
                    onClick={() => handleChangeCurrentSlider(parseInt(item.id))}
                    className={`${
                      currentSlider === parseInt(item.id)
                        ? "bg-violet-500"
                        : "bg-white  focus:bg-violet-500 hover:bg-violet-500"
                    } cursor-pointer  rounded-full w-4 h-4`}
                  ></span>
                ))
              : null}
          </div>
        </div>
        <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrivious}
              className="rounded-full p-1 bg-violet-500 text-xl hover:bg-violet-400"
            >
              {"<--"}
            </button>
            <button
              onClick={handleNext}
              className="rounded-full p-1 bg-violet-500 text-xl hover:bg-violet-400"
            >
              {"-->"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
