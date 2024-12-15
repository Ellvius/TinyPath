import React, { useState } from "react";
import axios from "axios";

function UrlInput() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleText = (event) => {
    (event) => setLongUrl(event.target.value);
    console.log(longUrl);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(longUrl)
    try {
      const response = await axios.post("http://localhost:5000/api/shorten", { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  return (
    <div>
      <form className="rounded-sm" onSubmit={handleSubmit}>
        <input
          className="p-2 w-96"
          type="url"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={handleText}
        />
        <button className="bg-primary text-secondary font-bold p-2 border border-secondary" type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </p>
      )}
    </div>
  );
}

export default UrlInput;
