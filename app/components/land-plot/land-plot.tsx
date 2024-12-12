// The 'Plot' component will display the individual plot details (title, size, price, location, description).

import React from "react";

// Interface for PlotProps
// - 'plot' object includes all plot details such as title, size, price, location, and description.
// - 'currency' specifies the current currency (USD or EUR).
// - 'conversionRate' used to calculate price in EUR when needed.
interface PlotProps {
  plot: {
    id: string;
    title: string;
    size: number;
    price: number; // Price in USD by default
    location: string;
    description: string;
  };
  currency: "USD" | "EUR"; // Currency in which the price is displayed
  conversionRate: number; // Conversion rate from USD to EUR
}

const Plot: React.FC<PlotProps> = ({ plot, currency, conversionRate }) => {
  // Calculate price based on the selected currency
  let displayPrice = plot.price;
  if (currency === "EUR") {
    displayPrice = plot.price * conversionRate; // Convert USD to EUR
  }

  return (
    <div className="plot card font-sans bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg p-4">
      <h2 className="text-xl sm:text-2xl py-4 sm:py-6 font-sans font-semibold text-gray-900 dark:text-white">{plot.title}</h2>
      <p className="font-sans text-gray-700 dark:text-gray-400"><strong>Location:</strong> {plot.location}</p>
      <p className="font-sans text-gray-700 dark:text-gray-400"><strong>Size:</strong> {plot.size} m²</p>
      {/* Conditional rendering based on selected currency */}
      <p className="font-sans text-gray-700 dark:text-gray-400">
        <strong>Price:</strong> {currency === "USD" ? "$" : "€"}{displayPrice.toLocaleString()}
      </p>
      <p className="font-sans text-gray-500 dark:text-gray-400"><strong>Description:</strong> {plot.description}</p>
    </div>
  );
};

export default Plot;
