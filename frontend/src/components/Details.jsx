import React, { useState } from "react";
import axios from "axios";

const Details = () => {
  const [url, setUrl] = useState("");
  const [details, setDetails] = useState(null);

  const fetchDetails = async (event) => {
    event.preventDefault();
    try {
      const encodedUrl = encodeURIComponent(url);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/details/${encodedUrl}`
      );
      console.log(response.data);
      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching details:", error);
      alert("URL not found or an error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center p-4 text-primary font-semibold text-6xl">URL Details</h2>
      <form className="rounded-sm py-12 " onSubmit={fetchDetails}>
          <input
            className="p-2 w-96 font-semibold"
            type="url"
            placeholder="Enter a long URL"
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
            required
          />
          <button className="bg-primary text-secondary font-extrabold p-2 border border-secondary transform transition-transform active:scale-95 active:shadow-inner" type="submit">Get Details</button>
        </form>

      {details && (
        <div className="text-black p-4 bg-white">
          <div className="flex"><p className="font-semibold pr-1">Original URL:</p><p> {details.longUrl.length > 40 ? details.longUrl.substring(0, 40) + '...' : details.longUrl
          }</p></div>
          <div className="flex"><p className="font-semibold pr-1">Short URL:</p><p> {details.shortUrl}</p></div>
          <div className="flex"><p className="font-semibold pr-1">Hit Count:</p><p> {details.hitCount}</p></div>
        </div>
      )}
    </div>
  );
};

export default Details;
