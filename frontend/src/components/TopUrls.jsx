import React, { useState } from "react";
import axios from "axios";

const TopUrls = () => {
  const [topUrls, setTopUrls] = useState([]);
  const [numUrls, setNumUrls] = useState(1); 

  const fetchTopUrls = async (num) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/top/${num}`);
      setTopUrls(response.data);
    } catch (error) {
      console.error("Error fetching top URLs:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchTopUrls(numUrls);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center p-4 text-primary font-semibold text-6xl">
        Top URLs
      </h2>

      <form className="flex items-center my-4" onSubmit={handleSearch}>
        <input
          type="number"
          min="1"
          placeholder="Enter number of URLs"
          value={numUrls}
          onChange={(e) => setNumUrls(Number(e.target.value))}
          className="p-2 font-semibold"
        />
        <button
          type="submit"
          className="bg-primary text-secondary font-extrabold p-2 border border-secondary transform transition-transform active:scale-95 active:shadow-inner"
        >
          Search
        </button>
      </form>

      <ul className="mt-2 p-2">
        {topUrls.map((url, index) => (
          <li className="p-2 rounded border border-black bg-slate-100 m-1" key={index}>
            <div className="flex">
              <p className="font-semibold pr-1">Rank:</p>
              <p>{url.rank}</p>
            </div>
            <div className="flex">
              <p className="font-semibold pr-1">Original URL:</p>
              <p>
                {url.longUrl.length > 40
                  ? url.longUrl.substring(0, 40) + "..."
                  : url.longUrl}
              </p>
            </div>
            <div className="flex">
              <p className="font-semibold pr-1">Short URL:</p>
              <p>{url.shortUrl}</p>
            </div>
            <div className="flex">
              <p className="font-semibold pr-1">Hit Count:</p>
              <p>{url.hitCount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUrls;
