import React from "react";
import UrlInput from "./components/UrlInput";

function App() {
  return (
    <main className="min-h-screen bg-secondary">
        <h1 className="text-primary font-bold text-7xl p-12 pb-0 text-center">CLINK</h1>
        <p className="p-8 text-center text-primary font-semibold">Welcome to your URL shortener app!</p>
      <div className="flex justify-center p-12">
        <UrlInput />
      </div>
    </main>
  );
}

export default App;
