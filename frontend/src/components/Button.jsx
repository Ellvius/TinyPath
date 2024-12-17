import React from "react";

const Button = ({value, buttonType, className}) => {
    return (
        <button className={`${className} bg-primary text-secondary border border-secondary transform transition-transform active:scale-95 active:shadow-inner`} type={buttonType}>{value}</button>
    )
}

export default Button;