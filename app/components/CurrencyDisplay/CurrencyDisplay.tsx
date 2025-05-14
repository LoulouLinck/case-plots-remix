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
    <span>
      {currency === "USD" ? "$" : "€"} {displayPrice.toLocaleString()}
    </span>
  );
};

export default CurrencyDisplay;