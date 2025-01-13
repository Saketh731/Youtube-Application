import React from "react";
import Button from "./Button";

const buttonList = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Gaming",
  },
  {
    id: 3,
    name: "Songs",
  },
  {
    id: 4,
    name: "Live",
  },
  {
    id: 5,
    name: "Cricket",
  },
  {
    id: 6,
    name: "Cooking",
  },
  {
    id: 7,
    name: "News",
  },
  {
    id: 8,
    name: "Love",
  },
  {
    id: 9,
    name: "Motivation",
  },
  {
    id: 10,
    name: "Mantras",
  },
  {
    id: 11,
    name: "Spiritual",
  },
  {
    id: 12,
    name: "Travel",
  },
  {
    id: 13,
    name: "Fitness",
  },
  //   {
  //     id: 14,
  //     name: "Pranks",
  //   },
  //   {
  //     id: 15,
  //     name: "Modeling",
  //   },

  //   {
  //     id: 16,
  //     name: "Mystries",
  //   },
];
const ButtonList = () => {
  return (
    <div className="flex">
      {buttonList?.map((button) => (
        <Button key={button.id} name={button.name} />
      ))}
    </div>
  );
};

export default ButtonList;
