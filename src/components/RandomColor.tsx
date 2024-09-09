import React, { useEffect, useState } from "react";

const RandomColor: React.FC = () => {
  const [typeColor, setTypeColor] = useState<string>("hex");
  const [color, setColor] = useState<string>("#f5f5f5");

  function randomColor(length: number) {
    return Math.floor(Math.random() * length);
  }

  function handleCreateRandomHexColor() {
    const hex: (number | string)[] = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    let hexColor: string = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColor(hex.length)];
    }
    setColor(hexColor);
  }

  function handleCreateRandomRgbColor() {
    let rgbColor = `rgb(${randomColor(255)}, ${randomColor(255)}, ${randomColor(
      255
    )})`;
    setColor(rgbColor);
  }

  useEffect(() => {
    typeColor === "hex"
      ? handleCreateRandomHexColor()
      : handleCreateRandomRgbColor();
  }, [typeColor]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTypeColor("hex")}
          className="py-2 px-3 bg-violet-500 text-white rounded-sm hover:bg-violet-400"
        >
          Create HEX Color
        </button>
        <button
          onClick={() => setTypeColor("rgb")}
          className="py-2 px-3 bg-violet-500 text-white rounded-sm hover:bg-violet-400"
        >
          Create RGB Color
        </button>
        <button
          onClick={
            typeColor === "hex"
              ? handleCreateRandomHexColor
              : handleCreateRandomRgbColor
          }
          className="py-2 px-3 bg-violet-500 text-white rounded-sm hover:bg-violet-400"
        >
          Generate Random Color
        </button>
      </div>
      <div
        style={{
          backgroundColor: color,
        }}
        className="flex flex-col justify-evenly p-6 items-center h-60 w-full rounded-lg bottom-2 border-gray-200 shadow-md"
      >
        <h6>{typeColor}</h6>
        <span>{color}</span>
      </div>
    </div>
  );
};

export default RandomColor;
