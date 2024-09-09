import React, { useEffect, useState } from "react";

type productType = {
  id: number;
  title: string;
  price: number;
  images: [string];
};

const LoadingMore: React.FC = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    fetch(
      `https://dummyjson.com/products?limit=6&skip=${(currentPage - 1) * 20}`
    )
      .then((res) => res.json())
      .then((data: unknown) => {
        if (!ignore) {
          const combineData = data as {
            limit: number;
            products: productType[];
            skip: number;
            total: number;
          };
          const newProduct: productType[] = (
            combineData.products as productType[]
          ).map((item): productType => {
            return {
              id: item.id,
              title: item.title,
              price: item.price,
              images: item.images,
            };
          });
          setProducts([...products, ...newProduct]);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
    return () => {
      ignore = true;
    };
  }, [currentPage]);

  return (
    <div className="p-4">
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-4 md:gap-3 gap-2">
        {products && products.length
          ? products.map((item: productType) => (
              <div
                key={item.id}
                className=" flex flex-col p-3 gap-3 justify-between rounded-md hover:border-green-500 shadow-sm border border-gray-200 text-center"
              >
                <div>
                  <img
                    className="object-fill h-40 w-full"
                    src={item.images[0]}
                    alt=""
                  />
                </div>
                <h4 className="lg:text-lg text-base">{item.title}</h4>
                <strong className="text-rose-500 font-semibold">
                  {item.price}
                </strong>
              </div>
            ))
          : null}
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-4 md:gap-3 gap-2">
        {isLoading &&
          new Array(6)
            .fill(1)
            .map((item: number, index: number) => (
              <SkeletonLoading key={index} />
            ))}
      </div>
      <div className="text-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="py-1.5 px-3 text-white bg-rose-500 rounded-md hover:bg-rose-400"
        >
          Next page
        </button>
      </div>
    </div>
  );
};

const SkeletonLoading: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col p-3 gap-3 justify-between rounded-md  shadow-sm border border-gray-200 text-center">
      <div className=" bg-slate-400 rounded-md h-40 w-full"></div>
      <h4 className=" bg-slate-400 rounded-md h-5 w-full"></h4>
      <div className=" bg-slate-400 rounded-md h-5 w-1/5 mx-auto"></div>
    </div>
  );
};

export default LoadingMore;
