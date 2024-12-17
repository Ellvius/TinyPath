import React, { useState } from "react";
import axios from "axios";
import CopyLink from "./CopyLink";

const Shorten = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleText = (event) => {
    setLongUrl(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log("Submitting URL:", longUrl);
  
    if (!longUrl) {
      console.error("Error: The URL cannot be empty.");
      return;
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/shorten`, {
        longUrl: longUrl.trim(), 
      });
  
      if (response.data && response.data.shortUrl) {
        setShortUrl(response.data.shortUrl);
        console.log("Short URL created:", response.data.shortUrl);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error creating short URL:", error.response?.data?.message || error.message);
    }
  };
  
  

  return (
    <div className="w-full flex justify-center mt-4">
      <div>
        <form className="rounded-sm" onSubmit={handleSubmit}>
          <input
            className="p-2 w-96 font-semibold"
            type="url"
            placeholder="Enter a long URL"
            value={longUrl}
            onChange={handleText}
            required
          />
          <button className="bg-primary text-secondary font-extrabold p-2 border border-secondary transform transition-transform active:scale-95 active:shadow-inner" type="submit">Shorten</button>
        </form>
        {shortUrl && (
          <>
          <p className="mt-8 text-center p-4 text-xl text-primary font-semibold">
            Short URL: 
          </p>
          <CopyLink shortUrl = {shortUrl} />
          </>
        )}
      </div>
    </div>
  );
}

export default Shorten;
