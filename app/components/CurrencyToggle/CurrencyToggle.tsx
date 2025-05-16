import React from "react";

interface CurrencyToggleProps {
  currency: "USD" | "EUR";
  onToggle: () => void;
}

const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ currency, onToggle }) => {
  return (
    <div className="flex justify-end mb-6">
      <button
        className="bg-lime-500 text-yellow-50 px-[1.25rem] py-[0.6rem] rounded-tl-[1rem] rounded-tr-[0.25rem] rounded-bl-[0.25rem] rounded-br-[1rem] shadow hover:text-emerald-900"
        onClick={onToggle}
      >
        <strong>Switch to {currency === "USD" ? "EUR" : "USD"}</strong>
      </button>
    </div>
  );
};

export default CurrencyToggle;