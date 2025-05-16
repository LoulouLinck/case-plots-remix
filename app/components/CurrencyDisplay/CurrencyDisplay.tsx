import React from "react";

interface CurrencyDisplayProps {
  displayPrice: number; // The price to display
  currency: "USD" | "EUR"; // The currency type
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  displayPrice,
  currency,
}) => {
  return (
    <p>
      <span className="mr-5">
        {currency === "USD" ? "$" : "€"}
      </span>
      <span>
        {displayPrice.toLocaleString()}
      </span>
    </p>
  );
};

export default CurrencyDisplay;