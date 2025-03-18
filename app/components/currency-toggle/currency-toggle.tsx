import React from "react";

interface CurrencyToggleProps {
 currency: "USD" | "EUR";
 onToggle: () => void;
}

const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ currency, onToggle }) => {
 return (
   <div className="flex justify-end mb-6">
     <button
       className="primary-button"
       onClick={onToggle}
     >
       <strong>Switch to {currency === "USD" ? "EUR" : "USD"}</strong>
     </button>
   </div>
 );
};

export default CurrencyToggle;