# 🔗 **TinyPath - URL Shortener Web App**

## 🚀 **Overview**

**TinyPath** is a fast and reliable URL shortener web application. This service allows users to transform long, cumbersome URLs into short, shareable links with added analytics and monetization features.

## 📜 **Features**

### Core Features
- **URL Shortening:** Convert long URLs into short and convenient links.
- **Duplicate Detection:** Prevent duplication by returning an existing short URL for repeated long URLs.
- **Redirection:** Seamlessly redirect short URLs to their corresponding long URLs.

### Advanced Features
- **Monetization:** Every 10th request on a short URL redirects to an advertisement page.
- **Rate Limiting:** Restrict requests to a maximum of 20 per day per short URL.
- **Analytics:** Gain insights into link usage and popularity.

## 🛠️ **Tech Stack**

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Hosting:** Render (for backend deployment)

## 🚀 **Backend URL**

[https://tinypath-r207.onrender.com](https://tinypath-r207.onrender.com)

- For URL details, encode the URL first before sending it in the GET request.
- Example for `longUrl`:
  - Original: `https://github.com`
  - Encoded: `https%3A%2F%2Fgithub.com`
  - Request Format:
    ```plaintext
    GET https://tinypath-r207.onrender.com/details/https%3A%2F%2Fgithub.com
    ```


## 📄 **API Documentation with Examples**

### **1. POST /shorten**
- **Description:** Create a short URL for the provided long URL.
- **Request:**
  ```plaintext
  POST https://tinypath-r207.onrender.com/shorten
  Content-Type: application/json

  {
    "longUrl": "https://example.com/very/long/url"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "https://tinypath-r207.onrender.com/abc123"
  }
  ```
- **Notes:**
  - If the long URL already exists, the pre-existing short URL will be returned.

---

### **2. GET /redirect/:shortUrl**
- **Description:** Redirects to the original long URL or an advertisement page.
- **Request:**
  ```plaintext
  GET https://tinypath-r207.onrender.com/redirect/abc123
  ```
- **Behavior:**
  - Every 10th request for the same short URL redirects to a monetized advertisement page.
  - If the short URL is not found, returns a 404 error.
- **Response:**
  - Redirects to either the long URL or the ad page.

---

### **3. GET /details/:url**
- **Description:** Fetch analytics for a given URL.
- **Request:**
  ```plaintext
  GET https://tinypath-r207.onrender.com/details/https%3A%2F%2Fgithub.com
  ```
  - For long URLs, encode them first using `encodeURIComponent()`.
  - Example: `https://github.com` -> `https%3A%2F%2Fgithub.com`
- **Response:**
  ```json
  {
    "url": "https://github.com",
    "shortUrl": "https://tinypath-r207.onrender.com/abc123",
    "hitCount": 35
  }
  ```

---

### **4. GET /top/:number**
- **Description:** Retrieve a ranked list of the top URLs based on hit counts.
- **Request:**
  ```plaintext
  GET https://tinypath-r207.onrender.com/top/5
  ```
- **Response:**
  ```json
  [
    {
      "url": "https://example1.com",
      "shortUrl": "https://tinypath-r207.onrender.com/abc123",
      "hitCount": 50
    },
    {
      "url": "https://example2.com",
      "shortUrl": "https://tinypath-r207.onrender.com/xyz456",
      "hitCount": 40
    }
  ]
  ```


## 💡 **Special Features**

### Monetization via Advertisements
- Redirect users to a random advertisement page (e.g., Google) every 10th request for a given short URL.

### Rate Limiting
- Prevent users from making more than 20 requests per day for a specific short URL.
- Logic implemented via `request_count` and `last_request_time` fields in the database.

