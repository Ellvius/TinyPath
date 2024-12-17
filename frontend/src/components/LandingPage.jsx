import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Button from "./Button";

const LandingPage = () => {
    return (
        <div className="flex justify-around p-12">
            <Link to="/shorten">
                <Button value = "Shorten Urls" className="px-12 py-6 rounded-md text-2xl font-semibold"/>
            </Link>
            <Link to="/details">
                <Button value = "Url Details" className="px-12 py-6 rounded-md text-2xl font-semibold"/>
            </Link>
            <Link to="/topurls">
                <Button value = "Top Urls" className="px-12 py-6 rounded-md text-2xl font-semibold"/>
            </Link>
        </div>
    );
}

export default LandingPage;
