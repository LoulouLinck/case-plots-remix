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
    // Applying the card styling logic for the plot component
    <div className="card bg-greenAccount-daylightCard bg-greenAccount-daylightCard dark:bg-greenAccount-darkCard dark:text-greenAccount-darkText rounded-lg shadow-sm p-4 hover:shadow-lg">
      <h2 className="text-xl sm:text-2xl py-4 sm:py-6 font-sans font-semibold text-greenAccount-daylightText dark:text-greenAccount-darkText">
        {plot.title}
      </h2>
      <p className="font-sans text-greenAccount-daylightText dark:text-greenAccount-darkText">
        <strong>Location:</strong> {plot.location}
      </p>
      <p className="font-sans text-greenAccount-daylightText dark:text-greenAccount-darkText">
        <strong>Size:</strong> {plot.size} m²
      </p>
      {/* Conditional rendering based on selected currency */}
      <p className="font-sans text-greenAccount-daylightText dark:text-greenAccount-darkText">
        <strong>Price:</strong> {currency === "USD" ? "$" : "€"}
        {displayPrice.toLocaleString()}
      </p>
      <p className="font-sans text-greenAccount-daylightText dark:text-greenAccount-darkText">
        <strong>Description:</strong> {plot.description}
      </p>
    </div>
  );
};

export default Plot;