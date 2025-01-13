import React, { useEffect, useMemo, useState } from "react";
import { findNthPrime } from "../utils/helper";

const Demo = () => {
  const [text, setText] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // Heavy operation
  const prime = useMemo(() => findNthPrime(text), text);
  //   let prime = 0;
  //   useEffect(() => {
  //     prime = findNthPrime(text);
  //   }, [text]);

  return (
    <div
      className={
        "m-4 p-2 w-96 h-96 border border-black " +
        (isDarkTheme && "bg-gray-900 text-white")
      }
    >
      <div>
        <button
          className="mt-2 ml-4 p-2 bg-blue-400"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
        >
          Toggle
        </button>
      </div>
      <div className="p-4">
        <input
          className="border border-black w-72 p-2 text-black"
          type="number"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <h1 className="mt-4 font-bold text-xl pl-4">nth Prime : {prime}</h1>
      </div>
    </div>
  );
};

export default Demo;
