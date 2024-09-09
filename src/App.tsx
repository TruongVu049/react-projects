import React from "react";
import Accordian from "./components/Accordian";
import RandomColor from "./components/RandomColor";
import StarRating from "./components/StarRating";
import ImageSlider from "./components/ImageSlider";
import LoadingMore from "./components/LoadingMore";

const App: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto ">
      <div className="flex flex-col gap-4">
        {/* <Accordian />
      <RandomColor />
      <StarRating /> */}
        {/* <ImageSlider /> */}
        <LoadingMore />
      </div>
    </div>
  );
};

export default App;
