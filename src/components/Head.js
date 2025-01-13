import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchCache = useSelector((store) => store.search);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  useEffect(() => {
    if (searchQuery) {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        const timer = setTimeout(() => getSearchSuggestions(), 200);
        return () => {
          clearTimeout(timer);
        };
      }
    } else {
      setSuggestions([]);
    }
    /** This is Debouncing
    (If you gives another key stroke within 200ms than reject the current API clearAllListeners. Only after crossing 200ms (if user dosent press any other key in that time) then only make API call )
    - key = h
      - reneders(executes) the current component
      - useEffect() is called
      - Starts the timer => to make search API call after 200ms
    
    - key = he
      - Destroys the current component (Destroy is not componentDidUnmount, it's just that useEffect return function will be called after state updates and the current component is destroyed. NOTE: This is only when dependency is there in array for that state update.)
      - re-renders the component again with all new variables
      - useEffect() is called
      - Starts the timer => to make search API call after 200ms

    - After the time 200ms is finished - it makes the search API call
    */
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    // console.log("API call - ", searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
    // console.log(json[1]);
    setSuggestions(json[1]);
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={toggleMenuHandler}
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png"
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube-logo"
            src="https://t4.ftcdn.net/jpg/07/32/01/31/360_F_732013128_4w36WRSEpuF1oT9nK0Bd31GT353WqFYi.jpg"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestions && suggestions?.length > 0 && (
          <div className="absolute bg-white px-2 py-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions?.map((suggestion) => (
                <li
                  key={suggestion}
                  className="py-2 px-3 shadow-sm hover:bg-gray-100"
                >
                  🔍 {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Head;
