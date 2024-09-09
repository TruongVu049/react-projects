import React, { useState } from "react";

type dataType = {
  id: number;
  question: string;
  answer: string;
};

const data: dataType[] = [
  {
    id: 1,
    question: "What are accordion components?",
    answer:
      "Accordion components are user interface elements used for organizing and presenting content in a collapsible manner. They typically consist of a header, content, and an expand/collapse action.",
  },
  {
    id: 2,
    question: "What are they used for?",
    answer:
      "They are commonly employed in various contexts, including FAQs, product descriptions, navigation menus, settings panels, and data tables, to save screen space and provide a structured and user-friendly interface for presenting information or options.",
  },
  {
    id: 3,
    question: "Accordion as a musical instrument",
    answer:
      "The accordion is a musical instrument with a keyboard and bellows. It produces sound by air passing over reeds when the player expands or compresses the bellows, used in various music genres.",
  },
];

const Accordian: React.FC = () => {
  const [selected, setSelected] = useState<number | null>();
  const [enableMultiSelection, setEnableMultiSelection] =
    useState<boolean>(false);
  const [multiple, setMultiple] = useState<number[]>([]);

  function handleSingle(currentId: number) {
    setSelected(currentId === selected ? null : currentId);
  }

  function handleMulti(currentId: number) {
    let cpyMultiple: number[] = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(currentId);

    findIndexOfCurrentId === -1
      ? cpyMultiple.push(currentId)
      : cpyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMultiple);
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className="py-2 px-4 rounded-sm bg-rose-500 text-white my-3"
      >
        {!enableMultiSelection
          ? "Enable Multi Selection"
          : "Disable Multi Selection"}
      </button>
      {data && data.length ? (
        data.map((item: dataType) => (
          <div key={item.id} className="p-3 rounded-sm bg-rose-400 text-white">
            <div
              onClick={
                enableMultiSelection
                  ? () => handleMulti(item.id)
                  : () => handleSingle(item.id)
              }
              className="flex items-center justify-between cursor-pointer"
            >
              <h5>{item.question}</h5>
              <span>+</span>
            </div>
            {enableMultiSelection
              ? multiple.indexOf(item.id) !== -1 && (
                  <p className="pt-2">{item.answer}</p>
                )
              : selected === item.id && <p className="pt-2">{item.answer}</p>}
          </div>
        ))
      ) : (
        <h6>No data</h6>
      )}
    </div>
  );
};
export default Accordian;
